import { handleUpdateFields } from "../../functions.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL PELO CONTEUDO DA LISTA DE MENSAGENS DO TIPO LOCATION
 * @param {Object} content INFORMACOES DA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Number} selectedMessage ID DA MENSAGEM ATUALMENTE SELECIONADA
*/
export default function FieldsLocation({ content, setMessages, selectedMessage }) {
	return (
		<>
			<input className="flex-1 text-white bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" value={content.message.location.name} placeholder="Digite o nome do endereço..." onChange={(e) => handleUpdateFields("name", e.target.value, setMessages, selectedMessage)} />
			<textarea className="text-white bg-zinc-800 border border-zinc-700 rounded p-2 text-sm min-h-[140px] outline-none" value={content.message.location.address} placeholder="Digite o endereço..." onChange={(e) => handleUpdateFields("address", e.target.value, setMessages, selectedMessage)} />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
				<input className="flex-1 text-white bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" value={content.message.location.latitude} placeholder="Digite a latidute..." onChange={(e) => handleUpdateFields("latitude", e.target.value, setMessages, selectedMessage)} />
				<input className="flex-1 text-white bg-zinc-800 border border-zinc-700 rounded p-2 text-sm outline-none" value={content.message.location.longitude} placeholder="Digite a longitude..." onChange={(e) => handleUpdateFields("longitude", e.target.value, setMessages, selectedMessage)} />
			</div>
		</>
	);
}