import { pipeline } from "@xenova/transformers";
import cosineSimilarity from "cosine-similarity";

const model = await pipeline("feature-extraction", "Xenova/paraphrase-multilingual-MiniLM-L12-v2");

async function getEmbedding(text) {
    const output = await model(text, { pooling: "mean", normalize: true });
    return output.data;
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

// const products = [
//     { name: "SSD Kingston A400 480GB", description: "SSD Kingston A400 480GB, SATA III, 2.5 дюйма, 500 MB/s" },
//     { name: "SSD Samsung 870 EVO 500GB", description: "SSD Samsung 870 EVO 500GB, SATA III, 2.5 дюйма, 560 MB/s" },
//     { name: "SSD Crucial MX500 500GB", description: "SSD Crucial MX500 500GB, SATA III, 2.5 дюйма, 560 MB/s" }
// ];

// const query = "480GB ";

// await findMostSimilarProduct(query, products);
export default findMostSimilarProduct;