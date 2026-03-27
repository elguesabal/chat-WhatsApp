import { useState } from "react";
import { Link } from "react-router-dom";

import { useGetDashboard } from "./useGetDashboard.js";

import DateSelector from "./DateSelector.jsx";

/**
 * @author VAMPETA
 * @brief COMPONENTE QUE CRIA UM CARD
 * @param {Boolean} loading INFORMA O ESTADO DE LOAD
 * @param {String} text TEXTO DESCRITIVO DO CARD
 * @param {Number} value VALOR QUE DEVE SER EXIBIDO JUNTO COM A DESCRICAO
*/
function Card({ loading, text, value }) {
	return (
		<div className={`bg-zinc-900 p-5 rounded-xl border border-zinc-800 min-h-[100px] flex items-center ${(loading) ? "animate-pulse" : ""}`}>
			{!loading && (
				<div>
					<p className="text-xs md:text-sm text-zinc-400">{text}</p>
					<h2 className="text-xl md:text-2xl font-bold mt-2">{value || 0}</h2>
				</div>
			)}
		</div>
	);
}

/**
 * @author VAMPETA
 * @brief CARDS DO DASHBOARD
*/
export default function Cards({ socket }) {
	const [date, setDate] = useState(new Date().toLocaleDateString("sv-SE"));
	const { info, loading } = useGetDashboard(socket, date);
	const messagesReceived = Object.values(info?.received || {}).reduce((acc, v) => acc + (v || 0), 0);
	const messagesSent = Object.values(info?.sent || {}).reduce((acc, v) => acc + (v || 0), 0);

	return (
		<div className="p-4 md:p-6 flex flex-col gap-6 overflow-y-auto animate-toastIn">
			<DateSelector date={date} setDate={setDate} />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
				<Card loading={loading} text="Mensagens recebidas hoje" value={messagesReceived} />
				<Card loading={loading} text="Mensagens enviadas" value={messagesSent} />
				<Card loading={loading} text="Novos contatos" value={info?.newContacts} />
				<Card loading={loading} text="Redirecionamentos" value={info?.redirects} />
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
			<div>
				<div className="flex items-center gap-3 mb-4">
					<h2 className="text-sm md:text-base font-semibold text-zinc-200 whitespace-nowrap">Mensagens recebidas hoje</h2>
					<div className="flex-1 h-px bg-zinc-800" />
				</div>
				<div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
					<Card loading={loading} text="Texto" value={info.received?.text} />
					<Card loading={loading} text="Figurinha" value={info.received?.sticker} />
					<Card loading={loading} text="Áudio" value={info.received?.audio} />
					<Card loading={loading} text="Imagem" value={info.received?.image} />
					<Card loading={loading} text="Vídeo" value={info.received?.video} />
					<Card loading={loading} text="Localização" value={info.received?.location} />
					<Card loading={loading} text="Contato" value={info.received?.contacts} />
					<Card loading={loading} text="Documento" value={info.received?.document} />
				</div>
			</div>
			<div>
				<div className="flex items-center gap-3 mb-4">
					<h2 className="text-sm md:text-base font-semibold text-zinc-200 whitespace-nowrap">Mensagens enviadas hoje</h2>
					<div className="flex-1 h-px bg-zinc-800" />
				</div>
				<div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
					<Card loading={loading} text="Texto" value={info.sent?.text} />
					<Card loading={loading} text="Figurinha" value={info.sent?.sticker} />
					<Card loading={loading} text="Áudio" value={info.sent?.audio} />
					<Card loading={loading} text="Imagem" value={info.sent?.image} />
					<Card loading={loading} text="Vídeo" value={info.sent?.video} />
					<Card loading={loading} text="Localização" value={info.sent?.location} />
					<Card loading={loading} text="Contato" value={info.sent?.contacts} />
					<Card loading={loading} text="Documento" value={info.sent?.document} />
				</div>
			</div>
		</div>
	);
}