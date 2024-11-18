import useNumAleario from "~/composables/useNumAleario";
import { ListAnimeGeneral } from "~/server/data/anime/questions";

export default defineEventHandler(async (event) => {
	// Acceder a los parámetros de consulta (query parameters)
	let { responses } = getQuery(event);

	let responsesArray: number[] = [];

	if (typeof responses === "string") {
		// Si el string está en formato JSON, puedes usar JSON.parse()
		try {
			responsesArray = JSON.parse(responses);
		} catch (e) {
			// Manejo de error si el JSON no es válido
			console.error("Error al parsear JSON:", e);
		}
	}

	const numeroTotalQuiz = ListAnimeGeneral.quiz.length - 1;
	const nuevoQuiz = useNumAleario(0, numeroTotalQuiz, responsesArray);

	return {
		totalQuiz: numeroTotalQuiz,
		numeroQuiz: nuevoQuiz,
		quiz: ListAnimeGeneral.quiz[nuevoQuiz],
	};
});
