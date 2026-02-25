import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import Cookies from "js-cookie";
import axios from "axios";

import server from "../../server.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL POR LOGAR
 * @param phone LOGIN DO USUARIO
 * @param password SENHA DO USUARIO
 * @param navigate FUNCAO DE CONTROLE DE ROTA
 * @param setError FUNCAO DE CONTROLE DE ESTADO DE ERRO
*/
async function login(phone, password, navigate, setError) {
	try {
		if (phone.length !== 13 || !password) return ;
		const res = await axios({
			method: "POST",
			url: `${server}/login`,
			data: {
				phone: phone,
				password: password
			}
		});
		if (res.status === 200) {
			const { idPhone, token } = res.data;
			if (!idPhone || !token) return ;
			Cookies.set("phone", phone, {
				expires: 7,
				path: "/",
				sameSite: "Strict"
			});
			// Cookies.set("password", password, {
			// 	expires: 7,
			// 	path: "/",
			// 	sameSite: "Strict"
			// });
			Cookies.set("idPhone", idPhone, {
				expires: 7,
				path: "/",
				sameSite: "Strict"
			});
			Cookies.set("token", token, {
				expires: 7,
				path: "/",
				sameSite: "Strict"
			});
			navigate(`/chat`);
		}
	} catch (error) {
		setError("Usuário ou senha incorretos");
	}
}

/**
 * @author VAMPETA
 * @brief PAGINA DE LOGIN
*/
export default function Login() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [error, setError] = useState("");

	useEffect(() => {
		if (!error) return ;
		const timer = setTimeout(() => setError(""), 3000);
		return (() => clearTimeout(timer));
	}, [error]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
			<div className="w-full max-w-sm bg-zinc-900 p-6 rounded-2xl shadow-lg">
				<h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-zinc-400">Telefone</label>
						<IMaskInput className="px-4 py-2 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500" mask="(00) 00000-0000" type="tel" value={phone} onAccept={(value, mask) => setPhone(mask.unmaskedValue)} placeholder="(99) 99999-9999" />
					</div>
					<div className="flex flex-col">
						<label className="mb-1 text-sm text-zinc-400">Senha</label>
						<input className="px-4 py-2 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
					</div>
					{error && <p className="text-center text-red-500 transition-opacity duration-300">{error}</p>}
					<button className={`mt-4 py-2 bg-orange-500 text-black font-medium rounded-lg hover:bg-orange-400 transition ${(phone.length !== 11 || !password) ? "cursor-not-allowed": "cursor-pointer"}`} onClick={() => login("55" + phone, password, navigate, setError)} disabled={phone.length !== 11 || !password}>Entrar</button>
				</div>
			</div>
		</div>
	);
}