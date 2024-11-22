import useNumAleario from "~/composables/useNumAleario";
import { ListAnimeGeneral,ListAnimeGeneral_hardcore } from "~/server/data/anime/questions";

export default defineEventHandler(async (event) => {
	// Acceder a los parámetros de consulta (query parameters)
	let { responses,mode='easy' } = getQuery(event);

	let quizList: typeof ListAnimeGeneral



	switch (mode) {
		case "easy":
			quizList = ListAnimeGeneral
			break;
		case "hardcore":
			quizList = ListAnimeGeneral_hardcore
			break
		default:
			quizList = ListAnimeGeneral
			break;
	}

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

	const numeroTotalQuiz = quizList.quiz.length - 1;
	const nuevoQuiz = useNumAleario(0, numeroTotalQuiz, responsesArray);

	return {
		totalQuiz: numeroTotalQuiz,
		numeroQuiz: nuevoQuiz,
		dificultad:mode,
		quiz: quizList.quiz[nuevoQuiz],
	};
});
