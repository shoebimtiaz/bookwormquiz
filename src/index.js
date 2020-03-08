import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import BookwormQuiz from './BookwormQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore'

//data
const authors = [
    {
        name: 'Arundhati Roy',
        imageUrl: 'images/authors/arundhatiroy.jpg',
        books: [
            'The God of Small Things',
            'The Ministry of Utmost Happiness'
        ]
    },
    {
        name: 'Tahmima Anam',
        imageUrl: 'images/authors/tahmimaanam.jpg',
        books: [
            'The Golden Age',
            'The Good Muslim',
            'The Bones of Grace'
        ]
    },
    {
        name: 'Anuradha Roy',
        imageUrl: 'images/authors/anuradharoy.jpg',
        books: [
            'The Folded Earth',
            'The Atlas of Impossible Longing',
            'All the Lives We Never Lived',
            'Sleeping on Jupiter'
        ]

    },
    {
        name: 'Mohsin Hamid',
        imageUrl: 'images/authors/mohsinhamid.jpg',
        books: [
            'Moth Smoke',
            'The Reluctant Fundamentalist',
            'How to get Filthy Rich in Rising Asia',
            'Exit West'
        ]

    },
    {
        name: 'Mohammed Hanif',
        imageUrl: 'images/authors/mohammedhanif.jpg',
        books: [
            'The Case of Exploding Mangoes',
            'Our Lady of Alice Bhatti',
            'Red Birds'
        ]

    },
    {
        name: 'Nadeem Aslam',
        imageUrl: 'images/authors/nadeemaslam.jpg',
        books: [
            'Season of the Rainbirds',
            'Maps for Lost Lovers',
            'The Wasted Vigil',
            'The Golden Legend'
        ]

    },
    {
        name: 'Jhumpa Lahiri',
        imageUrl: 'images/authors/jhumpalahiri.jpg',
        books: [
            'The Interpreter of Maladies',
            'The Namesake',
            'Unaccustomed Earth',
            'The Lowland'
        ]

    },
    {
        name: 'Kamila Shamsie',
        imageUrl: 'images/authors/kamilashamsie.jpg',
        books: [
            'Kartography',
            'Broken Verses',
            'Burnt Shadows',
            'Salt and Saffron',
            'Home Fire'
        ]

    },
    {
        name: 'Fatima Bhutto',
        imageUrl: 'images/authors/fatimabhutto.jpg',
        books: [
            'The Shadow of the Crescent Moon',
            'The Runaways'
        ]

    },
    {
        name: 'Anuja Chauhan',
        imageUrl: 'images/authors/anujachauhan.jpg',
        books: [
            'The Zoya Factor',
            'Battle for Bittora',
            'Those Pricey Thakur Girls',
            'The House that BJ Built',
            'Baaz'
        ]

    }
];
//gets the data
function getRepertoireData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
        author.books.some((title) => 
        title === answer))
    }
}
//resets the state of the app after the continue button is clicked
function resetState() {
    return {
        repertoireData: getRepertoireData(authors),
        highlight: ''
    };
}
//calls resetState() function
let state = resetState();

//highlights the book panel when an answer is selected
function onAnswerSelected(answer) {
    const isCorrect = state.repertoireData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct': 'wrong';
    renderApp();

}
//sets the app functions and calls renderApp() to render the app
function App() {
    return <BookwormQuiz {...state}
     onAnswerSelected = {onAnswerSelected}
     onContinue = {() => {
         state = resetState();
         renderApp();
     }} />;
    }
//renders the app
function renderApp() {
ReactDOM.render(
    <BrowserRouter>
    <React.Fragment>
        <Route exact path="/" component={App} />
    </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
renderApp();
serviceWorker.register();
