import Signup from "./components/authComps/Signup"
import { AuthProvider } from "./context/AuthContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inbox from "./components/dashboardComps/Inbox"
import Login from "./components/authComps/Login"
import PrivateRoute from "./components/authComps/PrivateRoute"
import ForgotPassword from "./components/authComps/ForgotPassword"
import Sent from "./components/dashboardComps/Sent"
import EmailDisplay from "./components/dashboardComps/EmailDisplay"
import Navbar from "./components/dashboardComps/Navbar"
import Sidebar from "./components/dashboardComps/Sidebar"
import Starred from "./components/dashboardComps/Starred"
import Unread from "./components/dashboardComps/Unread"

function App() {
	return (
		<div>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={
								<PrivateRoute>
									<div className="app">
										<Navbar />
										<div className="app__flexContainer">
											<Sidebar />
											<Inbox />
										</div>
									</div>
								</PrivateRoute>
							}
						/>
						<Route
							path="/unread"
							element={
								<PrivateRoute>
									<div className="app">
										<Navbar />
										<div className="app__flexContainer">
											<Sidebar />
											<Unread />
										</div>
									</div>
								</PrivateRoute>
							}
						/>
						<Route
							path="/starred"
							element={
								<PrivateRoute>
									<div className="app">
										<Navbar />
										<div className="app__flexContainer">
											<Sidebar />
											<Starred />
										</div>
									</div>
								</PrivateRoute>
							}
						/>
						<Route
							path="/sent"
							element={
								<PrivateRoute>
									<div className="app">
										<Navbar />
										<div className="app__flexContainer">
											<Sidebar />
											<Sent />
										</div>
									</div>
								</PrivateRoute>
							}
						/>
						<Route
							path="/mail/:mailId"
							element={
								<PrivateRoute>
									<div className="app">
										<Navbar />
										<div className="app__flexContainer">
											<Sidebar />
											<EmailDisplay />
										</div>
									</div>
								</PrivateRoute>
							}
						/>
						<Route
							path="/signup"
							element={<Signup />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
						<Route
							path="/forgot"
							element={<ForgotPassword />}
						/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</div>
	)
}

export default App
