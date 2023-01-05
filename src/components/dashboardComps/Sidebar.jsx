import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import InboxIcon from "@mui/icons-material/Inbox"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import SendIcon from "@mui/icons-material/Send"
import MarkunreadIcon from "@mui/icons-material/Markunread"
import EditIcon from "@mui/icons-material/Edit"
import CloseIcon from "@mui/icons-material/Close"
import { useAuth } from "../../context/AuthContext"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"

export default function Sidebar() {
	const location = useLocation()
	const [open, setOpen] = useState(false)
	const { currentUser } = useAuth()
	const [title, setTitle] = useState("")
	const [to, setTo] = useState("")
	const [message, setMessage] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		const senderRef = collection(db, currentUser.email)
		const receiverRef = collection(db, to)
		await addDoc(senderRef, {
			from: currentUser.email,
			to,
			title,
			message,
			timestamp: serverTimestamp(),
            isRead: true,
			isStarred: false
		})
		await addDoc(receiverRef, {
			from: currentUser.email,
			to,
			title,
			message,
			timestamp: serverTimestamp(),
            isRead: false,
			isStarred: false
		})
		setMessage("")
		setTitle("")
		setTo("")
		setOpen(false)
	}

	const matchPath = (route) => {
		if(route === location.pathname) return true
	}

	return (
		<div className="sidebar">
			<ul>
				<li
					className="sidebar__compose"
					onClick={() => setOpen(true)}
				>
					<EditIcon /> Compose
				</li>
				<Link to="/">
					<li className={`${matchPath("/") && "sidebar__active"}`}>
						<InboxIcon /> Inbox
					</li>
				</Link>
				<Link to="/unread">
					<li className={`${matchPath("/unread") && "sidebar__active"}`}>
						<MarkunreadIcon /> Unread
					</li>
				</Link>
				<Link to="/starred">
					<li className={`${matchPath("/starred") && "sidebar__active"}`}>
						<StarBorderIcon /> Starred
					</li>
				</Link>
				<Link to="/sent">
					<li className={`${matchPath("/sent") && "sidebar__active"}`}>
						<SendIcon /> Sent
					</li>
				</Link>
			</ul>
			{open && (
				<div className="sidebar__popUp">
					<div className="sidebar__title">
						<h4>New Message</h4>
						<CloseIcon
							className="sidebar__Icon"
							onClick={() => setOpen(false)}
						/>
					</div>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							required
							placeholder="To"
							onChange={(e) => setTo(e.target.value)}
							value={to}
						/>
						<input
							type="text"
							required
							placeholder="Subject"
							onChange={(e) => setTitle(e.target.value)}
							value={title}
						/>
						<textarea
							className="sidebar__textarea"
							onChange={(e) => setMessage(e.target.value)}
							value={message}
						></textarea>
						<button className="sidebar__sendButton">Send</button>
					</form>
				</div>
			)}
		</div>
	)
}

