import { useEffect } from "react";
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
	const { idPhone, phone } = useParams();
	const socket = useSocket(idPhone, phone);

	useEffect(() => {
		if (!socket) return;
		socket.connect();
		socket.on("connect_error", (error) => console.log("Erro ao conectar:", error.message));
		return (() => socket.disconnect());
	}, [socket]);

	// if (messages === null) return (<Load />);
	return (
		<div className="h-screen flex flex-col bg-black">
			<Header phone={phone} />
			<Messages socket={socket} />
		</div>
	);
}