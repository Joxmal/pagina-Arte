import { ListAnimeGeneral,ListAnimeGeneral_hardcore } from "~/server/data/anime/questions";

interface Body {
	quizNumber: number;
	quizResponse: string;
	mode:string
}

export default defineEventHandler(async (event) => {
	// Lee el cuerpo de la solicitud
	const body: Body = await readBody(event);
	const { quizNumber, quizResponse,mode='easy' } = body;

	console.log(quizResponse)


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



	const quiz = quizList.quiz[quizNumber];

	const respuestaSeleccionada = quizResponse;
	const respuestaCorrecta = quiz.answer;

	const correcto = respuestaSeleccionada === respuestaCorrecta;

	// Devuelve el valor recibido
	return {
		quiz,
		correcto,
	};
});
