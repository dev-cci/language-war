<?php

include('./database.php');

$isDeletedOrdered = $_POST['position'] == -1;
$doesUserExist =  $db->query("SELECT name FROM users WHERE name = '". $_POST['username'] ."'")->fetch();

function deleteUser($db) {
    $deleteUserStatement = $db->prepare("DELETE FROM users WHERE name = ?");
    $deleteUserStatement->execute([$_POST['username']]);
}


function updateUser($db) {
    $updateUserStatement = $db->prepare("UPDATE users SET position = ? WHERE name = ?");
    $updateUserStatement->execute([$_POST['position'], $_POST['username']]);
}

function insertUser($db) {
    $insertUserStatement = $db->prepare("INSERT INTO users (name, color, position) values (?, ?, ?)");
    $insertUserStatement->execute([$_POST['username'], $_POST['color'], $_POST['position']]);
}

if ($isDeletedOrdered) deleteUser($db);
else if ($doesUserExist) updateUser($db);
else insertUser($db);

// * Equivaut à :
// if ($isDeletedOrdered) return deleteUser($db);
// if ($doesUserExist) return updateUser($db);
// insertUser($db);

// * Equivaut à :
// if ($isDeletedOrdered) {
//     deleteUser($db);
// }
// else {
//     if ($doesUserExist) {
//         updateUser($db);
//     }
//     else {
//         insertUser($db);
//     }
// }