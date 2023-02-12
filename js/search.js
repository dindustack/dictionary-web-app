const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchDisplaySection = document.getElementById("display");
const loader = document.getElementById("loader");
const form = document.getElementById("form");
const search = document.getElementById("search");
const wordPlay = document.getElementById("sound");
const pronunciation = document.querySelector("audio");
const playButton = document.getElementById("play");

function showLoadingSpinner() {
  loader.hidden = false;
  searchDisplaySection.hidden = true;
  wordPlay.style.display = "none"
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    searchDisplaySection.hidden = false;
    loader.hidden = true;
  wordPlay.style.display = "flex"

  }
}

async function fetchWord(word) {
  showLoadingSpinner();
  try {
    const response = await fetch(APIURL + word);
    const data = await response.json();

    createSearchDisplay(data);
    loadWordPronunciation(data[0].phonetics[1].audio);
    removeLoadingSpinner();
  } catch (error) {
    removeLoadingSpinner();
    console.error(error)
    createErrorCard(data.message);
  }
}

// Play Word Pronunciation
function playWord() {
  pronunciation.play();
}

function loadWordPronunciation(word) {
  pronunciation.src = word;
}

function createSearchDisplay(item) {
  const searchDisplayHTML = ` 
  <div>
  <h1 class="trans-word">${item[0].word}</h1>
  <span class="phonetics">${item[0]?.phonetics[1].text}</span>
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

  showLoadingSpinner();

  const word = search.value;

  if (word) {
    fetchWord(word);

    search.value = "";
  }
});

playButton.addEventListener("click", () => {
  playWord();
});

// the api isn't working
