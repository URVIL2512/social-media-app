const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log('Generating image with prompt:', prompt);
    
    // Use Pollinations AI (free, no API token needed)
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Date.now()}`;
    
    console.log('Generated image URL:', imageUrl);
    
    res.json({ 
      imageBase64: imageUrl, // Frontend expects this field
      result: imageUrl,
      prompt: prompt,
      message: `AI-generated image for: ${prompt}`
    });
    
  } catch (err) {
    console.error('Image generation error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add /generate route for backward compatibility
router.post('/generate', async (req, res) => {
  // Forward to the main route
  return router.handle({ ...req, url: '/' }, res);
});

module.exports = router;
