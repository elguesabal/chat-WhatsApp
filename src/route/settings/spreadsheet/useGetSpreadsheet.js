import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE BUSCA INFORMACOES DE CONFIGURACOES DA PLANILHA
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
*/
export function useGetSpreadsheet(socket) {
	const [spreadsheets, setSpreadsheets] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		socket.emit("settings:spreadsheets:get_spreadsheets", {}, (res) => {
			setSpreadsheets(res);
			setLoading(false);
		});
	}, []);
	return ({ spreadsheets, setSpreadsheets, loading });
}

/**
 * @author VAMPETA
 * @brief FUNCAO QUE ATUALIZA QUAIS PLANILHAS ESTAO SENDO USADAS
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 * @param {Object} setSpreadsheets FUNCAO DE CONTROLE DA VARIAVEL spreadsheets
 * @param {Number} index POSICAO DO COMPONENTE QUE SERA ATUALIZADO
*/
export function selectSpreadsheet(socket, setSpreadsheets, index) {
	setSpreadsheets((prev) => (prev.map((item, i) => ((i === index) ? { ...item, selected: !item.selected } : item))));
}