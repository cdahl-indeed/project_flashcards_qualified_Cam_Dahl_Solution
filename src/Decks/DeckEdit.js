import React, {useEffect, useState} from "react";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import { readDeck, updateDeck} from "../utils/api";

// /decks/:deckId/edit
function DeckEdit(){
    const [deck, setDeck] = useState([]);
    //const [lastCard, setLastCard] = useState('');
    //const [newCardID, setNewCardID] = useState(1);
    const signal = new AbortController().signal;
    const {deckId} = useParams()

    const history = useHistory();
    const {url} = useRouteMatch();

    console.log('DeckEdit url: ', url);

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href={"/decks/" + deckId}> {deck.name}</a></li>
                <li><span aria-current="page">Edit Deck</span></li>
            </ul>
        </nav>
    );


    useEffect(() => {
        async function loadDeckFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                // Log the fetched data
                console.log('Fetched deck to edit: ', deckCall);
                //console.log('Fetched decks Cards Specifics: ', decksCall[0].cards);

                //Set the decks in the use State
                setDeck(deckCall);
                //setLastCard(deckCall.cards.pop());
            });
        }
        loadDeckFromAPI().then(() => console.log('loaded deck From API'));

    }, []);




    let initialLoadedFormState = {
        id: deckId,
        name: deck.name,
        description: deck.description,
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
        console.log('formData from Edit: ', formData.name,formData.description,formData.id,);
        console.log('formData from Edit JSON: ', JSON.stringify(formData));
        try {
            // Pass the form data as arguments to the updateDeck function
            await updateDeck(formData, signal);
            history.push(`/decks/${deckId}`);
            window.location.reload();
        } catch (error) {
            console.log('formData from Edit: ', formData);
            console.error("Error updating deck:", error);
        } finally {
            // Reset the form data to its initial state after submitting
            setFormData(initialLoadedFormState);
        }
    };

    if(deck && deck.name && deck.description){
        return (
            <form name='editDeckForm' onSubmit={handleSubmit}>
                <DeckNav></DeckNav>
                <h1>Edit Deck</h1>
                <br/>
                <p>Name </p>
                <textarea name='name'
                          id="deckNameEdit"
                          required={true}
                          rows={1}
                          cols="75"
                          onChange={handleCardChange}>
                    {deck.name}

            </textarea>
                <br/>
                <p>Description </p>
                <textarea name='description'
                          id="deckDescriptionEdit"
                          required={true}
                          rows={5}
                          cols="75"
                          onChange={handleCardChange}>
                    {deck.description}

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
        return <p>Error Loading Edit Deck</p>
    }

}



export default DeckEdit;