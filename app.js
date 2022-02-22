const colors = ['blue', 'red', 'yellow', 'green', 'orange', 'emerald', 'lime', 'teal', 'cyan', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

let userInLobbyDiv = `
<div class="user w-20 h-20 m-4 rounded-full border-4 text-xs border-white flex items-center justify-center text-white bg-blue-900">
    <span>USERNAME</span>
</div>
`

let userInRoomDiv = `
<div class="user w-32 h-32 m-6 rounded-full border-4 text-xl border-white flex items-center justify-center text-white bg-blue-900 bg-">
    <span>USERNAME</span>
</div>
`

// Récupérer la liste des utilisateurs en bdd
const getUsers = () => fetch('./update.php')
    .then(r => r.json())
    .then(users => users)

// * Même fonction qu'au dessus, différente syntaxe
// function getUsers() {
    //     return fetch('./update.php')
    //     .then(response => {
        //         return response.json()
        //     })
        //     .then(function(users) {
            //         return users
            //     })
            // }

// * Même fonction qu'au dessus, différente syntaxe
// async function getUsers() {
//     const response = await fetch('./update.php')
//     const users = await response.json()
//     return users
// }

// Mettre à jour la page
const updateUsers = async () => {
    const users = await getUsers()
}