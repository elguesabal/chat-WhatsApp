// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./route/login/Login.jsx";
import Chat from "./route/chat/Chat.jsx";
import NotFound from "./route/NotFound/NotFound.jsx";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/chat/:idPhone/:phone" element={<Chat />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	// </StrictMode>
);