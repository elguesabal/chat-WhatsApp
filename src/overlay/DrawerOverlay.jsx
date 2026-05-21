import { createPortal } from "react-dom";

/**
 * @author VAMPETA
 * @brief MONTA O ELEMENTO FILHO JUNTO COM O DRAWER
 * @param {Object} children ELEMENTO FILHO A SER RENDERIZADO
 * @param {Function} onClose FUNCAO QUE FECHA O OVERLAY
*/
export default function DrawerOverlay({ children, onClose }) {
	return (createPortal(
		<div className="flex fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/60" onClick={onClose} />
			<div className="ml-auto w-full md:w-[400px] h-full bg-zinc-900 text-white border-l border-zinc-800 p-6 z-1 animate-slideInRight">
				<button className="mb-4 cursor-pointer" onClick={onClose}>
					<i className="bi bi-x text-4xl" />
				</button>
				{children}
			</div>
		</div>,
		document.body
	));
}