const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchDisplaySection = document.getElementById("display");
const loader = document.getElementById("loader");
const form = document.getElementById("form");
const search = document.getElementById("search");
const music = document.querySelector("audio");

function showLoadingSpinner() {
  loader.hidden = true
  searchDisplaySection.hidden = false;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    searchDisplaySection.hidden = false;
    loader.hidden = true;
  }
}

async function fetchWord(word) {
  showLoadingSpinner()
  try {
    const response = await fetch(APIURL + word);
    const data = await response.json();
    
    console.log("data", data);
    createSearchDisplay(data);
    removeLoadingSpinner();
  } catch (error) {
    removeLoadingSpinner();
    createErrorCard(data?.message);
  }
}

function createSearchDisplay(item) {
  const searchDisplayHTML = ` 
    <div class="word-trans">
        <div class="transcription">
        <h1 class="trans-word">${item[0].word}</h1>
        <span class="phonetics">${item[0].phonetics[1].text}</span>
        </div>
        <span class="audio">
        <i class="fa-solid fa-play"></i>
        </span>
    </div>  
    `;
  searchDisplaySection.innerHTML = searchDisplayHTML;
}

function createErrorMessage(message) {
  const sectionHTML = `
    <div class="card">
        <h2>${message}</h2>
    </div>
    `;
    searchDisplaySection.innerHTML = sectionHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const word = search.value;

  if (word) {
    fetchWord(word);

    search.value = "";
  }
});
