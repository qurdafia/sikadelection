import './App.css';
import React, { useState, useEffect } from "react";
import iconMTB from "./assets/iconMTB.png";
import artImage from "./assets/artImage.jpeg";
import heiroImage from "./assets/heiroImage.jpeg";
import jeromeImage from "./assets/jeromeImage.jpeg";
import reyImage from "./assets/reyImage.jpeg";
import sikadLogoSmall from "./assets/sikadLogoSmall.png";

function App() {

  const [candidates, setCandidates] = useState([]);

  const url = "https://sheets.googleapis.com/v4/spreadsheets/1zFG7e5nlQSI5j832snvCgWj8RxioS1ZLRrIn1XOF8U4/values/President!A2:B?key=AIzaSyBwGOcaOA2aPj-YLWqCtxxSCMenbRj9dp4";

  // console.log(candidates);

  useEffect(() => {
    getPres();
  }, []);

  async function getPres() {
      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCandidates(data.values)
      })
      .catch((error) => {
          console.log(error);
        }
      )
  }

  let heiro = 0;
  let art = 0;
  let jerome = 0;
  let rey = 0;

  if (candidates) {
    for (let i=0; i < candidates.length; i++) {
      const name = candidates[i][1];
  
      if (name === "Heiro") {
        heiro++;
      } else if (name === "Art") {
        art++;
      } else if (name === "Jerome") {
        jerome++;
      } else if (name === "Rey") {
        rey++;
      }
  
      // console.log(name);
  
    }
  }

  // console.log(heiro);
  // console.log(art);
  // console.log(jerome);
  // console.log(rey);

  const totalVotes = heiro + art + jerome + rey;

  const renderCandidates = candidates.map((data, id) => {
    const timeVoted = data[0];
    const nameVoted = data[1];

    return (
        <div className="candidates" key={id}>
            {timeVoted} - {nameVoted}
        </div>
    )    
  });

  // Styling Votes 

  const progessHeiro = {
    backgroundColor: "rgb(239 7 178)",
    width: `${heiro*1.52}%`,
    height: "20px",
    float: "left"
  }

  const progessArt = {
    backgroundColor: "rgb(29 251 251)",
    width: `${art*1.52}%`,
    height: "20px",
    float: "left"
  }

  const progessJerome = {
    backgroundColor: "rgb(245 151 34)",
    width: `${jerome*1.52}%`,
    height: "20px",
    float: "left"
  }

  const progessRey = {
    backgroundColor: "rgb(56 243 208)",
    width: `${rey*1.52}%`,
    height: "20px",
    float: "left"
  }

  return (
    <div className="App">
      <div className="sikad-wrapper">
        <div class="sikad-header">
          <img alt="sikad-emblem" src={sikadLogoSmall} />
          <h1>SikadSG Presidential Election 2021</h1>
        </div>
        <div className="sikad-count">
          <img alt="sikad candidate" src={heiroImage} />
          <p>Heiro Angelo Ape</p>
          <p id="num-votes">Votes: {heiro}</p>
          <p style={progessHeiro}>&nbsp;</p><img id="sikad-icon" alt="running-bike" width="20px" src={iconMTB} />
        </div>
        <div className="sikad-count">
          <img alt="sikad candidate" src={artImage} />
          <p>Art Villarasa</p>
          <p id="num-votes">Votes: {art}</p>
          <p style={progessArt}>&nbsp;</p><img id="sikad-icon" alt="running-bike" width="20px" src={iconMTB} />
        </div>
        <div className="sikad-count">
          <img alt="sikad candidate" src={jeromeImage} />
          <p>Jerome Gayeta</p>
          <p id="num-votes">Votes: {jerome}</p>
          <p style={progessJerome}>&nbsp;</p><img id="sikad-icon" alt="running-bike" width="20px" src={iconMTB} />
        </div>
        <div className="sikad-count">
          <img alt="sikad candidate" src={reyImage} />
          <p>Rey Regasa</p>
          <p id="num-votes">Votes: {rey}</p>
          <p style={progessRey}>&nbsp;</p><img id="sikad-icon" alt="running-bike" width="20px" src={iconMTB} />
        </div>
        <h2>Voting Logs</h2>
        <hr />
        <div className="voting-logs">
          <h3>Members: 66 | Voted: {totalVotes} | Not Voted: {66 - totalVotes}</h3>
          {renderCandidates ? renderCandidates: null}
        </div>
      </div>
    </div>
  );
}

export default App;
