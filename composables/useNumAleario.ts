export default function obtenerNumeroAleatorio(
	min: number,
	max: number,
	excluidos: number[] = []
): number {
	let numeroAleatorio: number;

	do {
		numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
	} while (excluidos.includes(numeroAleatorio));

	return numeroAleatorio;
}
