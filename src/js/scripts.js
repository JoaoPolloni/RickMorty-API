const urlApi = 'https://rickandmortyapi.com/api/character/';
const listEl = document.getElementById('list');

let CountCharacter = '';
let nextUrl = '';
let prevUrl = '';
let numPages = '';

//Faz busca no campo ID
//const getCharacters = async (url, id = 'cop') => {
const getCharacters = async (url, id = '') => {
    if (id !== '') {
        var response = await fetch(`${url}?name=${id}`);        
    } else {
        var response = await fetch(url);        
    }
    
    const data = await response.json();

    CountCharacter = data.info.count;
    nextUrl = data.info.next;
    prevUrl = data.info.prev;
    numPages = data.info.pages;    
    
    const characters = data.results;
    render(characters);

    resultPage();
}


const render = (characters) => {
    listEl.innerHTML = '';
    characters.map((character) => {
        listEl.insertAdjacentHTML('beforeend', `
    <div class="card">
      <div class="card-header">
        <p class="card-title">${character.name}</p>
      </div>
      <div class="card-img">
        <img src="${character.image}" alt="${character.name}"/>
      </div>
      <div class="card-body">
       <p><b>ID:</b> ${character.id}</p>
       <p><b>Status:</b> ${character.status}</p>
       <p><b>Gender:</b> ${character.gender}</p>
      </div>
    </div>
    `)
    })        

}

const CountPage = () => {
    getCharacters(CountCharacter);
}
const nextPage = () => {
    getCharacters(nextUrl);
}
const prevPage = () => {
    getCharacters(prevUrl);
}
const homePage = () => {
    getCharacters(urlApi);
}

const resultPage = () => {     
    document.getElementById("count").style.display = 'block';
    document.getElementById("prev").style.display = 'block';
    document.getElementById("next").style.display = 'block';
    if (CountCharacter == null) {
        document.getElementById("count").style.display = 'none';     
    }
    if (nextUrl == null) {
        document.getElementById("next").style.display = 'none';     
    }
    if (prevUrl == null) {        
        document.getElementById("prev").style.display = 'none';
    }
}


getCharacters(urlApi);
