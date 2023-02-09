const APIURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchDisplaySection = document.getElementById("display");
const form = document.getElementById("form");
const search = document.getElementById("search");
const music = document.querySelector("audio");

async function fetchWord(word) {
  try {
    const response = await fetch(APIURL + word);
    const data = await response.json();
    
    console.log("data", data);
    createSearchDisplay(data);
  } catch (error) {
    console.error("error");
  }
}

function createSearchDisplay(item) {
  const searchDisplayHTML = ` 
    <div class="word-trans">
        <div class="transcription">
        <h1 class="trans-word">${item[0].word}</h1>
        <span class="phonetics">${item[0].phonetics[0].text}</span>
        </div>
        <span class="audio">
        <i class="fa-solid fa-play"></i>
        </span>
    </div>  
    `;
  searchDisplaySection.innerHTML = searchDisplayHTML;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("form", search.value);

  const word = search.value;

  if (word) {
    fetchWord(word);

    search.value = "";
  }
});
