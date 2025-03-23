import { pipeline } from "@xenova/transformers";
import cosineSimilarity from "cosine-similarity";

const model = await pipeline(
  "feature-extraction",
  "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
);

const embeddingCache = new Map();

async function getEmbedding(text) {
  if (embeddingCache.has(text)) {
    return embeddingCache.get(text);
  }

  const output = await model(text, { pooling: "mean", normalize: true });
  const embedding = output.data;

  embeddingCache.set(text, embedding);
  return embedding;
}

async function findMostSimilarProduct(query, products) {
  const queryEmbedding = await getEmbedding(query);

  let bestMatch = null;
  let bestScore = -1;
  let bestLink = null;

  for (const product of products) {
    const productEmbedding = await getEmbedding(product.description);
    const similarity = cosineSimilarity(queryEmbedding, productEmbedding);

    console.log(`Сходство с "${product.name}": ${similarity.toFixed(4)}`);

    if (similarity > bestScore) {
      bestScore = similarity;
      bestMatch = product.name;
      bestLink = product.link;
    }
  }

  return { bestMatch, bestScore, bestLink };
}

export default findMostSimilarProduct;
