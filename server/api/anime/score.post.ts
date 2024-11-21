import { serverSupabaseServiceRole } from "#supabase/server";

interface Body {
	nombre?: string;
	score?: number;
}

interface ScoreQuiz {
	nombre: string;
	score: number;
}

export default defineEventHandler(async (event) => {
	const body: Body = await readBody(event);
	const { nombre = 'jose2', score= 500 } = body;

	const client = serverSupabaseServiceRole(event);

	const newData = {
		  nombre: nombre, // Asegúrate de que 'nombre' sea del tipo correcto
		  score: score,   // Asegúrate de que 'score' sea del tipo correcto (número)
		};
		    // Realiza la inserción en la tabla deseada
				const { data, error } = await client.from('scoreQuiz').insert([newData],{count:'planned'}).select("*")

	if (error) {
		return { statusCode: 400, body: { error: error.message } }; // Manejo de errores
	}

	return { message:data }; // Respuesta exitosa
});