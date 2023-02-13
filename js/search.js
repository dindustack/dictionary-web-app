const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchDisplaySection = document.getElementById("display");
const loader = document.getElementById("loader");
const form = document.getElementById("form");
const search = document.getElementById("search");
const wordPlay = document.getElementById("sound");
const pronunciation = document.querySelector("audio");
const playButton = document.getElementById("play");
const nounSection = document.getElementById("noun");
const verbSection = document.getElementById("verb");
const sourceSection = document.getElementById("source");

function showLoadingSpinner() {
  loader.hidden = false;
  searchDisplaySection.hidden = true;
  wordPlay.style.display = "none";
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    searchDisplaySection.hidden = false;
    loader.hidden = true;
    wordPlay.style.display = "flex";
  }
}

async function fetchWord(word) {
  showLoadingSpinner();
  try {
    const response = await fetch(APIURL + word);
    const data = await response.json();

    createSearchDisplay(data);
    createPartsOfSpeech(data);
    createSourceSection(data);
    loadWordPronunciation(data[0].phonetics[1].audio);
    removeLoadingSpinner();
  } catch (error) {
    removeLoadingSpinner();
    console.error(error);
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

function createPartsOfSpeech(item) {
  // definition lists for noun
  const nounDefinition = item[0]?.meanings[0].definitions.map(
    ({ definition }) => {
      return `<ul>
        <li>${definition}</li>   
    </ul>`;
    }
  );

  // definition lists for verb
  const verbDefinition = item[0]?.meanings[1].definitions.map(
    ({ definition }) => {
      return `<ul>
        <li>${definition}</li>   
    </ul>`;
    }
  );

  // Noun section
  const nounHTML = ` 
    <div class="separator">${item[0].meanings[0].partOfSpeech}</div>
    <span class="meaning">Meaning</span>
    
    ${nounDefinition}

    <div class="synonym-text">
      <span class="meaning">Synonyms</span>
      <span class="synonym">${item[0].meanings[0].synonyms}</span>
    </div> 
  `;

  // Verb section
  const verbHTML = ` 
    <div class="separator">${item[0].meanings[1].partOfSpeech}</div>
    <span class="meaning">Meaning</span>
    
    ${verbDefinition}
  `;
  nounSection.innerHTML = nounHTML;
  verbSection.innerHTML = verbHTML;
}

function createSourceSection(item) {
  const sourceHTML = ` 
    <div class="separator"></div>
    <div class="source-text">
      <span class="meaning">Source</span>
      <a href=${item[0].sourceUrls[0]} class="source-link">${item[0].sourceUrls[0]}</a>
    </div>
    `;
  sourceSection.innerHTML = sourceHTML; 
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
