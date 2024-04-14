const express = require('express');

const router = express.Router();

router.post('/summary', async (req, res) => {
    try {
        const { article } = req.body;

        // Dynamically import the pipeline function from '@xenova/transformers'
        const { pipeline } = await import('@xenova/transformers');

        // Load the pipeline for summarization
        const pipe = await pipeline("summarization");

        // Generate the summarization result
        const result = await pipe(article);

        console.log("Summarization result:", result);

        res.status(200).json({ summarizedArticle: result });
    } catch (error) {
        console.error("An error occurred during summarization:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
