import firebase from 'firebase'

    const firebaseConfig = {
        apiKey: "AIzaSyC0f6gYHUWEdu4jvR-TAG-F9xJX8JK2aeA",
        authDomain: "app-delivery-gas-9d18d.firebaseapp.com",
        databaseURL: "https://app-delivery-gas-9d18d.firebaseio.com",
        projectId: "app-delivery-gas-9d18d",
        storageBucket: "",
        messagingSenderId: "275633883573",
        appId: "1:275633883573:web:623ce591153e33476131fc"
    };

    export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
