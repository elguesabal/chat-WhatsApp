import { createPortal } from "react-dom";

/**
 * @author VAMPETA
 * @brief MONTA O ELEMENTO FILHO JUNTO COM O MODAL
 * @param {Object} children ELEMENTO FILHO A SER RENDERIZADO
 * @param {Function} onClose FUNCAO QUE FECHA O OVERLAY
*/
export default function ModalOverlay({ children, onClose }) {
	return (createPortal(
		<div className="fixed inset-0 z-51 flex flex-col items-center justify-center">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
			<div className="flex flex-col relative w-[90%] h-[90%] max-w-2xl bg-zinc-900 text-white rounded-2xl shadow-2xl overflow-hidden animate-toastIn">
				<button className="absolute top-4 right-4 text-white hover:text-orange-500 cursor-pointer" onClick={onClose}>
					<i className="bi bi-x-lg text-3xl" />
				</button>
				{children}
			</div>
		</div>,
		document.body
	));
}