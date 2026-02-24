const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// Cloud Function as Proxy for TMDB
// This bypasses geo-restrictions in India and hides the API key
exports.tmdbProxy = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        try {
            const { endpoint, params } = req.body;

            if (!endpoint) {
                return res.status(400).json({ error: "Endpoint is required" });
            }

            const TMDB_API_KEY = functions.config().tmdb.key; // Set this via firebase functions:config:set tmdb.key="YOUR_KEY"

            const response = await axios.get(`https://api.themoviedb.org/3${endpoint}`, {
                params: {
                    api_key: TMDB_API_KEY,
                    ...params,
                },
            });

            return res.status(200).json(response.data);
        } catch (error) {
            console.error("Proxy Error:", error.message);
            return res.status(error.response?.status || 500).json({
                error: error.message,
                details: error.response?.data || "Internal Server Error",
            });
        }
    });
});
