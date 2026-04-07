import { memo } from "react";

import { useGetSpreadsheet, selectSpreadsheet } from "./useGetSpreadsheet.js";

import Error from "../../screens/Error.jsx";
import Load from "../../screens/Load.jsx";

/**
 * @author VAMPETA
 * @brief PAGINA DE CONFIGURACOES DE PLANILHAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
const Body = memo(function Body({ socket }) {
	const { spreadsheets, setSpreadsheets, loading, error } = useGetSpreadsheet(socket);

	if (error) return (<Error />);
	if (loading) return (<Load />);
	return (
		<div className="flex flex-col p-5 overflow-y-auto animate-toastIn">
			<p className="my-5">Defina quais planilhas serão usadas como fonte de preços de produtos e serviços para a IA responder mensagens no WhatsApp. Somente as planilhas selecionadas serão consideradas na geração das respostas, garantindo informações atualizadas e consistentes. As alterações são aplicadas automaticamente.</p>

			<div className="flex flex-col bg-zinc-900 border border-zinc-800 rounded-lg p-5 gap-4 w-full h-80 md:h-100 overflow-y-auto">
				{spreadsheets?.map((spreadsheet, i) => {
					return (
						<button className={`flex justify-between items-center w-full px-3 py-1 cursor-pointer rounded ${(spreadsheet.selected) ? "bg-orange-500 text-black" : null} transition duration-1000`} key={i} onClick={() => selectSpreadsheet(socket, spreadsheets, setSpreadsheets, i)}>
							<p>{spreadsheet.page}</p>
							<i className={`bi bi-${(spreadsheet.selected) ? "check2" : "x"}  text-xl`} />
						</button>
					);
				})}
			</div>
		</div>
	);
});

export default Body;