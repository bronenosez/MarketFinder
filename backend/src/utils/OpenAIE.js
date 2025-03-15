import OpenAI from "openai";

const openai = new OpenAI({apiKey: "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"});

async function getEmbedding(text) {
    const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    });

    return embedding;
}

export default getEmbedding;