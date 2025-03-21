import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: import.meta.env.API_KEY,
	authDomain: import.meta.env.AUTH_DOMAIN,
	projectId: import.meta.env.PROJECT_ID,
	storageBucket: import.meta.env.STORAGE_BUCKET,
	messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
	appId: import.meta.env.APP_ID,
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
