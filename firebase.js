import {
initializeApp
}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js"

import {
getFirestore
}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js"

const firebaseConfig={

apiKey:
"YOUR_API_KEY",

authDomain:
"veil-6fea0.firebaseapp.com",

projectId:
"veil-6fea0",

storageBucket:
"veil-6fea0.firebasestorage.app",

messagingSenderId:
"186018491353",

appId:
"1:186018491353:web:f189059317e3669b42c7c8"

}

const app=
initializeApp(
firebaseConfig
)

const db=
getFirestore(
app
)

window.db=db
