import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {createCard, readDeck} from "../utils/api";

// /decks/:deckId/cards/new
function CardCreate(){
    const [deck, setDeck] = useState([]);
    //const [lastCard, setLastCard] = useState('');
    //const [newCardID, setNewCardID] = useState(1);
    const signal = new AbortController().signal;
//gets current id of the last cards and then adds 1
    // get cards.length (props.cards.length -1)[to get to array spot] query at location .id +1

    const {deckId} = useParams();
    console.log('deck id: ',deckId)

    let initialFormState = {
        front: '',
        back: '',
        deckId: parseInt(deckId),
    };

    useEffect(() => {
        async function loadDecksFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                // Log the fetched data
                console.log('Fetched card Create deck: ', deckCall);
                //console.log('Fetched decks Cards Specifics: ', decksCall[0].cards);

                //Set the decks in the use State
                setDeck(deckCall);
                //setLastCard(deckCall.cards.pop());
            });
        }
        loadDecksFromAPI().then(() => console.log('loaded Decks From API'));

    }, []);

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href={"/decks/" + deckId}> {deck.name}</a></li>
                <li><span aria-current="page">Add Card </span></li>
            </ul>
        </nav>
    );

    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();

    const {url} = useRouteMatch();

    console.log('CardCreate url: ', url);



    const handleCardChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //formData card
    let card = [];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const signal = new AbortController().signal;
        console.log('formData from Create: ', formData.front,formData.back,parseInt(formData.deckId),);
        console.log('formData from Create JSON: ', JSON.stringify(formData));
        card = formData;
        try {
            // Pass the form data as arguments to the createCard function
            await createCard(parseInt(deckId), card, signal);
            history.push(`/decks/${deckId}`);
            window.location.reload();
        } catch (error) {
            console.log('formData from Create: ', formData);
            console.error("Error creating card:", error);
        } finally {
            // Reset the form data to its initial state after submitting
            setFormData(initialFormState);
        }
    };

    if(deck && deck.name){
        return (
            <form name='createCardForm' onSubmit={handleSubmit}>
                <DeckNav></DeckNav>
                <h1>{deck.name}: Add Card</h1>
                <br/>
                <h3>Front: </h3>
                <textarea name='front'
                          id="cardFrontEdit"
                          required={true}
                          rows={3}
                          cols="75"
                          onChange={handleCardChange}
                          placeholder={'Front side of card'}>

            </textarea>
                <br/>
                <h3>Back: </h3>
                <textarea name='back'
                          id="cardBackEdit"
                          required={true}
                          rows={3}
                          cols="75"
                          onChange={handleCardChange}
                          placeholder={'Back side of card'}>

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
        return <p>Error Loading Add Card</p>
    }

}



export default CardCreate;