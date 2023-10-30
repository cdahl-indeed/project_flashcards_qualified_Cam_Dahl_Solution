import React from 'react';
import {deleteDeck} from "../utils/api";
import {useHistory, useRouteMatch} from "react-router-dom";

// / home list of decks
export default function DeckCardHome(props) {

    let initialDecks = props.decks;

    let loadedDecks = [];
    const history = useHistory();

    const {url} = useRouteMatch();
    console.log('DeckCardHome url: ', url);

    if (props){
        const signal = new AbortController().signal;
        loadedDecks = initialDecks.map((singleDeck) => (
            <div className="card deckCard" key={singleDeck}>
                <div className="card-body">
                    <header>
                        <h3 className='deckTitle'>{singleDeck.name}</h3>
                        <p className='cardCount'>{singleDeck.cards.length} cards</p>
                    </header>

                    <p className='deckDescription'>{singleDeck.description}</p>


                    <button className='deckViewButton btn-secondary btn-lg'
                            type="button"
                            onClick={() => {
                                history.push(`/decks/${singleDeck.id}`);
                            }
                            }>
                        View
                    </button>

                    <button className='deckStudy btn btn-primary btn-lg'
                            type="button"
                            onClick={() => {
                                history.push(`/decks/${singleDeck.id}/study`);
                            }
                            }>
                        Study
                    </button>

                    <button
                        name="delete"
                        className="deleteButton btn btn-danger btn-lg"
                        onClick={() => {
                            const result = window.confirm("Delete this deck? \n \n You will not be able to recover it.");
                            if (result) {
                                deleteDeck(singleDeck.id, signal).then(r =>
                                    console.log('singleId deleted: ',singleDeck.id)
                                )
                                history.push('/');
                                window.location.reload();
                            }}}
                    >
                        Delete
                    </button>
                </div>
                <hr/>
            </div>
        ));
    }

        return (
                <div className="flex-container" >
                    {loadedDecks}
                </div>
        );
}
