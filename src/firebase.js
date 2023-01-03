import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyAvBlw1RHp7MXcnQp5ul9-VjFp0uo4tcNg",
	authDomain: "drive-clone-e2ca6.firebaseapp.com",
	projectId: "drive-clone-e2ca6",
	storageBucket: "drive-clone-e2ca6.appspot.com",
	messagingSenderId: "421590226067",
	appId: "1:421590226067:web:744db615e20d9601002966",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)