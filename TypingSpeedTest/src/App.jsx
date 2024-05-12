
import './App.css'
import { Textarea } from './components/Textarea'
import { Button } from './components/Button'
import { Quotetext } from './components/Quotetext'
import { useEffect, useState } from 'react';

const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=110";

function App() {
  const [quote, setQuote] = useState([]);
  const [time, setTime] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [errors, setErrors] = useState(0);
  const [acuracy, setAcuracy] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const handleGetQuote = () => {
    fetch(quoteApiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la cita');
        }
        return response.json();
      })
      .then(json => {

        const quoteContent = json.content;
        const quoteCharsArray = quoteContent.split('');

        // Actualiza el estado de la cita para que se renderice en Quotetext
        setQuote(quoteCharsArray);
        setUserInput('');
      })
      .catch(error => console.error('Error al obtener la cita:', error));
  }

  useEffect(()=> {
    const interval = setInterval(()=> {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    if(time == 0){
      clearInterval(interval);
      handleStopTest();
    }
    
    return () => clearInterval(interval);

  },[time]);

  const handleUserInput = (e) => {
    const userInputValue = e.target.value;
    setUserInput(userInputValue);
    
    const inputChars = userInputValue.split('');
    let totalErrores = 0;

    quote.forEach((char, index) => {
      if (inputChars[index] && inputChars[index] !== char) {
        totalErrores++;
      }
    });
  
    // Actualizar el estado de errores
    setErrors(totalErrores);
  }


  const handleStartTest = () => {
    handleGetQuote();
    setTime(60);
    setUserInput('');
    setAcuracy(0);
    setErrors(0);
    setSpeed(0);
    setShowResult(false);
  }

  const handleStopTest = () => {
    if(userInput.length > 0)
      setAcuracy(Math.round(((userInput.length - errors) / userInput.length) * 100))
    else
      setAcuracy(0);

    let timeTaken = 1;
    if(timeTaken != 0){
        timeTaken = (60 - time) / 100;
    }

    setSpeed((userInput.length / 5 / timeTaken).toFixed(2));
    setShowResult(true);

    setTime(0);
  }

  const handleRestart = () => {
    setQuote([]);
    setUserInput('');
    setAcuracy(0);
    setErrors(0);
    setSpeed(0);
    setTime(0);
    setShowResult(false);
  }

  const resultsClassName = showResult ? 'results-section show' : 'results-section hide';


  return (
    <>
      <div className='card-app'>
        <div className='counter-box'>
          <span>Time: {time}</span>
        </div>
        <section className='quote-text-section'>
          <Quotetext userInput={userInput} quote={quote}/>
          <Textarea onInput={handleUserInput} value={userInput}/>
          <div className='quote-text-section-btns'>
            { quote.length === 0 ? (
              <Button onClick={handleStartTest} value='Start' quote={quote}/>
            ) : (
              <>
              <Button onClick={handleStopTest} value='Stop' quote={quote}/>
              <Button onClick={handleRestart} value='Restart' quote={quote}/>
              </>
            )}
          </div>
        </section>

        <section className={resultsClassName}>
          <h3>Results</h3>
          <div className='results-deploy-box'>
            <div>
              <span>Speed: {speed} ppm</span>
            </div>
            <div>
            <span>Acuracy: {acuracy} %</span>
            </div>
            <div>
              <span>Errors: {errors}</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App