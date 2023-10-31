import React, {useEffect, useState, Fragment} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {listDecks} from "../utils/api";
import DeckCardHome from "../Decks/DeckCardHome";
import {Switch, Route} from "react-router-dom";
import DeckCreate from "../Decks/DeckCreate";
import DeckView from "../Decks/DeckView";
import CardCreate from "../Cards/CardCreate";
import CardEdit from "../Cards/CardEdit";
import DeckEdit from "../Decks/DeckEdit";
import DeckStudy from "../Decks/DeckStudy";

function Layout() {
 const [decks, setDecks] = useState([]);
 const [deckSize, setDeckSize] = useState(0);

    //icons
    const plusIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus"
             viewBox="0 0 16 16">
            <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
    );


    useEffect(() =>{
        const signal = new AbortController().signal;
        async function loadDecksFromAPI() {
            await listDecks(signal).then((decksCall) => {
                //Set the decks in the use State
                setDecks(decksCall);
                //Sets the size of returned decks so when you create one it has +1 size
                setDeckSize(decksCall.length)
            });
        }
            loadDecksFromAPI().then(() => console.log('loaded Decks From API'));
    },[]);

  return (
        <Fragment>
            <Header />
            <Switch>
                <Route exact path="/" >
                    {/* TODO: Implement the screen starting here */}
                    <div className="container">
                        <button className='deckStudy btn-secondary btn-lg mx-auto'
                                type="button"
                                onClick={() => {
                                    window.location.href=`/decks/new`;
                                }
                                }>
                            {plusIcon} Create Deck
                        </button>
                        <br />
                        <br />
                    </div>

                    {(decks.length > 0) ?
                        <DeckCardHome decks={decks} ></DeckCardHome>
                        :
                        <p>No Decks to Load :C 3</p>
                    }
                </Route>

                <Route exact path="/decks/:deckId/cards/new">
                    <CardCreate></CardCreate>
                </Route>

                <Route exact path="/decks/:deckId/edit">
                    <DeckEdit></DeckEdit>
                </Route>

                <Route exact path="/decks/:deckId/cards/:cardId/edit">
                    <CardEdit> </CardEdit>
                </Route>

                <Route exact path="/decks/:deckId/study">
                    <DeckStudy> </DeckStudy>
                </Route>

                <Route path="/decks/new">
                    <DeckCreate deckSize={deckSize}></DeckCreate>
                </Route>

                <Route path="/decks/:deckId">
                    <DeckView></DeckView>
                </Route>

                <Route>
                    <NotFound />
                </Route>

            </Switch>

        </Fragment>
  );
}

export default Layout;
