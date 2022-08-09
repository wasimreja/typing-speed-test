import { useEffect, useRef, useState } from "react";
import { words } from "../data/words";
var current = 0;
var correct = new Array(100).fill(0);
const Word = ({ word, index }) => {
  var color;
  if (current === index) {
    color = "orange";
  } else if (correct[index] === 1) {
    color = "green";
  } else if (correct[index] === -1) {
    color = "red";
  }

  return <span style={{ color: color }}>{word} </span>;
};
var timeRunning = false,
  time = 0,
  timer,
  correctNumber = 0;

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [sentenceArr, setSentenceArr] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [checked, setChecked] = useState(30);
  const inputRef = useRef(null);

  const getRandomWords = (n) => {
    let random = words.sort(() => 0.5 - Math.random()).slice(0, n);
    setSentenceArr(random);
    inputRef.current.focus();
  };
  useEffect(() => {
    getRandomWords(30);
  }, []);
  const handleInput = (e) => {
    const tempInput = e.target.value;
    if (tempInput[tempInput.length - 1] === " ") return;
    setInputValue(tempInput);
    if (current === checked - 1 && tempInput === sentenceArr[checked - 1]) {
      handleSubmit(tempInput);
      current++;
      // clearInterval(timer);
      // timeRunning = false;
      timerClearer();
      setInputValue("");
      return;
    }
  };
  const handleSubmit = (tempInput) => {
    if (
      inputValue === sentenceArr[current] ||
      tempInput === sentenceArr[current]
    ) {
      correct[current] = 1;
      correctNumber++;
    } else correct[current] = -1;
    console.log(current + 1);
    setAccuracy(((correctNumber / (current + 1)) * 100).toFixed(0));
  };
  const handleKeyPress = (e) => {
    if (e.key !== " " || e.target.value.trim() === "") return false;
    if (!timeRunning && current < sentenceArr.length) {
      timeRunning = true;
      timer = setInterval(() => {
        time++;
        setSpeed(((60 * correctNumber) / time).toFixed(0));
      }, 1000);
    }
    handleSubmit();
    setInputValue("");
    current++;

    if (current === sentenceArr.length) {
      // clearInterval(timer);
      // timeRunning = false;
      timerClearer();
    }
  };
  const timerClearer = () => {
    clearInterval(timer);
    timeRunning = false;
    time = 0;
    correctNumber = 0;
  };
  const restart = (number) => {
    correct.fill(0);
    current = 0;
    getRandomWords(number);
    setSpeed(0);
    setAccuracy(0);
    timerClearer();
  };
  const handleRadio = (e) => {
    const value = e.target.value;
    restart(value);
    setChecked(Number(value));
  };
  return (
    <>
      <div className="home">
        <form className="radio-container">
          Select No. of words:
          <div className="radio">
            <input
              type="radio"
              name="number"
              id="radio-1"
              value={15}
              onChange={handleRadio}
              checked={checked === 15}
            />
            <span>15</span>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="number"
              id="radio-2"
              value={30}
              onChange={handleRadio}
              checked={checked === 30}
            />
            <span>30</span>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="number"
              id="radio-3"
              value={45}
              onChange={handleRadio}
              checked={checked === 45}
            />
            <span>45</span>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="number"
              id="radio-4"
              value={60}
              onChange={handleRadio}
              checked={checked === 60}
            />
            <span>60</span>
          </div>
        </form>
        <div className="sentence-container">
          <span className="speed"> Current speed (WPM): {speed}</span>
          <span className="speed accuracy"> Accuracy: {accuracy}%</span>
          {sentenceArr.map((word, index) => {
            return <Word key={index} word={word} index={index} />;
          })}
        </div>
        <input
          ref={inputRef}
          type="text"
          className="type-input"
          placeholder="Start Typing"
          value={inputValue}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
      </div>
    </>
  );
};

export default Home;
