import { useState, useEffect } from "react";

export function useLoadChat(socket) {
	const [chats, setChats] = useState(null);

	useEffect(() => {
		if (!socket) return;
		socket.emit("chats:load_chats", {}, (res) => {
			if (!res || res.error) return ;
			setChats(res);
		});
	}, [socket]);
	return ({ chats, setChats });
}