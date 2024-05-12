
export const Quotetext = ({quote, userInput }) => {
    const quoteChars = quote;
    const inputChars = userInput.split('');

    return (
        <div className='quote-text'>
            {quoteChars.length === 0 ? (<>
                <p className="instructions" style={{fontWeight: 'bold', opacity:1}}>Welcome! Do you want to test your typing speed?</p>
                <p className="instructions">1. Press Start</p>
                <p className="instructions">2. Copy the phrase</p>
                <p className="instructions">3. Press Stop to finish the test</p></>
            ) : (
            quoteChars.map((char, index) => {
                const isCorrect = inputChars[index] === char;
                const charClass = isCorrect ? 'correct' : 'incorrect';
                return (
                    <span key={index} className={charClass}>
                    {char}
                    </span>
                );
            }))}
        </div>
        
    )
}