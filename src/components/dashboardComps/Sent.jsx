import { collection, getDocs, query, where } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { db } from "../../firebase"
import EmailItem from "./EmaiItem"

export default function Sent() {
	const { currentUser } = useAuth()

	const [emails, setEmails] = useState([])

	const collectionRef = collection(db, currentUser.email)

	useEffect(() => {
		const unsub = async () => {
			const q = query(collectionRef, where("from", "==", currentUser.email))
			const res = await getDocs(q)
			setEmails(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		}

		return () => unsub()
	}, [collectionRef, currentUser?.email])
	return (
		<div className="sent">
			{emails &&
				emails.map((email) => (
					<EmailItem
						key={email.id}
						id={email.id}
						from={email.from}
						title={email.title}
						to={email.to}
                        timestamp={email.timestamp}
                        message={email.message}
						isSent
                        isStarred={email.isStarred}
					/>
				))}
		</div>
	)
}
