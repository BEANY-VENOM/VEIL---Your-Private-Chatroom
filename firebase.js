import {
initializeApp
}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js"

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
where
}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js"

const firebaseConfig={

apiKey:
"AIzaSyDH08AFOZ3CPWqQKSArwXce7sfCEVfLIUY",

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
window.collection=collection
window.addDoc=addDoc
window.getDocs=getDocs
window.query=query
window.where=where
