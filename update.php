<?php

include('./database.php');

$getUsersStatement = $db->query('SELECT * FROM users');
$users = $getUsersStatement->fetchAll();

echo json_encode($users);