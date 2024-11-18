import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
	try {
		let { imageUrl } = getQuery(event);

		console.log(imageUrl);

		const imagePath = path.join(
			process.cwd(),
			`public/images/quiz/${imageUrl}`
		);

		// Adjust the path as necessary
		const imageBuffer = fs.readFileSync(imagePath);

		// Set the appropriate content type for the image
		const contentType = "image/png"; // Change this based on your image type
		return send(event, imageBuffer, contentType);
	} catch (error) {
		console.error(error);
	}
});
