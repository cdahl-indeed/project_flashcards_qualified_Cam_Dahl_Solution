import React, {useState} from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {createDeck} from "../utils/api";

// /decks/new
function DeckCreate(props){
    //gets current size of the decks and then adds 1
    let newDeckSize= props.deckSize + 1;

    const initialFormState = {
        id: newDeckSize,
        name: '',
        description: '',
    };

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
                <li className="breadcrumb-item active"><span aria-current="page">Create Deck </span></li>
            </ul>
        </nav>
    );

    const [formData, setFormData] = useState(initialFormState);
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
            window.location.href=`/`;
        } catch (error) {
            console.error("Error creating deck:", error);
        } finally {
            // Reset the form data to its initial state after submitting
            setFormData(initialFormState);
        }
    };

    return (
        <div className="container">
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
                <div className="form-group">
                    <button
                        className='cancel btn-secondary btn-lg'
                        onClick={() => window.location.href=`/`}>
                        Cancel
                    </button>
                    <button
                        className='submit btn-primary btn-lg ml-3'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}



export default DeckCreate;