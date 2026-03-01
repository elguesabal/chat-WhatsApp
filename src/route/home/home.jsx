import { Link } from "react-router-dom";

/**
 * @author VAMPETA
 * @brief PAGINA HOME
*/
export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
			Home
			<Link className="mt-8 px-6 py-2 bg-orange-500 text-black font-medium rounded-lg hover:bg-orange-400 transition" to="/login">Login</Link>
		</div>
	);
}