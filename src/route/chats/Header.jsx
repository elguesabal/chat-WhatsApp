import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

/**
 * @author VAMPETA
 * @brief PAGINA DE CONVERSAS
 * @param navigate FUNCAO DE NAVEGACAO DE ROTA
*/
function logout(navigate) {
	Cookies.remove("phone", { path: "/" });
	Cookies.remove("idPhone", { path: "/" });
	Cookies.remove("token", { path: "/" });
	navigate("/login");
}

/**
 * @author VAMPETA
 * @brief HEADER DA PAGINA DE CONVERSAS
*/
export default function Header() {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-between p-4 text-orange-500">
			<div className="text-3xl">Agora Digital</div>
			<div className="text-lg">Conversas</div>
			<i className="bi bi-box-arrow-right text-4xl cursor-pointer" onClick={() => logout(navigate)} />
		</div>
	);
}