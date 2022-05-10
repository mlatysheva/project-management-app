import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Boards } from "./components/Boards/Boards";
import ErrorPage from "./components/ErrorPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import CreateBoard from "./components/Board/CreateBoard";
import Header from "./components/Header";
import { initialState } from "./reducers/listReducer";
import { Home } from "./components/Home/Home";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import Signin from "./components/Signin/signin";
import { useSelector } from "react-redux";
import { selectUser } from "./store/signup/userOptions";

function App() {
	const register = useSelector(selectUser);
	return (
		<div className="App">
			<ErrorBoundary>
				<Router>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Register />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/project-management-app" element={<Home />} />
						<Route
							path="/boards"
							element={<Boards lists={initialState.lists} />}
						/>
						<Route path="/create" element={<CreateBoard />} />
						<Route path="error" element={<ErrorPage />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
					<Footer />
				</Router>
			</ErrorBoundary>
		</div>
	);
}

export default App;
