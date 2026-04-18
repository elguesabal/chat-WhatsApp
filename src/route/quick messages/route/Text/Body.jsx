import { useState } from "react";

import { useGetQuickText } from "./useGetQuickText.js";

import Load from "../../../../screens/Load.jsx";
import Error from "../../../../screens/Error.jsx";
import List from "../List.jsx";
import Editor from "../Editor.jsx";

/**
 * @author VAMPETA
 * @brief COMPONENTE COM CONFIGURACOES DE MENSAGENS RAPIDAS DE TEXTO
 * @param {Hook} socket SOCKET DE CONEXAO COM O BACK END
*/
export default function Body({ socket }) {
	const { messages, setMessages, loading, error } = useGetQuickText(socket, "text");
	const [selectedId, setSelectedId] = useState(null);
	const [view, setView] = useState("list");
	const [search, setSearch] = useState("");
	const selected = messages.find((m) => (m.id === selectedId));
	const filteredMessages = messages.filter((m) => (m.name.toLowerCase().includes(search.toLowerCase()) || m.content.toLowerCase().includes(search.toLowerCase())));

	return (
		<div className="p-4 sm:p-6 flex flex-col xl:flex-row gap-4 xl:gap-6 h-full min-h-0 overflow-hidden">
<List socket={socket} messages={messages} setMessages={setMessages} selectedId={selectedId} setSelectedId={setSelectedId} view={view} setView={setView} search={search} setSearch={setSearch} selected={selected} filteredMessages={filteredMessages} />
<Editor socket={socket} messages={messages} setMessages={setMessages} selectedId={selectedId} setSelectedId={setSelectedId} view={view} setView={setView} search={search} setSearch={setSearch} selected={selected} filteredMessages={filteredMessages} />
		</div>
	);
}