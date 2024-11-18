import { ListAnimeGeneral } from "~/server/data/anime/questions";

interface Body {
	quizNumber: number;
	quizResponse: number;
}

export default defineEventHandler(async (event) => {
	// Lee el cuerpo de la solicitud
	const body: Body = await readBody(event);
	const { quizNumber, quizResponse } = body;

	const quiz = ListAnimeGeneral.quiz[quizNumber];

	const respuestaSeleccionada = quiz.options[quizResponse];
	const respuestaCorrecta = quiz.answer;

	const correcto = respuestaSeleccionada === respuestaCorrecta;

	// Devuelve el valor recibido
	return {
		quiz,
		correcto,
	};
});
