import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Boards } from "./components/Boards/Boards";
import ErrorPage from "./components/ErrorPage";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import CreateBoard from "./components/Board/CreateBoard";
import Header from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import Signin from "./components/Signin/signin";
import { EditProfile } from "./components/Edit/Edit";
import { initialState } from "./store/reducers/allBoardsReducer";
import { useCallback, useEffect, useState } from "react";

function useLocalStorage(key: string, initialState: string) {
	const [value, setValue] = useState(localStorage.getItem(key) ?? initialState);
	const updatedSetValue = useCallback(
		(newValue: string) => {
			if (newValue === initialState || typeof newValue === "undefined") {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, newValue);
			}
			setValue(newValue ?? initialState);
		},
		[initialState, key]
	);
	return [value, updatedSetValue];
}

function App() {
	let [localStorage, setToken] = useLocalStorage("userToken", "");

	return (
		<div className="App">
			<ErrorBoundary>
				<Router>
					{/*localStorage.getItem("userToken") ? <HeaderIfSignin /> : <Header />}
					<HeaderIfSignin />*/}
					<Header token={localStorage} />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signin" element={<Signin updateToken={setToken} />} />
						<Route path="/edit" element={<EditProfile />} />
						<Route path="/signup" element={<Register />} />
						<Route path="/logout" element={<Logout updateToken={setToken} />} />
						<Route path="/project-management-app" element={<Home />} />
						<Route
							path="/boards"
							element={<Boards boards={initialState.boards} />}
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
