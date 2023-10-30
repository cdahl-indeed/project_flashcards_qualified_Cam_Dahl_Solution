import React, {useState} from "react";
import {useHistory, useRouteMatch} from "react-router-dom";
import {createDeck} from "../utils/api";

// /decks/new
function DeckCreate(props){
    //gets current size of the decks and then adds 1
    let newDeckSize= props.deckSize + 1;
    // console.log('props:', props);
    // console.log(newDeckSize);

    const initialFormState = {
        id: newDeckSize,
        name: '',
        description: '',
    };
    console.log('initialFormState', initialFormState);

    const DeckNav = () => (
        <nav aria-label="Breadcrumb" className="breadcrumb">
            <ul>
                <li><a href="/">Home</a></li>
                <li><span aria-current="page">Create Deck </span></li>
            </ul>
        </nav>
    );

    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();

    const {url} = useRouteMatch();

    console.log('DeckCreate url: ', url);


    const handleDeckChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const signal = new AbortController().signal;
        console.log('formData from Create: ', formData.id,formData.name,formData.description);
        console.log('formData from Create JSON: ', formData);

        try {
            // Pass the form data as arguments to the createDeck function
            await createDeck(formData, signal);
            history.push("/");
            window.location.reload();
        } catch (error) {
            console.error("Error creating deck:", error);
        } finally {
            // Reset the form data to its initial state after submitting
            setFormData(initialFormState);
        }
    };

    return (
        <form name='createDeckForm' onSubmit={handleSubmit}>
            <DeckNav></DeckNav>
            <h1>Create Deck</h1>
            <br/>
            <h3>Name: </h3>
            <input name='name'
                      id="deckNameEdit"
                      required={true}
                      onChange={handleDeckChange}
                      placeholder={'Deck Name'}>

            </input>
            <br/>
            <h3>Description: </h3>
            <textarea name='description'
                      id="deckDescriptionEdit"
                      required={true}
                      rows={5}
                      cols="75"
                      onChange={handleDeckChange}
                      placeholder={'Brief description of the deck'}>

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
}



export default DeckCreate;