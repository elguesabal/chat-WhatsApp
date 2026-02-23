import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import Cookies from "js-cookie";
import axios from "axios";

import server from "../../server.js";

/**
 * @author VAMPETA
 * @brief FUNCAO RESPONSAVEL POR LOGAR
 * @param phone LOGIN DO USUARIO
 * @param password SENHA DO USUARIO
*/
async function login(phone, password) {
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
console.log(res.data)
		Cookies.set("phone", phone, {
			expires: 7,
			path: "/",
			sameSite: "Strict"
		});
		Cookies.set("password", password, {
			expires: 7,
			path: "/",
			sameSite: "Strict"
		});
	} catch (error) {
console.log(error.message)
	}
}

/**
 * @author VAMPETA
 * @brief PAGINA DE LOGIN
*/
export default function Login() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

// useEffect(() => {
// 	const phone = Cookies.get("phone");
// 	const password = Cookies.get("password");

// 	console.log((phone) ? phone : "Cookie 'phone' nao encontrado");
// 	console.log((password) ? password : "Cookie 'password' nao encontrado");
// }, []);

	return (
		<div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
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
					<button className={`mt-4 py-2 bg-orange-500 text-black font-medium rounded-lg hover:bg-orange-400 transition ${(phone.length !== 11 || !password) ? "cursor-not-allowed": "cursor-pointer"}`} onClick={() => login("55" + phone, password)} disabled={phone.length !== 11 || !password}>Entrar</button>
				</div>
			</div>
		</div>
	);
}