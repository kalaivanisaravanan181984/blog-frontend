import { useState } from "react";
import APIUrl from "./APIUrl";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const isNewUser = searchParams.get("newUser");
	const hasPasswordBeenReset = searchParams.get("passwordReset");

	const login = async (evt) => {
		evt.preventDefault();

		try {
			const response = await fetch(`${APIUrl}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
				credentials: "include",
			});
			const data = await response.json();
			console.log(data);
			if (data.error) {
				setError(data.error);
			} else {
				//redirect to next screen here, login was succcessful
				navigate("/admin");
			}
		} catch (error) {
			setError("Login API call failed. Check console for more details.");
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			{isNewUser && <p>Your account has been created. Please log in.</p>}
			{hasPasswordBeenReset && (
				<p>Your password has been reset. Go log in merily.</p>
			)}
			<form onSubmit={login}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="text"
						className="form-control"
						value={email}
						id="email"
						onChange={(evt) => {
							setEmail(evt.target.value);
						}}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(evt) => {
							setPassword(evt.target.value);
						}}
					/>
				</div>
				<p style={{ color: "red" }}>{error}</p>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
				<br />
				<Link to="/createAccount">Create New Account</Link>
				<br />
				<Link to="/forgotPassword">Forgot Password?</Link>
			</form>
		</div>
	);
};

export default Login;
