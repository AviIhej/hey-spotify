import React, { useEffect, useState } from 'react';
import Board from './Components/Board/Board';
import Card from './Components/Card/Card';
import Modal from './Components/Modal/Modal';
import Backdrop from './Components/Backdrop/Backdrop';
import spotlogo from "../src/spotlogo.png";
import { useAlert } from 'react-alert';

import './App.css';

const accessToken = 'BQBnbRNigJGsDEX1fJybZ_0_u0WvWjohjsLfyor6IrkBvd0E0EoUdlq7SMzd8cNoXWxzalJCcldiDu1fvVQrA5rLexpeD_B6u6BxWOEYb897WrB-pCRF4emxx_Tbe-B0IP9r_yVn49trlA'

const DataLoader = () => {
  return (
<div className="lds-facebook"><div></div><div></div><div></div></div>
  ) 
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery ] = useState('kanye');
  const [artists, setArtists] = useState([]);
  const [list, setList] = useState([query]);
  const [modal, setModal] = useState({
    modalOpen: false, 
    modalContent: []
  })
  const alert = useAlert()
  
  useEffect(() => {
    fetchArtists();
  },[])

  function fetchArtists(){
    setIsLoading(true)
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
      setIsLoading(false)
      setArtists(data.artists.items)
      alert.show(`"${query}" added to recent searches`)
      console.log(artists)
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    fetchArtists();
    setList([...list, query]);
    e.target.reset()
  }

  function removeSearch(item){
    setList(list.filter(i => i !== item))
  }

  function cancelHandler(){
    setModal({modalOpen: false});
  }

  return (
    <div> 
      <div className="nav">
          <img src={spotlogo} alt="logo" style={{padding: "10px"}}/>
          <form className="mb-10 flex form" onSubmit={handleSubmit}>
                <input 
                className="p-10 mr-2 rounded shadow-lg input" 
                type='text' 
                placeholder="Search your favorite"
                value={query}
                onChange={e => setQuery(e.target.value)} 
                />
                <button className="bg-black-700 text-blue-100 px-8 py-3 rounded shadow-lg joseph magGlass"><i class="fa fa-search" style={{fontSize: "5vw", color: "white"}}></i></button>
          </form>
      </div>
      <div className="min-h-screen bg-#000-400 flex flex-row">
        <div className="min-h-screen bg-white-400 px-10 flex justify-center items-center flex-col" style={{marginTop: "150px"}}>
        <h3 className="text-2xl mb-10 joseph">Love Music? Search Your Favorite Artist <br/> and Drag to your playlist </h3>
        
          { list.length > 1 ?  <div class="historyBox">
              <h1 className="searchH1">Search History</h1>
                <ul className="searchHistory">
                {
                  list.map((item, key) =>
                  <li className="searchItem" key={key}>{item}<a onClick={() => removeSearch(item)}>X</a></li>
                  )
                }
                </ul>
            </div> : ""}

          {/* Show the search results */}
          <div className="flex bg-black-400 flex-wrap">
            <React.Fragment>
              {modal.modalOpen && <Backdrop onCancel={cancelHandler} />}
              {modal.modalOpen && <Modal className="Add Event" onCancel={cancelHandler} modalContent={modal.modalContent}></Modal>}
            </React.Fragment>
            {artists.map((artist, index) => {
              const img = artist.images[0];
              const imgUrl = img ? img.url : "https://picsum.photos/200"
              const followers = artist.followers.total;
              const popularity = artist.popularity;
              const song_url = artist.external_urls.spotify;
              if (isLoading){
                return <div style={{width:  '200px', height: '200px'}}><DataLoader /></div>
              }else {
                return(
                <Board id="board-1" className="board2">
                  <Card id={index} className="w-1/3 mb-10 text-center p-3 card hover" draggable="true" >
                    <img
                    draggable="false" 
                    className="rounded mb-3 mx-auto" 
                    src={imgUrl} alt={artist.name} 
                    width='200'
                    onClick={() => setModal({modalOpen: true, modalContent: [artist.name, imgUrl, followers, popularity, song_url]})} 
                    />
                    <h3 className="joseph">{artist.name}</h3>
                  </Card>
                </Board>
              )}
                }
            )}     
          </div> 
        </div>

        <Board id="board-2" className="board">
          <div className="playlist-h1">
            <h1>MY PLAYLIST</h1>
            <div className="button--pulsing"></div>
          </div>
        </Board>

      </div> {/* End Main Wrapper */}
    </div>
  );
}

export default App;
