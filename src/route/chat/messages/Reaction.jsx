/**
 * @author VAMPETA
 * @brief RENDERIZA A REACAO DA MENSAGEM SE OUVER
 * @param {String} context MENSAGEM RESPONDIDA
*/
export default function Reaction({ reaction }) {
	return (
		<div className="absolute -bottom-3 right-5 text-sm flex items-center animate-bounce">
			{reaction}
		</div>
	);
}