import { useState, useEffect } from 'react';
import './App.css';

interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: string[];
}

function App() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((data) => setMemes(data.data.memes))
      .catch((error) => console.error('Error:', error));
  }, []);

  const getNextMeme = () => {
    if (currentMemeIndex < memes.length - 1) {
      setCurrentMemeIndex(currentMemeIndex + 1);
    } else {
      alert('No more memes available.');
    }
  };

  return (
    <div className="p-40 text-center flex flex-col items-center justify-center bg-blue-400 h-screen">
      <p className='font-bold text-4xl mb-8'>MEME GENERATOR</p>
      {memes.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">{memes[currentMemeIndex].name}</h2>
          <img src={memes[currentMemeIndex].url} alt="Meme" className="w-[200px] h-[200px] object-cover mb-4" />
          <button onClick={getNextMeme} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Next Meme
          </button>
        </>
      )}
    </div>
  );
}

export default App;
