import { handleNew, handleSelect, handleUpdate, handleDelete } from "./functions.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL PELA LISTA DE MENSAGENS
 * @param {Hook} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function List({ socket, messages, setMessages, selectedId, setSelectedId, view, setView, search, setSearch, selected, filteredMessages }) {
	return (
		<div className={`${view === "list" ? "flex" : "hidden"} xl:flex flex-col w-full xl:w-72 2xl:w-80 bg-zinc-900 border border-zinc-800 rounded-lg p-3 min-h-0`}>

			{/* HEADER */}
			<div className="flex flex-col gap-3">
				<button className="bg-orange-500 text-black rounded p-2 text-sm hover:opacity-90 transition" onClick={() => handleNew(setMessages, setSelectedId, setView, selectedId)}>
					+ Nova mensagem
				</button>
				<input className="bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
			</div>

			{/* LISTA */}
			<div className="flex flex-col gap-2 mt-3 overflow-y-auto flex-1 min-h-0 pr-1">
				{filteredMessages.length === 0 && (
					<p className="text-xs text-zinc-500 text-center mt-4">Nenhuma mensagem encontrada</p>
				)}
				{filteredMessages.map((msg) => (
					<div className={`p-3 rounded border cursor-pointer transition ${(selectedId === msg.id) ? "bg-zinc-800 border-orange-500" : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"}`} key={msg.id} onClick={() => handleSelect(msg.id, setSelectedId, setView)}>
						<p className="text-sm font-medium">{msg.name}</p>
						<p className="text-xs text-zinc-400 line-clamp-1">{msg.content || "Sem conteúdo"}</p>
					</div>
				))}
			</div>

		</div>
	);
}