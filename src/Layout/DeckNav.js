import React from "react";
import { Link } from "react-router-dom";

// export const DeckNav = (props) => (
//     <nav aria-label="breadcrumb">
//         <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//                 <Link className="btn btn-link" to="/">Go Home</Link>
//                 <Link className="btn btn-link" to="/decks/:deckId"> {props.decks.name}</Link>
//             </li>
//         </ol>
//         <ul>
//             <li><a href="#">Home</a></li>
//             <li><a href="#">Category</a></li>
//             <li><a href="#">Sub Category</a></li>
//             <li><a href="#">Type</a></li>
//             <li><span aria-current="page">Product</span></li>
//         </ul>
// </nav>);
//
// export default DeckNav;



// import React, {useEffect, useState} from 'react';
// import {Link, useLocation, useParams} from 'react-router-dom';
// import {readDeck} from "../utils/api";
//
// function DeckNav(decks) {
//
//     const [deck, setDeck] = useState([]);
//     const [cards, setCards] = useState([]);
//     const location = useLocation();
//     const pathNames = location.pathname.split('/').filter((x) => x);
//     const signal = new AbortController().signal;
//     const {deckId} = useParams();
//     const DeckName = decks.decks[{deckId}];
//     const routes = [
//         { path: '/decks/:deckId', breadcrumbName: DeckName },
//         { path: '/decks/new', breadcrumbName: 'Create Deck' },
//         { path: '/decks/:deckId/study', breadcrumbName: DeckName + ' Study' },
//         { path: '/decks/:deckId/edit', breadcrumbName: DeckName + ' Edit Deck'},
//         { path: '/decks/:deckId/cards/new', breadcrumbName: DeckName + ' Add Card' },
//         { path: '/decks/:deckId/cards/:cardId/edit', breadcrumbName: DeckName + ' Edit Card + cardId'},
//
//     ];
//
//     console.log('fromNav', JSON.stringify(decks.decks[1]))
//     return (
//         <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                     <Link to="/">Home</Link>
//                 </li>
//
//                 {pathNames.map((value, index) => {
//                     const to = `/decks/${pathNames.slice(0, index + 1).join('/')}`;
//
//                         return (
//                             <li className="breadcrumb-item" key={index}>
//                                 {index === pathNames.length - 1 ? (
//                                     <span>{value}</span>
//                                 ) : (
//                                     <Link to={to}>{value}</Link>
//                                 )}
//                             </li>
//                         );
//                 })}
//             </ol>
//         </nav>
//     );
// }
//
// export default DeckNav;