import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {readCard, readDeck, updateCard} from "../utils/api";

// /decks/:deckId/cards/:cardId/edit
function CardEdit(){
    const [card, setCard] = useState([]);
    const [deck, setDeck] = useState([]);
    const signal = new AbortController().signal;
    const {cardId} = useParams()
    const {deckId} = useParams()

    const history = useHistory();
    const {url} = useRouteMatch();

    console.log('CardCreate url: ', url);


    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href={"/decks/" + deckId}> {deck.name}</a></li>
                <li><span aria-current="page">Edit Card {cardId} </span></li>
            </ul>
        </nav>
    );



    useEffect(() => {
        async function loadCardFromAPI() {
            await readCard(cardId, signal).then((cardCall) => {
                // Log the fetched data
                console.log('Fetched card to edit: ', cardCall);
                //console.log('Fetched decks Cards Specifics: ', decksCall[0].cards);

                //Set the card in the use State
                setCard(cardCall);
            });
        }
        async function loadDeckFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                // Log the fetched data
                console.log('Fetched deck to edit: ', deckCall);

                //Set the decks in the use State
                setDeck(deckCall);
            });
        }
        loadCardFromAPI().then(() => console.log('loaded card From API'));
        loadDeckFromAPI().then(() => console.log('loaded deck From API'));

    }, []);


    let initialLoadedFormState = {
        front: card.front,
        back: card.back,
        deckId: parseInt(deckId),
        id: cardId,
    };

    const [formData, setFormData] = useState(initialLoadedFormState);


    const handleCardChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const signal = new AbortController().signal;
        console.log('formData from Create: ', formData.front,formData.back,parseInt(formData.deckId),);
        console.log('formData from Create JSON: ', JSON.stringify(formData));
        try {
            // Pass the form data as arguments to the updateCard function
            await updateCard(formData, signal);
            history.push(`/decks/${deckId}`);
            window.location.reload();
        } catch (error) {
            console.log('formData from Edit: ', formData);
            console.error("Error updating card:", error);
        } finally {
            // Reset the form data to its initial state after submitting
            setFormData(initialLoadedFormState);
        }
    };

    if(card && card.front && card.back){
        return (
                <form name='editCardForm' onSubmit={handleSubmit}>
                    <DeckNav></DeckNav>
                    <h1>Edit Card</h1>
                    <br/>
                    <h3>Front: </h3>
                    <textarea name='front'
                              id="cardFrontEdit"
                              required={true}
                              rows={3}
                              cols="75"
                              onChange={handleCardChange}>
                        {card.front}
                </textarea>
                    <br/>
                    <h3>Back: </h3>
                    <textarea name='back'
                              id="cardBackEdit"
                              required={true}
                              rows={3}
                              cols="75"
                              onChange={handleCardChange}>
                        {card.back}
                </textarea>
                    <br/>
                    <button
                        className='cancel btn-secondary btn-lg'
                        onClick={() => history.push('/')}>
                        Cancel
                    </button>
                    <button
                        className='submit btn-primary btn-lg'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
        )
    } else {

        return (
    <div>
        <DeckNav></DeckNav>
        <p>Error Loading Edit Card</p>
    </div>
        )
    }

}



export default CardEdit;