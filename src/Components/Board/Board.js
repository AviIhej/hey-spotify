import React from 'react';
import { useAlert } from 'react-alert';
import './Board.css';

function Board (props){
    const alert = useAlert()

    const drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.display = 'block';
        
        e.target.appendChild(card)
        alert.show('Nice! Artist added to playlist')

    }

    const dragOver = e => {
        e.preventDefault();
        
    }


    return(
        <div 
            id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}    
        >
        {props.children}
        </div>
    )
}

export default Board