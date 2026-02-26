import { Navigate } from "react-router-dom";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

import "./style/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/chat" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
				<Route path="/chat/:idPhone/:phone" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	// </StrictMode>
);



// import { createContext, useState, useRef, useEffect } from "react";

// import server from "./server.js";

// const SocketContext = createContext();

// /**
//  * @author VAMPETA
//  * @brief FUNCAO QUE CRIA A CONEXAO COM O WEBSOCKET
//  * @param children ELEMENTO FILHO
// */
// function SocketProvider({ children }) {
// 	const socketRef = useRef(null);
// 	const [socket, setSocket] = useState(null);

// 	useEffect(() => {
// 		const token = Cookies.get("token");

// 		if (!token) return;
// 		socketRef.current = io(server, {
// 			autoConnect: false,
// 			transports: ["websocket"],
// 			auth: {
// 				token: token
// 			}
// 		});
// 		socketRef.current.connect();
// 		setSocket(newSocket);
// 		return (() => socketRef.current?.disconnect());
// 	}, []);

// 	return (
// 		<SocketContext.Provider value={socketRef.current}>
// 			{children}
// 		</SocketContext.Provider>
// 	);
// }



// import { useContext } from "react";
// import { SocketContext } from "./SocketProvider";

// export function useSocket() {
//   return useContext(SocketContext);
// }