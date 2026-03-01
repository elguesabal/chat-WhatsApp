import { Navigate } from "react-router-dom";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

import "./style/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SocketProvider } from "./socket/SocketProvider.jsx";
import Home from "./route/home/home.jsx";
import Login from "./route/login/Login.jsx";
import Chats from "./route/chats/Chats.jsx";
import Chat from "./route/chat/Chat.jsx";
import NotFound from "./route/NotFound/NotFound.jsx";

/**
 * @author VAMPETA
 * @brief FUNCAO QUE VERIFICA SE O USUARIO TEM COOKIES PARA LOGIN
 * @param children ELEMENTO FILHO
*/
function ProtectedRoute({ children }) {
	const phone = Cookies.get("phone");
	const idPhone = Cookies.get("idPhone");
	const token = Cookies.get("token");

	if (!phone || !idPhone || !token) return (<Navigate to="/login" replace />);
	return (children);
}

createRoot(document.getElementById("root")).render(
	// <StrictMode>
	<BrowserRouter>
		<SocketProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chat" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
				<Route path="/chat/:phone" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</SocketProvider>
	</BrowserRouter>
	// </StrictMode>
);