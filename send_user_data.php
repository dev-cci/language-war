<?php

include('./database.php');

if ($_POST['position'] == -1) {
    $deleteUserStatement = $db->prepare("DELETE FROM users WHERE name = ?");
    $deleteUserStatement->execute([$_POST['username']]);
}
else {
    $checkUserStatement = $db->query("SELECT name FROM users WHERE name = '". $_POST['username'] ."'");
    if ($checkUserStatement->fetch()) {
        $updateUserStatement = $db->prepare("UPDATE users SET position = ? WHERE name = ?");
        $updateUserStatement->execute([$_POST['position'], $_POST['username']]);
    }
    else {
        $insertUserStatement = $db->prepare("INSERT INTO users (name, color, position) values (?, ?, ?)");
        $insertUserStatement->execute([$_POST['username'], $_POST['color'], $_POST['position']]);
    }
}