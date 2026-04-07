import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE BUSCA INFORMACOES DE CONFIGURACOES DA PLANILHA
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useGetSpreadsheet(socket) {
	const [spreadsheets, setSpreadsheets] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		socket.emit("spreadsheets:get_spreadsheets", {}, (res) => {
			if (!res || res.error) return (setError(true));
			setSpreadsheets(res);
			setLoading(false);
		});
	}, [socket]);
	return ({ spreadsheets, setSpreadsheets, loading, error });
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA QUAIS PLANILHAS ESTAO SENDO USADAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} spreadsheets VARIAVEL QUE CONTEM AS PLANILHAS DISPONIVEIS E QUAIS ESTAO EM USO
 * @param {Object} setSpreadsheets FUNCAO DE CONTROLE DA VARIAVEL spreadsheets
 * @param {Number} index POSICAO DO COMPONENTE QUE SERA ATUALIZADO
*/
export function selectSpreadsheet(socket, spreadsheets, setSpreadsheets, index) {
	const spreadsheet = spreadsheets[index];

	socket.emit("spreadsheets:update_used_spreadsheets", { [!spreadsheet.selected ? "add" : "remove"]: spreadsheet.page }, (res) => {
		if (res === 200) setSpreadsheets((prev) => prev.map((item, i) => ((i === index) ? { ...item, selected: !spreadsheet.selected } : item)));
	});
}