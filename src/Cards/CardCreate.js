import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {createCard, readDeck} from "../utils/api";

// /decks/:deckId/cards/new
function CardCreate(){
    const [deck, setDeck] = useState([]);
    const signal = new AbortController().signal;
    const {deckId} = useParams();

    //icons
    const homeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
             className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path
                d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
        </svg>
    );

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

                //Set the decks in the use State
                setDeck(deckCall);
                //setLastCard(deckCall.cards.pop());
            });
        }
        loadDecksFromAPI().then(() => console.log('loaded Decks From API'));

    }, [deckId]);

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li className="breadcrumb-item"><Link to="/">{homeIcon} Home</Link></li>
                <li className="breadcrumb-item"><Link to={"/decks/" + deckId}> {deck.name}</Link></li>
                <li className="breadcrumb-item active"><span aria-current="page">Add Card </span></li>
            </ul>
        </nav>
    );

    const [formData, setFormData] = useState(initialFormState);

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
            window.location.href=`/decks/${deckId}`
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
            <div className="container">
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
        return <p>Error Loading Add Card</p>
    }

}



export default CardCreate;