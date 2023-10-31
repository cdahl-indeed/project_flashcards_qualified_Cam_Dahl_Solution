import React, {useEffect, useState} from "react";
import {Link, useParams, useRouteMatch} from "react-router-dom";
import { readDeck, updateDeck} from "../utils/api";

// /decks/:deckId/edit
function DeckEdit(){
    const [deck, setDeck] = useState([]);
    const signal = new AbortController().signal;
    const {deckId} = useParams()

    const {url} = useRouteMatch();

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
                <li className="breadcrumb-item"><Link to="/"> {homeIcon} Home</Link></li>
                <li className="breadcrumb-item"><Link to={"/decks/" + deckId}> {deck.name}</Link></li>
                <li className="breadcrumb-item active"><span aria-current="page">Edit Deck</span></li>
            </ul>
        </nav>
    );


    useEffect(() => {
        async function loadDeckFromAPI() {
            await readDeck(deckId, signal).then((deckCall) => {
                // Log the fetched data
                console.log('Fetched deck to edit: ', deckCall);
                initialLoadedFormState = {
                    id: deckId,
                    name: deck.name,
                    description: deck.description,
                };
                //Set the decks in the use State
                setDeck(deckCall);
            });
        }
        loadDeckFromAPI().then(() => console.log('loaded deck From API'));

    }, [deckId]);

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
            window.location.href=`/decks/${deckId}`;
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
            <div className="container">
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
                        onClick={() => window.location.href=`/`}>
                        Cancel
                    </button>
                    <button
                        className='submit btn-primary btn-lg ml-2'
                        type='submit'
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    } else {
        return <p>Error Loading Edit Deck</p>
    }

}



export default DeckEdit;