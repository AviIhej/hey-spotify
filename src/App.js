import React, { useEffect, useState } from 'react';
import './App.css';

const accessToken = 'BQDUzat2Slap8Qqk6MqBYD93wMeuccypsp-Nit--ZnCQ4TZ3F6lO06wujWkkQi_9VkJZwr6m2zSNg70f6QT4q21qrQ44JsH2YILn3kk3rkFo6a0ZYscXnG4za-boRNfuUIvCMNaezznTQw'

function App() {
  const [query, setQuery ] = useState('kanye');
  const [artists, setArtists] = useState([]);
  
  useEffect(() => {
    fetchArtists();
  },[])

  function fetchArtists(){

    let url=`https://api.spotify.com/v1/search?q=${query}&type=artist`

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setArtists(data.artists.items)
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    fetchArtists();
  }

  return (
    <div className="min-h-screen bg-white-400 px-10 flex justify-center items-center flex-col">

    <h1 className="text-5xl mb-10 joseph">Hey Spotify</h1>
    <h3 className="text-2xl mb-10 joseph">Search an Artist</h3>
      {/* Search box */}
      <form className="mb-10 flex" onSubmit={handleSubmit}>
        <input 
        className="p-2 mr-2 rounded shadow-lg w-full" 
        type='text' 
        value={query}
         onChange={e => setQuery(e.target.value)} 
         />
         <button className="bg-blue-700 text-blue-100 py-2 px-8 rounded shadow-lg joseph">Search</button>
      </form>

      {/* Show the search results */}
      <div className="flex flex-wrap">
        {artists.map((artist, index) => {
          const img = artist.images[0];
          const imgUrl = img ? img.url : "https://placekitten.com/g/200/200"
            return(
            <div className='w-1/3 mb-10 text-center p-3' key={index}>
              <img 
              className="rounded mb-3 mx-auto hover" 
              src={imgUrl} alt={artist.name} 
              width='200' 
              />
              <h3 className="joseph">{artist.name}</h3>
            </div>
          )}
        )}     
      </div> 
    </div>
  );
}

export default App;
