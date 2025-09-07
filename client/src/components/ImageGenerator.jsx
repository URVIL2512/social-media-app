import React, { useState } from 'react';
import { generateImage } from '../api/imageGen';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);

  async function go() {
    if (!prompt.trim()) {
      alert('Please enter a description for the image');
      return;
    }
    
    setLoading(true);
    try {
      const res = await generateImage(prompt);
      // Use the image URL directly since Pollinations AI returns a URL
      const src = res.imageBase64 || res.result;
      setImg(src);
    } catch (err) {
      console.error('Image generation error:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Image generation failed. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          placeholder="Describe the image you want to generate..." 
          value={prompt} 
          onChange={e => setPrompt(e.target.value)} 
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button 
          onClick={go}
          disabled={loading}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      
      {img && (
        <div className="mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <img 
              src={img} 
              alt="Generated" 
              className="max-w-full h-auto rounded-lg mx-auto"
            />
            <div className="mt-4 text-center">
              <a 
                download="generated.png" 
                href={img}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
