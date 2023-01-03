import React, { useRef, useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Login() {
	const { login } = useAuth()

	const navigate = useNavigate()
	const emailRef = useRef()
	const passwordRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError("")
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate("/")
		} catch (err) {
			console.error(err.message)
			setError("Failed to log in!")
		}
		setLoading(false)
	}

	return (
		<div className="login">
			<div className="login__card">
				<h2 className="login__title">Log In</h2>
				{error && <p className="login__error">{error}</p>}
				<form onSubmit={handleSubmit}>
					<div
						id="email"
						className="login__inputDiv"
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
						className="login__inputDiv"
					>
						<label>Password</label>
						<input
							type="password"
							ref={passwordRef}
							required
						/>
					</div>
					<button
						className="login__button"
						type="submit"
						disabled={loading}
					>
						Log In
					</button>
				</form>
				<div>
					<Link to="/forgot">Forgot password?</Link>
				</div>
			</div>
			<div>
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</div>
	)
}
