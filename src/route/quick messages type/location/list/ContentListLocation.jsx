/**
 * @author VAMPETA
 * @brief COMPONENTE RESPONSAVEL PELO CONTEUDO DA LISTA DE MENSAGENS DO TIPO LOCATION
 * @param {Object} content INFORMACOES DA MENSAGEM
*/
export default function ContentListLocation({ content }) {
	return (
		<>
			<p className="text-sm text-white font-medium">{content.name}</p>
			<p className="text-xs text-zinc-400 line-clamp-1">{content.message.location.name || "Sem conteúdo"}</p>
		</>
	);
}