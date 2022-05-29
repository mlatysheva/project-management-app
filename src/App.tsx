import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Boards } from "./components/Boards/Boards";
import ErrorPage from "./components/ErrorPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { useAppSelector } from "./store/hooks";
import Footer from "./components/Footer";
import CreateBoard from "./components/Board/CreateBoard";
import Header from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import Signin from "./components/Signin/signin";
import { EditProfile } from "./components/Edit/Edit";
import { useCallback, useState } from "react";
import EditBoard from "./components/Board/EditBoard";

export const baseUrl = "project-management-app";

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

//localStorage.removeItem("userToken");

function App() {
	let [localStorage, setToken] = useLocalStorage("userToken", "");
	const boardId = useAppSelector((state) => state.board.id);
	return (
		<div className="App">
			<ErrorBoundary>
				<Router>
					{/*localStorage.getItem("userToken") ? <HeaderIfSignin /> : <Header />}
					<HeaderIfSignin />*/}
					<Header token={localStorage} />
					<Routes>
						<Route path={`/${baseUrl}`} element={<Home />} />
						<Route
							path={`/${baseUrl}/signin`}
							element={<Signin updateToken={setToken} />}
						/>
						<Route
							path={`/${baseUrl}/edit`}
							element={<EditProfile updateToken={setToken} />}
						/>
						<Route path={`/${baseUrl}/signup`} element={<Register />} />
						<Route
							path={`/${baseUrl}/logout`}
							element={<Logout updateToken={setToken} />}
						/>
						{/* //TODO:скрыть если нет пользователя */}
						<Route path={`/${baseUrl}/boards`} element={<Boards  />} />
						<Route path={`/${baseUrl}/createboard`} element={<CreateBoard />} />
						{/* //до скрыть если нет пользователя */}
						<Route path={`/${baseUrl}/editboard`} element={<EditBoard />} />
						<Route path={`/${baseUrl}/error`} element={<ErrorPage />} />
						<Route path={`/${baseUrl}/*`} element={<ErrorPage />} />
					</Routes>
					<Footer />
				</Router>
			</ErrorBoundary>
		</div>
	);
}

export default App;
