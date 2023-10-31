import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";

// /decks/:deckId/study
function DeckStudy() {
    const [cardLocation, setCardLocation] = useState(1);
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardSideBack, setCardSide] = useState(false);
    const signal = new AbortController().signal;
    const {deckId} = useParams()

    //icons
    const homeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
             className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path
                d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
        </svg>
    );

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li className="breadcrumb-item"><Link to="/">{homeIcon} Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active"><span aria-current="page">Study</span></li>
            </ul>
        </nav>
    );

    useEffect(() => {
        async function loadDecksFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                // Log the fetched data
                console.log('Fetched viewing deck: ', deckCall);
                //console.log('Fetched decks Cards Specifics: ', decksCall[0].cards);

                //Set the decks in the use State
                setDeck(deckCall);
                setCards(deckCall.cards);
            });
        }
        loadDecksFromAPI().then(() => console.log('loaded Decks From API'));
    }, []);

    let displayStudyCardData;
    if(cards && cards.length > 2 ){
        displayStudyCardData = (
            <div>
                {cardSideBack === false ?
                    <p>{cards[cardLocation-1].front}</p>
                    :
                    <p>{cards[cardLocation-1].back}</p>}
            </div>
        );
    }

//cards are more than 2 display study for 3 cards+
if (cards && cards.length > 2){
    return (
        <div className="container">
            <DeckNav></DeckNav>
            <header>
                <h1>{deck.name}: Study</h1>
            </header>

            <div className="card">
                <div className="card-body">
                    <h3>Card {cardLocation} of {cards.length}</h3>
                    {displayStudyCardData}

                    <div id="buttonContainers">
                        <button className='flipCard btn-secondary btn-lg ml-2'
                                type="button"
                                onClick={() => {
                                    if(cardSideBack === false) {
                                        setCardSide(true);
                                    } else {
                                        setCardSide(false);
                                    }
                                }}>
                            Flip
                        </button>
                        {cardSideBack === true ?
                            <button className='goToNextCard btn-primary btn-lg ml-2'
                                     type="button"
                                     onClick={() => {
                                         setCardLocation(cardLocation + 1)
                                         setCardSide(false);
                                         if (cardLocation === cards.length) {
                                             const result = window.confirm("Restart Cards? \n \n" +
                                                 "Click 'cancel' to return to the home page");
                                             if (result) {
                                                 setCardLocation(1);
                                             } else {
                                                 window.location.href=`/`;
                                             }
                                         }
                                     }}>
                            Next
                        </button> : '' }
                    </div>
                </div>
            </div>
        </div>
    )
// Not enough cards display
} else {
    return(
        <div className="container">
                <DeckNav></DeckNav>
            <div className="card">
                <header>
                    <h1>{deck.name}: Study</h1>
                    <h2>Not enough cards.</h2>
                </header>

                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <button className='deckAddCards btn-primary btn-lg'
                        type="button"
                        onClick={() => {
                            window.location.href=`/decks/${deck.id}/cards/new`;
                        }}>
                    + Add Cards
                </button>
            </div>
        </div>
    )
}
}



export default DeckStudy;