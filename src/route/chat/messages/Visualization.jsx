export default function Visualization({ status }) {
	// FALTON O "sending"
	if (status === "sent") return (<i className="bi bi-check ml-2 leading-none text-xl text-gray-700"/>);
	if (status === "delivered") return (<i className="bi bi-check-all ml-2 leading-none text-xl text-gray-700"/>);
	if (status === "read") return (<i className="bi bi-check-all ml-2 leading-none text-xl text-blue-700"/>);
	if (status === "failed") return (<i className="bi bi-exclamation-triangle-fill ml-2 leading-none text-xl text-yellow-500"/>);
	return (<i className="bi bi-x-circle-fill ml-2 leading-none text-xl text-red-500"/>);
}