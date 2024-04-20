import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from './default_image.svg';

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/');
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (inputRef.current.value === '') {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
        }),
      });

      const data = await response.json();
      const imageUrl = data.imageUrl;

      setImage_url(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">Ai image <span>GENERATOR</span></div>
      <div className="img-loading">
        <div className="image"><img src={image_url === '/' ? default_image : image_url} alt="" /></div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Enter Text' />
        {/* Fix: Call generateImage instead of ImageGenerator */}
        <div onClick={generateImage} className='generate-btn'>Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;

