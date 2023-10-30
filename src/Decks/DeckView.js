import {deleteCard, deleteDeck, readDeck} from "../utils/api";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";


function DeckView() {

    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const history = useHistory();
    const {deckId} = useParams();
    //const deckLocation = (deckId - 1);
    const signal = new AbortController().signal;
    const {url} = useRouteMatch();

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li><a href="/">Home</a></li>
                <li><span aria-current="page">{deck.name}</span></li>
            </ul>
        </nav>
    );

    useEffect(() => {
        async function loadDecksFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                // Log the fetched data
                //console.log('Fetched viewing deck: ', deckCall);
                //Set the decks in the use State
                setDeck(deckCall);
                setCards(deckCall.cards);
            });
        }
        loadDecksFromAPI().then(() => console.log('loaded Decks From API'));
    }, []);


    let displayDeck;
    if (deck && deck.name) {
         displayDeck = (
             <div>
             <DeckNav></DeckNav>
             <div className="card deckDisplay">
                 <div className="card-body">
                    <h3 className='deckTitle'>{deck.name}</h3>
                    <p className='deckDescription'>{deck.description}</p>

                         <button className='deckEdit btn btn-secondary btn-lg'
                                 type="button"
                                 onClick={() => {
                                     history.push(`/decks/${deck.id}/edit`);
                                 }
                                 }>
                             Edit
                         </button>

                        <button className='deckStudy btn btn-primary btn-lg'
                                type="button"
                                onClick={() => {
                                    history.push(`/decks/${deck.id}/study`);
                                }
                                }>
                            Study
                        </button>

                        <button className='deckAddCards btn btn-primary btn-lg'
                                type="button"
                                onClick={() => {
                                    history.push(`/decks/${deck.id}/cards/new`);
                                }
                                }>
                            + Add Cards
                        </button>

                    <button
                        name="delete"
                        className="deleteButton btn btn-danger btn-lg"
                        onClick={() => {
                            const result = window.confirm("Delete this deck? \n \n You will not be able to recover it.");
                            if (result) {
                                deleteDeck(deck.id, signal)
                                    .then(r => console.log('singleId deleted: ', deck.id))
                                history.push(`/`);
                                window.location.reload();
                            }
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
         </div>
        );
    }


console.log(cards);
    let cardsOutput;

    if(deck.cards && deck.cards.length > 0){
        cardsOutput = (
            deck.cards.map((card) => (
                <div className="card deckCard">
                    <div className="card-body" id={card.id}>
                        <p className="cardFront">{card.front}</p>
                        <p className="cardBack">{card.back}</p>


                            <button
                                name="edit"
                                className="editButton btn btn-secondary btn-lg"
                                onClick={() => {
                                    history.push(`${url}/cards/${card.id}/edit`);
                                     }
                                }
                            >
                                Edit
                            </button>

                        <button
                            name="delete"
                            className="deleteButton btn btn-danger btn-lg"
                            onClick={() => {
                                const result = window.confirm(`Delete this card? \n \n You will not be able to recover it. ${card.id}`);
                                if (result) {
                                    deleteCard(card.id, signal)
                                        .then(r => console.log('singleId deleted: ',card.id))
                                    history.push(`/decks/${deckId}`);
                                    window.location.reload();
                                }}
                            }
                        >
                            Delete
                        </button>
                    </div>
                    <hr/>
                </div>
            ))

        );
    } else {
        cardsOutput = (
            <p>No Cards for this Deck</p>
        )
    }

    return(
        <div>
            {displayDeck}
            <hr/>
            <h3>Cards</h3>
            {cardsOutput}
        </div>
    )
}


export default DeckView;
