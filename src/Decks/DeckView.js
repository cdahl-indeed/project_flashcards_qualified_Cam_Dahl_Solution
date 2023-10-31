import {deleteCard, deleteDeck, readDeck} from "../utils/api";
import {Link, useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";



function DeckView() {
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const {deckId} = useParams();
    const {url} = useRouteMatch();

    //icons
    const trashIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash-fill"
             viewBox="0 0 16 16">
            <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
    );
    const homeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
             className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path
                d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
        </svg>
    );
    const plusIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus"
             viewBox="0 0 16 16">
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
    );
    const bookIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-book"
             viewBox="0 0 16 16">
            <path
                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg>
    );
    const pencilIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-fill"
             viewBox="0 0 16 16">
            <path
                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
    );

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li className="breadcrumb-item"><Link to="/">{homeIcon} Home</Link></li>
                <li className="breadcrumb-item active" ><span aria-current="page">{deck.name}</span></li>
            </ul>
        </nav>
    );

    useEffect(() => {
        const signal = new AbortController().signal;
        async function loadDecksFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                //Set the decks in the use State
                setDeck(deckCall);
                setCards(deckCall.cards);
            });
        }
        loadDecksFromAPI().then(() => console.log('loaded Decks From API'));
    }, [deckId]);


    let displayDeck;
    if (deck && deck.name) {
         displayDeck = (
             <div className="container">
             <DeckNav></DeckNav>
             <div className="card deckDisplay">
                 <div className="card-body">
                     <header>
                        <h3 className='deckTitle'>{deck.name}</h3>
                     </header>
                    <p className='deckDescription'>{deck.description}</p>

                     <div className="form-group">
                         <button className='deckEdit btn-secondary btn-lg mr-2'
                                 type="button"
                                 onClick={() => {
                                     window.location.href=`${url}/edit`;
                                 }
                                 }>
                             {pencilIcon} Edit
                         </button>

                        <button className='deckStudy btn-primary btn-lg mr-2'
                                type="button"
                                onClick={() => {
                                    window.location.href=`${url}/study`;
                                }
                                }>
                            {bookIcon} Study
                        </button>

                        <button className='deckAddCards btn-primary btn-lg mr-2'
                                type="button"
                                onClick={() => {
                                    window.location.href=`${url}/cards/new`;
                                }
                                }>
                            {plusIcon} Add Cards
                        </button>

                        <button
                            name="delete"
                            className="deleteButton btn-danger btn-lg float-right"
                            onClick={() => {
                                const result = window.confirm("Delete this deck? \n \n You will not be able to recover it.");
                                if (result) {
                                    const signal = new AbortController().signal;
                                    deleteDeck(deck.id, signal)
                                        .then(r => console.log('singleId deleted: ', deck.id))
                                    window.location.href=`/`;
                                }
                            }}
                        >
                            {trashIcon}
                        </button>
                     </div>
                </div>
            </div>
         </div>
        );
    }


console.log(cards);
    let cardsOutput;

    if(deck.cards && deck.cards.length > 0){
        cardsOutput = (
            <div className="container">
            <h3>Cards</h3>
                {deck.cards.map((card) => (
                    <div className="card deckCard">
                        <div className="card-body d-flex" id={card.id}>

                            <div className="form-group">
                                <p className="cardFront float-left col-5">{card.front}</p>
                                <p className="cardBack float-right col-6">{card.back}</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <button
                                name="delete"
                                className="deleteButton btn-danger btn-lg float-right mr-2"
                                onClick={() => {
                                    const result = window.confirm(`Delete this card? \n \n You will not be able to recover it.`);
                                    if (result) {
                                        const signal = new AbortController().signal;
                                        deleteCard(card.id, signal)
                                            .then(r => console.log('singleId deleted: ',card.id))
                                        //window.location.href=`/decks/${deckId}`;
                                        window.location.href=`${url}`;
                                    }}
                                }
                            >
                                {trashIcon}
                            </button>

                            <button
                                name="edit"
                                className="editButton btn-secondary btn-lg float-right mr-2"
                                onClick={() => {
                                    window.location.href=`${url}/cards/${card.id}/edit`;
                                }
                                }
                            >
                                {pencilIcon} Edit
                            </button>
                        </div>
                        <br/>
                </div>
            ))
            }
        </div>
        );
    } else {
        cardsOutput = (
            <p>No Cards for this Deck</p>
        )
    }

    return(
        <div>
            {displayDeck}
            <br/>
            {cardsOutput}
        </div>
    )
}


export default DeckView;
