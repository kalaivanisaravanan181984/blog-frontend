import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Admin from "./Admin";
import PostEditor from "./PostEditor";
import Author from "./Author";
import CreateAccount from "./CreateAccount";
import ForgotPassword from "./ForgotPassword";
import SetPassword from "./SetPassword";

function App() {
	return (
		<div className="App container">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/createAccount" element={<CreateAccount />} />
					<Route
						path="/forgotPassword"
						element={<ForgotPassword />}
					/>
					<Route path="/admin" element={<Admin />} />
					<Route
						path="/admin/postEditor/:id"
						element={<PostEditor />}
					/>
					<Route path="/author/:id" element={<Author />} />
					<Route path="/setPassword" element={<SetPassword />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
