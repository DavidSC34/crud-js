/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async()=>{
    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
        const data = await res.json();
        console.log(data[0]);
        return data[0];
    
}



//empieza con mayuscula por convencion, ser la app principal
/**
 * 
 * @param {HTMLElement} element 
 */
export const BreakingbadApp =async  ( element)=>{
  
    document.querySelector('#app-title').innerHTML='Breaking Bad App';
   
    element.innerHTML ='Loading...';
    // await fetchQuote();

    const quoteLabel = document.createElement('blockquote');
    const authLabel = document.createElement('h3');
    const nextQuoteLabel = document.createElement('button');
    nextQuoteLabel.innerText = 'Next Quote';

    const renderQuote = ( data)=>{
            quoteLabel.innerHTML = data.quote;
            authLabel.innerHTML = data.author;
            element.replaceChildren( quoteLabel, authLabel,nextQuoteLabel);
    }

    nextQuoteLabel.addEventListener('click',async()=>{
        element.innerHTML ='Loading...';
        const quote = await fetchQuote();
        renderQuote(quote);
    })

    fetchQuote()
    .then( data => renderQuote(data))
   
}