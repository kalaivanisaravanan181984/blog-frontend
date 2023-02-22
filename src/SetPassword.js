import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import APIUrl from "./APIUrl";

const SetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	// console.log(searchParams.get("token"));

	const formSubmitted = async (evt) => {
		evt.preventDefault();
		if (password !== confirmPassword) {
			alert("Your passwords don't match. Try again!");
		} else if (!password) {
			alert("Your password can't be empty.");
		} else {
			const response = await fetch(`${APIUrl}/setPassword`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password,
					token: searchParams.get("token"),
				}),
				credentials: "include",
			});
			const data = await response.json();
			if (data.error) {
				alert(data.error);
			} else {
				alert(
					"Your password has been reset. Now taking you to the admin page."
				);
				navigate("/admin");
				//navigate("/login?passwordReset=true");
			}
		}
	};

	return (
		<div>
			<h1>Set New Password</h1>
			<form onSubmit={formSubmitted}>
				<label>Enter New Password:</label>
				<input
					type="password"
					className="form-control"
					value={password}
					onChange={(evt) => {
						setPassword(evt.target.value);
					}}
				/>
				<label>Confirm New Password:</label>
				<input
					type="password"
					className="form-control"
					value={confirmPassword}
					onChange={(evt) => {
						setConfirmPassword(evt.target.value);
					}}
				/>
				<button type="submit" className="btn btn-primary">
					Set Password
				</button>
			</form>
		</div>
	);
};

export default SetPassword;
