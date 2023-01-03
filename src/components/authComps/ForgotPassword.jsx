import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function ForgotPassword() {
	const { resetPassword } = useAuth()
	const emailRef = useRef()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState("")

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setMessage("")
			setError("")
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("Check your email!")
		} catch (err) {
			setError("Failed to reset password!")
		}
		setLoading(false)
	}

	return (
		<div className="forgotPassword">
			<div className="forgotPassword__card">
				<h2 className="forgotPassword__title">Reset Password</h2>
				{error && <p className="forgotPassword__error">{error}</p>}
				{message && <p className="forgotPassword__success">{message}</p>}
				<form onSubmit={handleSubmit}>
					<div
						id="email"
						className="forgotPassword__inputDiv"
					>
						<label>Email</label>
						<input
							type="email"
							ref={emailRef}
							required
						/>
					</div>

					<button
						className="forgotPassword__button"
						type="submit"
						disabled={loading}
					>
						Reset Password
					</button>
				</form>
				<div>
					<Link to="/login">Login</Link>
				</div>
			</div>
			<div>
				Need an account? <Link to="/signup">Sign Up</Link>
			</div>
		</div>
	)
}
