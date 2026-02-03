import { io } from "socket.io-client";

export default io("http://localhost:3000", {
	autoConnect: false,
	auth: {
		idPhone: "871876402681006",
		phone: "5521971178764"
	}
});