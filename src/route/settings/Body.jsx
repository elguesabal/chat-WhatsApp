import { memo } from "react";

import Spreadsheet from "./spreadsheet/Spreadsheet.jsx";

/**
 * @author VAMPETA
 * @brief PAGINA DE CONFIGURACOES
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
const Body = memo(function Body({ socket }) {
	return (
		<div className="p-6 flex flex-col gap-6 max-w-4xl overflow-y-auto animate-toastIn">
			<Spreadsheet socket={socket} />
		</div>
	);
});

export default Body;