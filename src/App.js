import React, { useState, useEffect } from "react";
import "./App.css";

const LOCAL_STORAGE_KEY = "quiz-multiple-choice";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [items, setItems] = useState([]);
  const [newNama, setNewNama] = useState("");

  //Local Storage
  useEffect(() => {
    const storageScore = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageScore) {
      setItems(storageScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function saveScore() {
    const item = {
      id: +new Date(),
      value: (score / questions.length) * 100,
      nama: newNama,
    };
    setItems((oldList) => [...oldList, item]);
  }

  const onClickHandler = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };
  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const questions = [
    {
      text: `Dalam suatu kelas yang terdiri atas 15 
      siswa putri dan 12 siswa putra akan dipilih sepasang 
      ganda campuran (putra dan putri) untuk mewakili kelas. Berapa banyak 
      cara sepasang ganda campuran itu.`,
      options: [
        { id: 0, text: "150", isCorrect: false },
        { id: 1, text: "160", isCorrect: false },
        { id: 2, text: "170", isCorrect: false },
        { id: 3, text: "180", isCorrect: true },
      ],
    },
    {
      text: `Ada berapa banyak susunan berbeda yang terdiri atas 3 huruf 
      dari kata ABRACADABRA ?`,
      options: [
        { id: 0, text: "91", isCorrect: true },
        { id: 1, text: "61", isCorrect: false },
        { id: 2, text: "95", isCorrect: false },
        { id: 3, text: "161", isCorrect: false },
      ],
    },
    {
      text: `Tentukan banyaknya cara 5 orang duduk pada 5 kursi yang terletak sebaris`,
      options: [
        { id: 0, text: "120", isCorrect: true },
        { id: 1, text: "25", isCorrect: false },
        { id: 2, text: "5", isCorrect: false },
        { id: 3, text: "125", isCorrect: false },
      ],
    },
    {
      text: `Ada 8 kursi yang disusun dalam 2 baris yaitu baris A 
      dan baris B. Masing- masing baris terdiri atas 4 kursi.
      Tentukan banyaknya cara mengatur 8 orang untuk duduk jika 
      3 orang tertentu harus duduk di baris A`,
      options: [
        { id: 0, text: "2890", isCorrect: false },
        { id: 1, text: "2880", isCorrect: true },
        { id: 2, text: "2990", isCorrect: false },
        { id: 3, text: "2980", isCorrect: false },
      ],
    },
    {
      text: `Tentukan banyaknya cara 3 orang duduk pada 
      4 kursi yang terletak sebaris`,
      options: [
        { id: 0, text: "32", isCorrect: false },
        { id: 1, text: "24", isCorrect: true },
        { id: 2, text: "12", isCorrect: true },
        { id: 3, text: "43", isCorrect: false },
      ],
    },
  ];
  function shuffleArray(questions) {
    questions.sort(() => Math.floor(Math.random() - 0.5));
  }
  return (
    <div className="App">
      <h1>Quiz App</h1>

      <h1>
        Correct {score} from {questions.length}
      </h1>

      {showResult ? (
        <div className="final-result">
          <h1>Final result</h1>
          <h2 className="result-score">{(score / questions.length) * 100} </h2>

          <button
            onClick={() => {
              restartQuiz();
            }}
          >
            restart Quiz
          </button>
          <br />
          <br />
          <br />
          <input
            type="text"
            placeholder="Nama"
            value={newNama}
            onChange={(e) => {
              setNewNama(e.target.value);
            }}
          />
          <button onClick={() => saveScore()}>Save Score</button>

          <div className="final-quiz">
            <ul>
              {items.map((item) => {
                return (
                  <li key={item.id}>
                    {item.nama} {item.value} {""}
                    <button onClick={() => deleteItem(item.id)}>X</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="question-card">
          <h2>{shuffleArray(questions)}</h2>
          <h3 className="question-text">
            {" "}
            {currentQuestion + 1} {"."} {questions[currentQuestion].text}
          </h3>

          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  onClick={() => onClickHandler(option.isCorrect)}
                  key={option.id}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
