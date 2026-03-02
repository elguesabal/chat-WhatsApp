import { useSocket } from "../../socket/useSocket.js";

import Load from "../../screens/Load.jsx";
import Error from "../../screens/Error.jsx";
import Header from "./Header.jsx";
import Contact from "./Contact.jsx";

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
*/
export default function Chats() {
	const { socket, connected, error } = useSocket();

	if (!socket) return (<Load />);			// TEM QUE ARRUMAR
	return (
		<div className="h-dvh flex flex-col bg-black overflow-hidden">
			<Header />
			{!connected && !error && <Load />}
			{connected && <Contact socket={socket} />}
			{error && <Error />}
		</div>
	);
}