const { GoogleGenAI } = require("@google/genai");

/**
 * createGeminiClient(config, logger) -> { generateText }
 * config shape: { apiKey, model }
 */
function createGeminiClient(config, logger = console) {
  const { apiKey, model = "gemini-3.5-flash" } = config;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is required");
  }

  const ai = new GoogleGenAI({ apiKey });
  logger.info("Gemini client initialized");

  async function generateText(prompt, options = {}) {
    try {
      const response = await ai.models.generateContent({
        model: options.model || model,
        contents: prompt,
      });

      const text = response?.text;
      if (!text) throw new Error("Gemini returned an empty response");

      return text;
    } catch (err) {
      logger.error(`Gemini call failed: ${err.message}`);
      throw err;
    }
  }

  return { generateText };
}

module.exports = createGeminiClient;
