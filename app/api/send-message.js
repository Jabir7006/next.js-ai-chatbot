import axios from "axios";

export default async function handler(req, res) {
  if (!req.body.message) {
    return res.status(400).json({ message: "Missing message in request body" });
  }

  try {
    const response = await axios.post(
      "https://language.googleapis.com/v1/projects/AIzaSyBMpzsWhgXDO-DBMbaDhyvXhnkGXU0frj0/locations/global/agents:converse",
      {
        queryParams: {
          session_id: req.body.sessionId || undefined, // Optional for maintaining session context
        },
        requestBody: {
          queryInput: {
            text: req.body.message,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );

    res.status(200).json({ text: response.data.generateResponse.text });
  } catch (error) {
    console.error("Error sending message to Gemini AI:", error);
    res.status(500).json({ message: "Error processing request" });
  }
}
