import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "../../socket/socket.js";

import Load from "../../screens/Load.jsx";
import Error from "../../screens/Error.jsx";

import Header from "./header/Header.jsx";
import Messages from "./messages/Messages.jsx";
import Footer from "./footer/Footer.jsx"

/**
 * @author VAMPETA
 * @brief COMPONENTE PRINCIPAL DO CHAT
*/
export default function Chat() {
	const [status, setStatus] = useState("loading");
	const { idPhone, phone } = useParams();
	const socket = useSocket(idPhone, phone);

	useEffect(() => {
		if (!socket) return;
		socket.connect();
		socket.on("connect", () => setStatus("connected"));
		socket.on("connect_error", (error) => {
			console.log("Erro ao conectar:", error.message)
			setStatus("error");
		});
		return (() => socket.disconnect());
	}, [socket]);

	return (
		<div className="h-dvh flex flex-col bg-black overflow-hidden">
			<Header socket={socket} />
			{status === "loading" && <Load />}
			{status === "connected" && <Messages socket={socket} />}
			{status === "error" && <Error />}
			<Footer socket={socket} />
		</div>
	);
}