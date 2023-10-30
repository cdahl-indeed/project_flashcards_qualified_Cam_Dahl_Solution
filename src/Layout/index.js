import React, {useEffect, useState, Fragment} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {listDecks} from "../utils/api";
import DeckCardHome from "../Decks/DeckCardHome";
import {Switch, Route, useHistory, useRouteMatch} from "react-router-dom";
import DeckNav from "./DeckNav";
import DeckCreate from "../Decks/DeckCreate";
import DeckView from "../Decks/DeckView";
import CardCreate from "../Cards/CardCreate";
import CardEdit from "../Cards/CardEdit";
import DeckEdit from "../Decks/DeckEdit";
import DeckStudy from "../Decks/DeckStudy";
import Breadcrumbs from './DeckNav';



function Layout() {
 const [decks, setDecks] = useState([]);
 const [deckSize, setDeckSize] = useState(0);
 const history = useHistory();
 const {url} = useRouteMatch();


    useEffect(() =>{
        const signal = new AbortController().signal;
        async function loadDecksFromAPI() {
            await listDecks(signal).then((decksCall) => {
                // Log the fetched data
                // console.log('Fetched decks: ', decksCall);
                // console.log('Fetched decks Cards Specifics: ', decksCall[0].cards);

                //Set the decks in the use State
                setDecks(decksCall);
                //Sets the size of returned decks so when you create one it has +1 size
                setDeckSize(decksCall.length)

            });
        }

            loadDecksFromAPI().then(() => console.log('loaded Decks From API'));

    },[]);

console.log('Decks from UseState: ', decks);


  return (
        <Fragment className="container">
            <Header />
            <Switch>
                <Route exact path="/" >
                    {/* TODO: Implement the screen starting here */}

                    <button className='deckStudy btn btn-secondary btn-lg'
                            type="button"
                            onClick={() => {
                                history.push(`/decks/new`);
                            }
                            }>
                        + Create Deck
                    </button>


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
