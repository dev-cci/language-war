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

// Envoyer ma position
const sendUserData = async (username, position) => {
    let userData = new FormData()
    userData.append('username', username)
    userData.append('position', position)
    userData.append('color', getRandomColor())

    await fetch('./send_user_data.php', {
        method: 'POST',
        body: userData
    })

    updateUsers()
}

// Mettre à jour la page
const updateUsers = async () => {
    const lobby = document.querySelector('.lobby')
    const roomPHP = document.querySelector('.zone-php')
    const roomJS = document.querySelector('.zone-js')

    const users = await getUsers()

    displayUsers(users, lobby, 0, userInLobbyDiv);
    displayUsers(users, roomPHP, 1, userInRoomDiv);
    displayUsers(users, roomJS, 2, userInRoomDiv);
}

const displayUsers = (users, room, position, div) => {
    room.innerHTML = ''
    users.filter(user => user.position == position).forEach(user => room.innerHTML += div(user.name, user.color))
}

// Rejoindre la partie
const join = room => {
    const userInput = document.querySelector('input#nickname')

    if (userInput.value) {
        sendUserData(userInput.value, room)
    }
    else {
        console.log("no username")
    }
}

// Quitter le jeu
const leave = () => {
    const userInput = document.querySelector('input#nickname')

    sendUserData(userInput.value, -1)

    userInput.value = ''
}

setInterval(() => {
    updateUsers()
}, 1000)

updateUsers()