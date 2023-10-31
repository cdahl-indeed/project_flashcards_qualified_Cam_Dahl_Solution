import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {readCard, readDeck, updateCard} from "../utils/api";

// /decks/:deckId/cards/:cardId/edit
function CardEdit(){
    const [card, setCard] = useState([]);
    const [deck, setDeck] = useState([]);
    const {cardId} = useParams()
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
                <li className="breadcrumb-item"><Link to="/"> {homeIcon} Home</Link></li>
                <li className="breadcrumb-item"><Link to={"/decks/" + deckId}> {deck.name}</Link></li>
                <li className="breadcrumb-item active"><span aria-current="page">Edit Card {cardId} </span></li>
            </ul>
        </nav>
    );

    useEffect(() => {
        const signal = new AbortController().signal;
        async function loadCardFromAPI() {
            await readCard(cardId, signal).then((cardCall) => {
                // Log the fetched data
                console.log('Fetched card to edit: ', cardCall);
                //console.log('Fetched decks Cards Specifics: ', decksCall[0].cards);
                initialLoadedFormState = {
                    front: cardCall.front,
                    back: cardCall.back,
                    deckId: parseInt(cardCall.deckId),
                    id: cardId,
                };
                // initialLoadedFormState.front = cardCall.front;
                // initialLoadedFormState.back = cardCall.back;
                setFormData(initialLoadedFormState);
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

    }, [deckId,cardId]);


    let initialLoadedFormState = {
        front: card.front,
        back: card.back,
        deckId: parseInt(deckId),
        id: cardId,
    };

    const [formData, setFormData] = useState(initialLoadedFormState);


    const handleCardChange = (event) => {
        const { name, value } = event.target;
        console.log('formData = ',formData);
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
            console.log('formData from Edit: ', formData);
            window.location.href=`/decks/${deckId}`
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
            <div className="container">
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

        return (
    <div>
        <DeckNav></DeckNav>
        <p>Error Loading Edit Card</p>
    </div>
        )
    }

}



export default CardEdit;