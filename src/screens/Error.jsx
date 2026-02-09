/**
 * @author VAMPETA
 * @brief COMPOENENTE DE ERRO
*/
export default function Error() {
	return (
		<div className="flex-1 flex flex-col items-center justify-center ">
			<i className="bi bi-tux text-red-500 text-5xl" />
			<p className="text-white">Infelizmente aconteceu um erro</p>
		</div>
	);
}
