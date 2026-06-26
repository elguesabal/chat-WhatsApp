import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import Card from "./Card.jsx";

/**
 * @author VAMPETA
 * @brief GRAFICO QUE EXIBE INFORMACOES DE ATIVIDADES DE ENVIO E RECEBIMENTO DE MENSAGENS
 * @param {Boolean} loading INFORMA O ESTADO DE LOAD
 * @param {Object} info INFORMACOES DA METRICA
 */
export default function Graphic({ loading, info }) {
	const data = Object.entries(info?.hourly || {}).map(([hour, value]) => ({ hour: `${hour}h`, messages: value }));
	const total = data.reduce((acc, item) => (acc + item.messages), 0);
	const peak = data.reduce((max, item) => ((item.messages > max.messages) ? item : max), { hour: "--", messages: 0 });
	const average = (data.length) ? Math.round(total / data.length) : 0;

	if (loading) return (
		<>
			<div className="min-h-[300px] bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse" />
			<div className="grid grid-cols-2 gap-4">
				<Card loading={loading} text="Pico" value={peak.hour} />
				<Card loading={loading} text="Média/h" value={average} />
			</div>
		</>
	);
	return (
		<>
			<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 md:p-6">
				<div className="flex items-end justify-between mb-2">
					<div>
						<p className=" text-xs text-zinc-400">Total de mensagens</p>
						<h3 className="text-3xl font-bold text-zinc-100">{total}</h3>
					</div>
					<i className="bi bi-graph-up text-3xl text-orange-500" />
				</div>
				<div className="h-48">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={data}>
							<XAxis dataKey="hour" stroke="#71717a" fontSize={12} />
							<YAxis stroke="#71717a" fontSize={12} width={25} />
							<Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", borderRadius: "10px" }} />
							<Area type="monotone" dataKey="messages" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Card loading={loading} text="Pico" value={peak.hour} />
				<Card loading={loading} text="Média/h" value={average} />
			</div>
		</>
	);
}