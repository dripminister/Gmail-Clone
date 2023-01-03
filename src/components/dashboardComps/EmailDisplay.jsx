import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function EmailDisplay() {

  const navigate = useNavigate()
  const {currentUser} = useAuth()
  const {mailId} = useParams()
  const [email, setEmail] = useState({})
  const [date, setDate] = useState("")

  useEffect(() => {
    const unsub = async () => {
      const docRef = doc(db, currentUser.email, mailId)
      const res = await getDoc(docRef)
      setEmail(res.data())
    }

    return () => unsub()
  },[currentUser.email, mailId])

  useEffect(() => {
    if(!email?.timestamp) return
    const date = email.timestamp.toDate()
		const stringDate = date.toString().split(" ")
		const q = stringDate.slice(0, 5)
		const string = q.join(" ")
		setDate(string)
  },[email])

  return (
		<div className="emailDisplay">
			<div className="emailDisplay__top">
				<ArrowBackIcon
					className="emailDisplay__Icon"
					onClick={() => navigate(-1)}
				/>
			</div>
			{email && (
				<div className="emailDisplay__center">
					<h1>{email.title}</h1>
					<div className='emailDisplay__info'>
            <div>
						<h2>{email.from}</h2>
            <h4>To: {email.to}</h4>
            </div>
						<h4>{date}</h4>
					</div>
					{email.message}
				</div>
			)}
		</div>
	)
}
