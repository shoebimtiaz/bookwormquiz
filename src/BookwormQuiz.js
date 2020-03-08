import React from 'react';
import './App.css';
import './bootstrap.min.css'

//sets the header of the app
function Header() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Bookworm Quiz</h1>
      <p>Select a book written by the author shown</p>
    </div>
  </div>
  );
}

//sets the book panel 
function Book({title, onClick}) {
  return (
    <div className="answer" onClick={() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  )

}

//sets the interactive components of the app
function Repertoire({author, books, highlight, onAnswerSelected}) {
  function mapHighlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (<div className="row turn" style={{backgroundColor: mapHighlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorimage" alt="Author"/>
    </div>
    <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
    </div>
  </div> );
}

//sets the continue button
function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
    { show 
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
      : null }
    </div>
  );
}

//sets footer
function Footer() {
  return (
    <footer>
      <div className="footer-copyright text-center py-3">© 2020 Copyright: Bookworm Quiz
      </div>
      </footer>);
}

//main function of the app that sets the app architecture
function BookwormQuiz({repertoireData, highlight, onAnswerSelected, onContinue}) {
  return (
    <div className="container-fluid">
      <Header/>
      <Repertoire {...repertoireData} highlight = {highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight === 'correct'} onContinue={onContinue}/>
      <Footer/>
    </div>
  );
}


export default BookwormQuiz;
