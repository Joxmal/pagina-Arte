import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = serverSupabaseServiceRole(event);

	let { data: scoreQuiz, error } = await client.from("scoreQuiz").select("*");

	const { data } = await client.from("scoreQuiz").select("*");

	// Acceder a los parámetros de consulta (query parameters)
	// let { responses } = getQuery(event);

	return { sensitiveData: scoreQuiz };
});
