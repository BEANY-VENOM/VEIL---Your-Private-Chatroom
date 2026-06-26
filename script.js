// ========= DATA =========

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
))
||
[]

let onlineUsers=[]

// ========= ELEMENTS =========

const loginPage=
document.getElementById(
"loginPage"
)

const app=
document.getElementById(
"app"
)

const messages=
document.getElementById(
"messages"
)

const sidebar=
document.getElementById(
"sidebar"
)

// ========= SIDEBAR =========

sidebar.innerHTML+=`

<div id="veilKeyBox">

Not logged in

</div>

<hr>

<h3>Rooms</h3>

<button class="room">
Lobby
</button>

<button class="room">
Afterhours
</button>

<button class="room">
Private
</button>

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

function saveShadows(){

localStorage.setItem(
"veil_shadows",
JSON.stringify(
shadows
))

}

function makeCode(){

return Math
.random()
.toString(36)
.substring(2,8)
.toUpperCase()

}

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
u=>
"● "+u
)
.join(
"<br>"
)

}

function renderShadows(){

const list=
document
.getElementById(
"shadowList"
)

list.innerHTML=

shadows.length

?

shadows
.map(
x=>
"• "+x
)
.join(
"<br>"
)

:

"None"

}

function renderKey(){

document
.getElementById(
"veilKeyBox"
)
.innerHTML=

`

<b>Your Veil Key</b>

<br><br>

${currentUser.key}

`

}

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

renderKey()

renderPresence()

renderShadows()

render()

}

// ========= SIGNUP =========

signup.onclick=
async()=>{

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

const existing=

await window.getDocs(

window.query(

window.collection(
window.db,
"users"
),

window.where(
"user",
"==",
u
)

)

)

if(
!existing.empty
){

alert(
"Exists"
)

return

}

const key=
makeCode()

await window.addDoc(

window.collection(
window.db,
"users"
),

{

user:u,

pass:p,

key:key

}

)

grecaptcha.reset()

alert(

"Created\n\nVeil Key:\n"

+

key

)

}

// ========= LOGIN =========

login.onclick=
async()=>{

const u=
username.value

const p=
password.value

const snap=

await window.getDocs(

window.query(

window.collection(
window.db,
"users"
),

window.where(
"user",
"==",
u
)

)

)

if(
snap.empty
){

alert(
"Denied"
)

return

}

const found=
snap.docs[0]
.data()

if(
found.pass
!==

p
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
async()=>{

const code=
inviteInput
.value
.trim()
.toUpperCase()

if(
!code
){

alert(
"Enter Veil Key"
)

return

}

const snap=

await window.getDocs(

window.query(

window.collection(
window.db,
"users"
),

window.where(
"key",
"==",
code
)

)

)

if(
snap.empty
){

alert(
"No signal"
)

return

}

const found=
snap.docs[0]
.data()

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

alert(
"Connected to "
+
found.user
)

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

messageInput.value

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

})

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

})
