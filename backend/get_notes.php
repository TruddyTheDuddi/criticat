<?php
include_once("db_connect.php");
include_once("tools.php");

$json = new JSON_Resp();

// Fetch notes from database
$notes = array();

$sql = "SELECT *, UNIX_TIMESTAMP(date_created) as date_created FROM `posts` INNER JOIN `categories` ON posts.category_id = categories.cat_id ORDER BY `date_created` DESC";
$res = mysqli_query($db, $sql);
if(mysqli_num_rows($res) > 0){
    while($row = mysqli_fetch_assoc($res)){
        $note = array(
            "id" => $row['post_id'],
            "msg" => $row['msg'],
            "cat" => $row['name'],
            "date_created" => $row['date_created']
        );
        array_push($notes, $note);
    }
}

$json->set_success("Notes fetched successfully!");
$json->add_field("notes", $notes);

?>