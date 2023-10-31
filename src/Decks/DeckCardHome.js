import React from 'react';
import {deleteDeck} from "../utils/api";
import {useRouteMatch} from "react-router-dom";

// / home list of decks
export default function DeckCardHome(props) {

    let initialDecks = props.decks;

    let loadedDecks = [];

    const {url} = useRouteMatch();
    console.log('DeckCardHome url: ', url);

    //icons
    const trashIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash-fill"
             viewBox="0 0 16 16">
            <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
    );
    const eyeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye-fill"
             viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
        </svg>
    );
    const bookIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-book"
             viewBox="0 0 16 16">
            <path
                d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
        </svg>
    );

    if (props){
        const signal = new AbortController().signal;
        loadedDecks = initialDecks.map((singleDeck) => (
            <div className="container">
                <div className="card deckCard mx-auto" key={singleDeck}>
                    <div className="card-body">
                        <header className="header d-flex">
                            <h3 className='deckTitle'>{singleDeck.name}</h3>
                            <p className='cardCount ml-auto p-2'>{singleDeck.cards.length} cards</p>
                        </header>

                        <p className='deckDescription'>{singleDeck.description}</p>

                        <footer className="footer d-flex">
                            <button className='deckViewButton btn-secondary btn-lg p-2'
                                    type="button"
                                    onClick={() => {
                                        window.location.href=`/decks/${singleDeck.id}`
                                    }
                                    }>
                                {eyeIcon} View
                            </button>

                            <button className='deckStudy btn-primary btn-lg p-2 ml-2'
                                    type="button"
                                    onClick={() => {
                                        window.location.href=`/decks/${singleDeck.id}/study`
                                    }
                                    }>
                                {bookIcon} Study
                            </button>

                            <button
                                name="delete"
                                className="deleteButton btn-danger btn-lg ml-auto p-2"
                                onClick={() => {
                                    const result = window.confirm("Delete this deck? \n \n You will not be able to recover it.");
                                    if (result) {
                                        deleteDeck(singleDeck.id, signal).then(r =>
                                            console.log('singleId deleted: ',singleDeck.id)
                                        )
                                        window.location.href=`/`;
                                    }}}
                            >
                                {trashIcon}
                            </button>
                        </footer>
                    </div>
                    <hr/>
                </div>
            </div>
        ));
    }

        return (
                <div className="flex-container" >
                    {loadedDecks}
                </div>
        );
}
