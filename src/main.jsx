// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/index.css";
import Chat from "./route/chat/Chat.jsx";

createRoot(document.getElementById("root")).render(
	// <StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/chat/:idPhone/:phone" element={<Chat />} />
				<Route path="*" element={<>Pagina nao encontrada</>} />
			</Routes>
		</BrowserRouter>
	// </StrictMode>
);