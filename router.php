<?php

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case Action::$JOIN:
            # code...
            break;

        default:
            # code...
            break;
    }
}
else {
    // Traitement de l'erreur
}

class Action {
    public static $JOIN = 'JOIN';
}