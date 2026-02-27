import { createContext, useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import createSocket from "./config_socket.js";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
	const socketRef = useRef(null);
	const [socket, setSocket] = useState(null);
	const [connected, setConnected] = useState(false);
	const [error, setError] = useState(false);
	const [token, setToken] = useState(() => Cookies.get("token"));

	useEffect(() => {
		const interval = setInterval(() => {
			const newToken = Cookies.get("token");
			setToken((prev) => ((prev !== newToken) ? newToken : prev));
		}, 500);

		return (() => clearInterval(interval));
	}, [token]);
	useEffect(() => {
		if (!token) {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
			setSocket(null);
			setConnected(false);
			setError(false);
			return ;
		}
		if (socketRef.current) socketRef.current.disconnect();
		const newSocket = createSocket(token);
		newSocket.on("connect", () => {
			console.log("Conectado");
			setConnected(true);
			setError(false);
		});
		newSocket.on("connect_error", (error) => {
			console.log("Erro:", error.message);
			setError(true);
			setConnected(false);
		});
		newSocket.on("disconnect", () => {
			console.log("Desconectado");
			setConnected(false);
		});
		newSocket.connect();
		socketRef.current = newSocket;
		setSocket(newSocket);
		return (() => newSocket.disconnect());
	}, [token]);

	return (
		<SocketContext.Provider value={{ socket, connected, error }}>
			{children}
		</SocketContext.Provider>
	);
}