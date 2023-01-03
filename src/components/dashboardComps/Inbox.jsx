import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { db } from "../../firebase"
import EmailItem from "./EmaiItem"

export default function Inbox() {
	const { currentUser } = useAuth()

	const [emails, setEmails] = useState([])

	const collectionRef = collection(db, currentUser.email)

	useEffect(() => {
		const unsub = async () => {
			const q = query(collectionRef, where("to", "==", currentUser.email))
			const res = await getDocs(q)
			setEmails(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		}

		return () => unsub()
	}, [collectionRef, currentUser?.email])


	return (
		<div className="inbox">
			{emails &&
				emails.map((email) => (
					<EmailItem
						id={email.id}
						from={email.from}
						title={email.title}
						key={email.id}
						timestamp={email.timestamp}
						isStarred={email.isStarred}
					/>
				))}
		</div>
	)
}
