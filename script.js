const searchBtn = document.getElementById('btn');
const word = document.querySelector('input');
const result = document.getElementById('resultContainer');

searchBtn.addEventListener('click', async () => {
    const words = word.value;
    result.innerHTML = '';
    if (!words){
        result.innerHTML = '<p>Please enter a word to search.</p>';
        return;
    }
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${words}`;
    fetch(URL)
       .then((response) =>{
           if(!response.ok){
              throw new Error('Word not found');
           }
           return response.json();
       })
       .then((data) => {
           const meaning = data[0].meanings[0];
           const definition = meaning.definitions[0].definition;
           result.innerHTML = `<h3>Word: ${words}</h3>
           <p><strong>Defination:</strong> ${definition}</p>
           <p><strong>Part of speech: </strong> ${meaning.partOfSpeech}</p>
           `;
       })
       .catch((error) =>{        
        result.innerHTML = `<p>${error.message}</p>`;
       });
});


