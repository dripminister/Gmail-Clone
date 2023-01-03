import { serverTimestamp } from "firebase/firestore"
import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function Signup() {
	const { signup } = useAuth()
	const navigate = useNavigate()

	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmationRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
			return setError("Passwords do not match!")
		}

		try {
			setError("")
			setLoading(true)
			await signup(emailRef.current.value, passwordRef.current.value)
			const collectionRef = collection(db, emailRef.current.value)
			const userCollectionRef = collection(db, "users")
			await addDoc(collectionRef, {
				from: "admin@admin.com",
				to: emailRef.current.value,
				title: "Welcome",
				message: `Welcome ${emailRef.current.value}`,
				timestamp: serverTimestamp(),
				read: false
			})
			await addDoc(userCollectionRef, {
				
			})
			navigate("/")
		} catch {
			setError("Failed to sign up!")
		}
		setLoading(false)
	}

	return (
		<div className="signup">
			<div className="signup__card">
				<h2 className="signup__title">Sign Up</h2>
				{error && <p className="signup__error">{error}</p>}
				<form onSubmit={handleSubmit}>
					<div
						id="email"
						className="signup__inputDiv"
					>
						<label>Email</label>
						<input
							type="email"
							ref={emailRef}
							required
						/>
					</div>
					<div
						id="password"
						className="signup__inputDiv"
					>
						<label>Password</label>
						<input
							type="password"
							ref={passwordRef}
							required
						/>
					</div>
					<div
						id="password-confirm"
						className="signup__inputDiv"
					>
						<label>Password Confirmation</label>
						<input
							type="password"
							ref={passwordConfirmationRef}
							required
						/>
					</div>
					<button
						className="signup__button"
						type="submit"
						disabled={loading}
					>
						Sign Up
					</button>
				</form>
			</div>
			<div>
				Already have an account? <Link to="/login">Log in</Link>
			</div>
		</div>
	)
}
