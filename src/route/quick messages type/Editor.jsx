import FieldsText from "./text/editor/FieldsText.jsx";

import { handleUpdateName, handleUpdateFields, handleDelete } from "./functions.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL PELO EDITOR DA MENSAGEM (POR ENQUANTO AINDA EXISTE PREVIEW MAS ACHO QUE VOU REMOVER)
 * @param {Hook} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Editor({ socket, messages, setMessages, selectedMessage, setSelectedMessage, view, setView, search, setSearch, selected, filteredMessages }) {
	return (
		<div className={`${view === "editor" ? "flex" : "hidden"} xl:flex flex-1 flex-col bg-zinc-900 border border-zinc-800 rounded-lg p-4 gap-4 h-full`}>
			{!selected && (
				<div className="flex flex-1 items-center justify-center text-zinc-500 text-sm">
					Selecione ou crie uma mensagem
				</div>
			)}
			{selected && (
				<>

					{/* MOBILE BACK */}
					<button className="xl:hidden text-sm text-orange-500" onClick={() => setView("list")}>
						← Voltar
					</button>

					{/* HEADER */}
					<div className="flex justify-between gap-2">
						<input className="flex-1 text-white bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" value={selected.name} onChange={(e) => handleUpdateName(e.target.value, setMessages, selectedMessage)} />
						<button className="text-zinc-400 hover:text-red-500 transition" onClick={() => handleDelete(selected.timestamp, setMessages, setSelectedMessage, setView)}>
							<i className="bi bi-trash text-lg" />
						</button>
					</div>

					{/* TEXTAREA */}
					{selected.message.type === "text" && <FieldsText content={selected} setMessages={setMessages} selectedMessage={selectedMessage} />}

					{/* PREVIEW */}
					{/* <div className="bg-zinc-800 border border-zinc-700 rounded p-3 flex flex-col gap-3">
						<p className="text-xs text-zinc-400">Preview</p>
						<div className="max-h-60 overflow-y-auto pr-1">
							<div className="bg-green-600 text-white text-sm p-3 rounded-lg max-w-xs break-words">
								{selected.message.text || "Preview..."}
							</div>
						</div>
					</div> */}

				</>
			)}
		</div>
	);
}