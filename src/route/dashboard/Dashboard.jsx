import { useState } from "react";
import { Link } from "react-router-dom";

import { useSocket } from "../../socket/useSocket.js";
import { useGetDashboard } from "./useGetDashboard.js";

import SideBar from "../../utils/components/Sidebar.jsx";
import Load from "../../screens/Load.jsx";
import Error from "../../screens/Error.jsx";
import Header from "./Header.jsx";

/**
 * @author VAMPETA
 * @brief CARDS DO DASHBOARD
*/
function Cards({ socket }) {
	const { info, loading } = useGetDashboard(socket);

	return (
		<div className="p-4 md:p-6 flex flex-col gap-6 animate-toastIn">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				<div className={`bg-zinc-900 p-5 rounded-xl border border-zinc-800 min-h-[100px] flex items-center ${(loading) ? "animate-pulse" : ""}`}>
					{!loading && (
						<div>
							<p className="text-xs md:text-sm text-zinc-400">Mensagens hoje</p>
							<h2 className="text-xl md:text-2xl font-bold mt-2">{info.messagesToday}</h2>
						</div>
					)}
				</div>
				<div className={`bg-zinc-900 p-5 rounded-xl border border-zinc-800 min-h-[100px] flex items-center ${(loading) ? "animate-pulse" : ""}`}>
					{!loading && (
						<div>
							<p className="text-xs md:text-sm text-zinc-400">Conversas ativas</p>
							<h2 className="text-xl md:text-2xl font-bold mt-2">{info.activeChats}</h2>
						</div>
					)}
				</div>
				<div className={`bg-zinc-900 p-5 rounded-xl border border-zinc-800 min-h-[100px] flex items-center ${(loading) ? "animate-pulse" : ""}`}>
					{!loading && (
						<div>
							<p className="text-xs md:text-sm text-zinc-400">Não lidas</p>
							<h2 className="text-xl md:text-2xl font-bold mt-2">{info.unread}</h2>
						</div>
					)}
				</div>
			</div>
			<div className="bg-zinc-900 p-5 md:p-6 rounded-xl border border-zinc-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h2 className="text-base md:text-lg font-semibold mb-1">Ir para conversas</h2>
					<p className="text-zinc-400 text-xs md:text-sm">Visualize e responda mensagens em tempo real.</p>
				</div>
				<Link className="w-full md:w-auto text-center px-6 py-2 bg-orange-500 text-black rounded-lg font-medium hover:bg-orange-400 transition" to="/chat">
					Abrir
				</Link>
			</div>
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief PAGINA DE DASHBOARD (PAGINA PRINCIPAL DO CLIENTE)
*/
export default function Dashboard() {
	const [open, setOpen] = useState(false);
	const { socket, connected, error } = useSocket();

	if (!socket) return (<Load />);
	return (
		<div className="flex h-dvh bg-black text-white">
			<SideBar open={open} setOpen={setOpen} />
			<main className="flex-1 flex flex-col">
				<Header setOpen={setOpen} />
				{!connected && !error && <Load />}
				{connected && <Cards socket={socket} />}
				{error && <Error />}
			</main>
		</div>
	);
}