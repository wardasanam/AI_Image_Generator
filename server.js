require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch').default;

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Stable Diffusion Endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ inputs: req.body.prompt })
      }
    );

    if (response.status === 503) {
      // Model loading case
      const retryAfter = response.headers.get('Retry-After') || 10;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return generateImages(req, res); // Retry
    }

    if (!response.ok) throw new Error(`HF API: ${response.statusText}`);

    const imageBuffer = await response.buffer();
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: "Generation failed",
      solution: "Try a simpler prompt or wait 1 minute"
    });
  }
});

app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));