import { handleUpdateFields } from "../../functions.js";

/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL PELO CONTEUDO DA LISTA DE MENSAGENS DO TIPO TEXT
 * @param {Object} content INFORMACOES DA MENSAGEM
 * @param {Function} setMessages ATUALIZA A LISTA DE MENSAGENS NO ESTADO
 * @param {Number} selectedMessage ID DA MENSAGEM ATUALMENTE SELECIONADA
*/
export default function FieldsText({ content, setMessages, selectedMessage }) {
	return (
		<>
			<textarea className="text-white bg-zinc-800 border border-zinc-700 rounded p-2 text-sm min-h-[140px] outline-none" placeholder="Digite a mensagem..." value={content.message.text.body} onChange={(e) => handleUpdateFields("body", e.target.value, setMessages, selectedMessage)} />
		</>
	);
}