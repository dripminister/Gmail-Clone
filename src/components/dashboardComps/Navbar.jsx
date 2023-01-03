import React from 'react'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Navbar() {

    const [error, setError] = useState("")
		const { currentUser, logout } = useAuth()
		const navigate = useNavigate()

		async function handleLogout() {
			setError("")
			try {
				await logout()
				navigate("/login")
			} catch {
				setError("Failed to log out")
			}
		}
  return (
		<div className="navbar">
			<Link to="/">
				<h1 className="navbar__logo">Zmail</h1>
			</Link>
			<form>
				<input />
			</form>
			<button onClick={handleLogout}>Log Out</button>
		</div>
	)
}
