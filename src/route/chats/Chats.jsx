import { Link } from "react-router-dom";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL POR LOGAR
 * @param phone LOGIN DO USUARIO
 * @param password SENHA DO USUARIO
*/
export default function Chats() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
			<p>Chats</p>
            <Link to="/chat/871876402681006/5521971178764" className="mt-8 px-6 py-2 bg-orange-500 text-black font-medium rounded-lg hover:bg-orange-400 transition">(21) 97117-8764</Link>
		</div>
	);
}