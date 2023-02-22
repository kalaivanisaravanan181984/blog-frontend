import APIUrl from "./APIUrl";
import { useState } from "react";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const sendPasswordResetEmail = async (evt) => {
		evt.preventDefault();
		const response = await fetch(`${APIUrl}/forgotPassword`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
			}),
		});
		const data = await response.json();
		if (data.error) {
			alert(data.error);
		} else {
			alert(
				"Your password reset email has been sent. Go check your inbox or spam."
			);
		}
	};
	return (
		<div>
			<h1>Forgot Password</h1>
			<form onSubmit={sendPasswordResetEmail}>
				<label>Email Address:</label>
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(evt) => {
						setEmail(evt.target.value);
					}}
				/>
				<button type="submit" className="btn btn-primary">
					Send Link
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
