export default defineEventHandler(async (event) => {
	// Acceder a los parámetros de consulta (query parameters)
	let { responses } = getQuery(event);

	let responsesArray: string[] = [];

	if (typeof responses === "string") {
		// Si el string está en formato JSON, puedes usar JSON.parse()
		try {
			responsesArray = JSON.parse(responses);
		} catch (e) {
			// Manejo de error si el JSON no es válido
			console.error("Error al parsear JSON:", e);
		}
	}

	// Si el string es una lista separada por comas, puedes usar split
	if (typeof responses === "string" && !responses.startsWith("[")) {
		responsesArray = responses.split(",").map((item) => item.trim());
	}

	return {
		message: "Datos recibidos",
		data: responsesArray,
	};
});
