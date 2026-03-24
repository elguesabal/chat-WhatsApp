import { useState, useEffect } from "react";

/**
 * @author VAMPETA
 * @brief HOOK QUE CONTROLA O LOAD DO DASHBOARD
 * @param {Object} socket SOCKET DE CONEXAO COM O BACK END
 */
export function useGetDashboard(socket) {
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!socket) return ;
		setLoading(true);
		socket.emit("dashboard:info", {}, (res) => {
			if (!res) return ;
			setInfo(res);
			setLoading(false);
		});
	}, [socket]);
	return ({ info, loading });
}