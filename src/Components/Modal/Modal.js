import React from 'react';
import './Modal.css'

function Modal(props){
    return(
        <div className="modal">
            <section className="modal_content">
                <h1 className="a_title_h1">{props.modalContent[0]}</h1>
                <p style={{fontStyle: 'italic', fontSize: '22px'}}>Artist</p>
                <p>Popularity: {props.modalContent[3]}</p>
                <h1 style={{fontSize: '30px'}}>{props.modalContent[2]}+ followers </h1>
                <button className="listen_spotify hover2"><a href={props.modalContent[4]} target="_blank">Listen on Spotify!</a></button>
                <img className="hover2" src={props.modalContent[1]} width='200' height='200' />
                <iframe src="https://open.spotify.com/embed/track/4Dg5moVCTqxAb7Wr8Dq2T5" width="300" height="80" frameborder="0" data-mce-fragment="1"></iframe>
            </section>
            <section className="modal_actions">
                {<button className="btn" onClick={props.onCancel}>Cancel</button>}
            </section>
        </div>
    )
}

export default Modal