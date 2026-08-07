const axios = require("axios");

const getHealthAdvice = async (req, res) => {
  try {
    const { heartRate, spo2, temperature } = req.body;

    const prompt = `
You are an AI Health Assistant.

Analyze the following health data:

Heart Rate: ${heartRate} BPM
SpO₂: ${spo2}%
Temperature: ${temperature} °C

Respond in this format:

Health Status:
Possible Risk:
Advice:

Keep the answer simple and under 100 words.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      advice: response.data.choices[0].message.content,
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      message: "AI Error",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  getHealthAdvice,
};