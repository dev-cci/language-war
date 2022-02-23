const colors = ['blue', 'red', 'yellow', 'green', 'orange', 'emerald', 'lime', 'teal', 'cyan', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

let userInLobbyDiv = (username, color) => `
<div class="user w-20 h-20 m-4 rounded-full border-4 text-xs border-white flex items-center justify-center text-white bg-${colors[color]}-900">
    <span>${username.toUpperCase()}</span>
</div>
`

let userInRoomDiv = (username, color) => `
<div class="user w-32 h-32 m-6 rounded-full border-4 text-xl border-white flex items-center justify-center text-white bg-${colors[color]}-900">
    <span>${username.toUpperCase()}</span>
</div>
`

// Récupérer une couleur aléatoire
const getRandomColor = () => Math.floor(Math.random() * 15)

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

    const lobby = document.querySelector('.lobby')
    const roomPHP = document.querySelector('.zone-php')
    const roomJS = document.querySelector('.zone-js')

    lobby.innerHTML = ''
    users.filter(user => user.position == 0).forEach(user => lobby.innerHTML += userInLobbyDiv(user.name, user.color))

    roomPHP.innerHTML = ''
    users.filter(user => user.position == 1).forEach(user => roomPHP.innerHTML += userInRoomDiv(user.name, user.color))

    roomJS.innerHTML = ''
    users.filter(user => user.position == 2).forEach(user => roomJS.innerHTML += userInRoomDiv(user.name, user.color))
}

// Rejoindre la partie
const join = async room => {
    const userInput = document.querySelector('input#nickname').value

    if (userInput) {
        let userData = new FormData()
        userData.append('username', userInput)
        userData.append('position', room)
        userData.append('color', getRandomColor())

        await fetch('./send_user_data.php', {
            method: 'POST',
            body: userData
        })

        updateUsers()
    }
    else {
        console.log("no username")
    }
}

// Rejoindre la partie
const leave = async () => {
    const userInput = document.querySelector('input#nickname')

    let userData = new FormData()
    userData.append('username', userInput.value)
    userData.append('position', -1)
    userData.append('color', getRandomColor())

    await fetch('./send_user_data.php', {
        method: 'POST',
        body: userData
    })

    updateUsers()

    userInput.value = ""
}

setInterval(() => {
    updateUsers()
}, 1000);

updateUsers()