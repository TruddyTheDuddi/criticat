<?php
include_once("db_connect.php");
include_once("tools.php");

$json = new JSON_Resp();

if(!isset($_GET['msg']) OR trim($_GET['msg']) == ""){
    $json->set_error("No message provided");
    exit();
}

// Set the default category to "Gerenal"
if(!isset($_GET['cat_id'])){
    $json->push_to_debug_log("No category provided, using default");
    $_GET['cat_id'] = 1;
}

// Get the hash md5 of the IP address
$h_ip = $_SERVER['REMOTE_ADDR'];

$msg = makeSafeSQL($db, $_GET['msg']);
$cat_id = makeSafeSQL($db, $_GET['cat_id']);;

// Check if latest post post was the same
$sql = "SELECT * FROM `posts` WHERE `ip_hash` = '$h_ip' ORDER BY `date_created` DESC LIMIT 1";
$res = mysqli_query($db, $sql);
if(mysqli_num_rows($res) > 0){
    $row = mysqli_fetch_assoc($res);
    if($row['msg'] == $msg){
        $json->set_error("You already posted this message!");
        exit();
    }
}

// Check if the user posted in the last 5 minutes
$sql = "SELECT * FROM `posts` WHERE `ip_hash` = '$h_ip' AND `date_created` > DATE_SUB(NOW(), INTERVAL 5 MINUTE)";
$res = mysqli_query($db, $sql);
if(mysqli_num_rows($res) > 0){
    // Check how much time there's left to post
    $row = mysqli_fetch_assoc($res);
    $time_left = prettyDate(strtotime($row['date_created']) + 300, true);
    $json->set_error("You need to wait about 5 minutes! It's cool from you to say this much but please wait a little bit!");
    exit();
}

// Add message to database
$sql = "INSERT INTO `posts` (`msg`, `category_id`, `ip_hash`) VALUES ('$msg', '$cat_id', '$h_ip')";
if(!mysqli_query($db, $sql)){
    $json->set_error("Could not post the message... :( Could you please try again in a bit?");
    exit();
}

$json->set_success("Message posted successfully!");

?>