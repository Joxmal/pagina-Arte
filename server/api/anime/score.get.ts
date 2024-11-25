import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {

	enum Mode {
		easy = 'easy',
		hardcore = 'hardcore'
	}

	let { mode= Mode.easy }:{mode:Mode} = getQuery(event);

	const client = serverSupabaseServiceRole(event);

	/* 	let { data: scoreQuiz, error } = await client.from("scoreQuiz").select().eq('dificultad',mode).order('score',{
		ascending:false
	}) */

	let { data: scoreQuiz, error } = await client.from(`score_${mode}_view`).select("*")

	return { sensitiveData: scoreQuiz };
});
