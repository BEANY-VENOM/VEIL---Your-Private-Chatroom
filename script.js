// ========= DATA =========

let users=

JSON.parse(
localStorage.getItem(
"veil_users"
)
)

||

[]

let currentUser=null

let rooms={
Lobby:[],
Afterhours:[],
Private:[]
}

let currentRoom="Lobby"

let shadows=

JSON.parse(
localStorage.getItem(
"veil_shadows"
)
)

||

[]

let onlineUsers=[]

// ========= ELEMENTS =========

const loginPage=
document.getElementById("loginPage")

const app=
document.getElementById("app")

const messages=
document.getElementById("messages")

const sidebar=
document.getElementById("sidebar")

// ========= SIDEBAR =========

sidebar.innerHTML+=`

<hr>

<h3>Rooms</h3>

<button class="room">Lobby</button>
<button class="room">Afterhours</button>
<button class="room">Private</button>

<hr>

<h3>Shadows</h3>

<div id="shadowList">
None
</div>

<input
id="inviteInput"
placeholder="Veil Key">

<button id="addShadow">
Reveal
</button>

<hr>

<div>
Online:
<span id="onlineCount">
0
</span>
</div>

<div id="onlineUsers">
</div>

`

// ========= HELPERS =========

function saveUsers(){

localStorage.setItem(
"veil_users",

JSON.stringify(
users
)

)

}

function saveShadows(){

localStorage.setItem(
"veil_shadows",

JSON.stringify(
shadows
)

)

}

function makeCode(){

return Math
.random()
.toString(36)
.substring(2,8)
.toUpperCase()

}

// ========= PRESENCE =========

function renderPresence(){

document
.getElementById(
"onlineCount"
)
.innerText=
onlineUsers.length

document
.getElementById(
"onlineUsers"
)
.innerHTML=

onlineUsers
.map(
u=>"● "+u
)
.join(
"<br>"
)

}

// ========= SHADOWS =========

function renderShadows(){

const list=
document.getElementById(
"shadowList"
)

if(
shadows.length===0
){

list.innerHTML=
"None"

return

}

list.innerHTML=

shadows
.map(
x=>
"• "+x
)
.join(
"<br>"
)

}

// ========= ENTER =========

function enter(){

loginPage.style.display=
"none"

app.style.display=
"flex"

if(
!onlineUsers.includes(
currentUser.user
)
){

onlineUsers.push(
currentUser.user
)

}

renderPresence()

renderShadows()

render()

}

// ========= SIGNUP =========

signup.onclick=()=>{

const u=
username.value.trim()

const p=
password.value

const captcha=
grecaptcha.getResponse()

if(
captcha.length===0
){

alert(
"Complete verification"
)

return

}

if(
!u||
!p
){

alert(
"Fill everything"
)

return

}

if(
users.find(
x=>
x.user===u
)
){

alert(
"Exists"
)

return

}

const code=
makeCode()

users.push({

user:u,

pass:p,

key:code

})

saveUsers()

grecaptcha.reset()

alert(

"Created\n\n"

+

"Your Veil Key:\n"

+

code

)

}

// ========= LOGIN =========

login.onclick=()=>{

const u=
username.value

const p=
password.value

const found=

users.find(

x=>

x.user===u

&&

x.pass===p

)

if(
!found
){

alert(
"Denied"
)

return

}

currentUser=
found

enter()

}

// ========= INVITES =========

document
.getElementById(
"addShadow"
)
.onclick=
()=>{

const code=
document
.getElementById(
"inviteInput"
)
.value
.trim()
.toUpperCase()

const found=

users.find(
x=>

x.key===code

)

if(
!found
){

alert(
"No signal"
)

return

}

if(
found.user===
currentUser.user
){

return

}

if(
!shadows.includes(
found.user
)
){

shadows.push(
found.user
)

saveShadows()

}

renderShadows()

}

// ========= CHAT =========

function render(){

messages.innerHTML=""

rooms[
currentRoom
]

.slice(-20)

.forEach(
m=>{

const div=
document
.createElement(
"div"
)

div.className=
"message"

div.innerText=
m

messages
.appendChild(
div
)

}

)

}

function sendMsg(){

if(
!messageInput
.value
.trim()
){

return

}

rooms[
currentRoom
]

.push(

currentUser.user

+

": "

+

messageInput
.value

)

messageInput.value=""

render()

}

send.onclick=
sendMsg

messageInput
.addEventListener(
"keydown",
e=>{

if(
e.key==="Enter"
){

sendMsg()

}

}
)

// ========= ROOMS =========

document
.querySelectorAll(
".room"
)
.forEach(
r=>{

r.onclick=
()=>{

currentRoom=
r.innerText

render()

}

}
)

// ========= ERASE =========

window
.addEventListener(
"beforeunload",

()=>{

Object
.keys(
rooms
)
.forEach(

r=>{

rooms[r]=[]

}

)

onlineUsers=[]

}
)
