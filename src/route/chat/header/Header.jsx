/**
 * @author VAMPETA
 * @brief HEADER DO CHAT
 * @param {String} phone NUMERO DE CELULAR QUE ESTA CONVERSANDO COM O BOT
*/
export default function Header({ phone }) {
	return (
		<div className="flex items-center justify-center h-14 bg-gray-900 shrink-0">
			<span className="text-white">{phone}</span>
			<img src="/logo.png" className="w-8 h-8 object-contain" />
		</div>
	);
}