import { useSocket } from "../../socket/useSocket.js";

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
	const { socket, connected, error } = useSocket();

	if (!socket) return (<Load />);			// TEM QUE ARRUMAR
	return (
		<div className="h-dvh flex flex-col bg-black overflow-hidden">
			<Header socket={socket} />
			{!connected && !error && <Load />}
			{connected && <Messages socket={socket} />}
			{error && <Error />}
			<Footer socket={socket} />
		</div>
	);
}
