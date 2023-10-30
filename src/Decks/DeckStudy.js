import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {deleteDeck, readDeck} from "../utils/api";

// /decks/:deckId/study
function DeckStudy() {
    const [cardLocation, setCardLocation] = useState(1);
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [cardSideBack, setCardSide] = useState(false);
    //const [lastCard, setLastCard] = useState('');
    //const [newCardID, setNewCardID] = useState(1);
    const signal = new AbortController().signal;
    //const {cardId} = useParams()
    const {deckId} = useParams()
    //const cardSideBack = false;

    const history = useHistory();
    const {url} = useRouteMatch();

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href={"/decks/" + deckId}>{deck.name}</a></li>
                <li><span aria-current="page">Study</span></li>
            </ul>
        </nav>
    );

    console.log('CardCreate url: ', url);




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
    if(cards && cards.length > 2 ){ //&& card.id){
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
        <div>
            <DeckNav></DeckNav>
            <h1>{deck.name}: Study</h1>

            <div className="card">
                <h3>Card {cardLocation} of {cards.length}</h3>

                {displayStudyCardData}

                <div id="buttonContainers">
                    <button className='flipCard btn btn-secondary btn-lg'
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
                    {cardSideBack === true ? <button className='goToNextCard btn btn-primary btn-lg'
                                                     type="button"
                                                     onClick={() => {
                                                         setCardLocation(cardLocation + 1)
                                                         setCardSide(false);
                                                         if (cardLocation === cards.length) {
                                                             const result = window.confirm("Restart Cards? \n \n" +
                                                                 "Click 'cancel' to return to the home page");
                                                             if (result) {
                                                                 setCardLocation(1);
                                                                 //window.location.reload();
                                                             } else {
                                                                 history.push(`/`);
                                                                 window.location.reload();
                                                             }
                                                         }
                                                     }}>
                        Next
                    </button> : '' }
                </div>
            </div>
        </div>
    )
// Not enough cards display
} else {
    return(
        <div>
            <DeckNav></DeckNav>
            <h1>{deck.name}: Study</h1>
            <h2>Not enough cards.</h2>

            <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
            <button className='deckAddCards btn btn-primary btn-lg'
                    type="button"
                    onClick={() => {
                        history.push(`/decks/${deck.id}/cards/new`);
                    }}>
                + Add Cards
            </button>
        </div>
    )
}
}



export default DeckStudy;