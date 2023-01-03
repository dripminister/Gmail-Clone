import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarBorderIcon from "@mui/icons-material/StarBorder"
import StarIcon from "@mui/icons-material/Star"
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context/AuthContext'

export default function EmailItem({id, title, message, from, to, isSent, timestamp, isStarred}) {

  const [day, setDay] = useState("")
  const { currentUser } = useAuth()
  const [starGiven, setStarGiven] = useState(false)
  const docRef = doc(db, currentUser.email, id)

  useEffect(() => {
    const date = timestamp.toDate()
    const stringDate = date.toString().split(" ")
    const q = stringDate.slice(1,4)
    const string = q.join(" ")
    setDay(string)
  },[timestamp])

  useEffect(()=> {
    if(isStarred) setStarGiven(true)
  },[isStarred])

  const handleStar = async (e) => {
    e.preventDefault()
    await updateDoc(docRef, {
      isStarred: !isStarred
    })
    setStarGiven(!starGiven)
  }

  const handleRead = async () => {
    await updateDoc(docRef, {
      isRead: true
    })
  }

  return (
		<Link
			to={`/mail/${id}`}
			className="emailItem"
      onClick={handleRead}
		>
			<p>{isSent ? `to: ${to}` : from}</p>
      <div className='emailItem__star' onClick={handleStar}>
        {starGiven ? <StarIcon /> : <StarBorderIcon />}
      </div>
			<p>{title}</p>
			<p>{day}</p>
		</Link>
	)
}
