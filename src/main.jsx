import { Navigate } from "react-router-dom";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";

import "./style/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SocketProvider } from "./socket/SocketProvider.jsx";
import Home from "./route/home/home.jsx";
import Login from "./route/login/Login.jsx";
import Dashboard from "./route/dashboard/Dashboard.jsx";
import Chats from "./route/chats/Chats.jsx";
import Chat from "./route/chat/Chat.jsx";
import Contacts from "./route/contacts/Contacts.jsx";
import Spreadsheets from "./route/spreadsheets/Spreadsheets.jsx";
import Settings from "./route/settings/Settings.jsx";
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

	if (!phone || !idPhone || !token) return (<Navigate to="/" replace />);
	return (children);
}

createRoot(document.getElementById("root")).render(
	// <StrictMode>
		<>
			<Toaster position="top-center" />
			<BrowserRouter>
				<SocketProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
						<Route path="/chat" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
						<Route path="/chat/:phone" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
						<Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
						<Route path="/spreadsheets" element={<ProtectedRoute><Spreadsheets /></ProtectedRoute>} />
						<Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</SocketProvider>
			</BrowserRouter>
		</>
	// </StrictMode>
);