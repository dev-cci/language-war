<?php

include('./database.php');

$checkUserStatement = $db->query("SELECT name FROM users WHERE name = '". $_POST['username'] ."'");
if ($checkUserStatement->fetch()) {
    $updateUserStatement = $db->prepare("UPDATE users SET position = ? WHERE name = ?");
    $updateUserStatement->execute([$_POST['position'], $_POST['username']]);
}
else {
    $insertUserStatement = $db->prepare("INSERT INTO users (name, color, position) values (?, ?, ?)");
    $insertUserStatement->execute([$_POST['username'], $_POST['color'], $_POST['position']]);
}
