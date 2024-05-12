export const Button = ({value , onClick, quote}) => {
    
    const quoteLength = quote.length;

    return(
        <button onClick={onClick} className={quoteLength === 0 ? 'btn btn-start-test' : 'btn btns-stop-test' }>
            {value}
        </button>
    )
}