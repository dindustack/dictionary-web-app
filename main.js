const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");
const dropdown = document.querySelector(".dropdown");
const select = document.querySelector(".dropdown-select");
const caret = document.querySelector(".fas");
const menu = document.querySelector(".dropdown-content");
const options = document.querySelectorAll(".dropdown-content li");
const selected = document.querySelector(".toggle-text");

function toggleDarkLightMode(isDark) {
  isDark
    ? toggleIcon.children[0].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[0].classList.replace("fa-moon", "fa-sun");
}

// Switch Theme Dynamically
function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleDarkLightMode(true);
    return;
  }
  document.documentElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
  toggleDarkLightMode(false);
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check local storage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    toggleDarkLightMode(true);
  }
}

// Display the dropdown options
select.addEventListener("click", () => {
  caret.classList.toggle("fa-angle-up");

  menu.classList.toggle("menu-open");
});

// Switch Font Dynamically
function changeFont(name) {
  if (name) {
    document.documentElement.setAttribute("font-theme", name);
    localStorage.setItem("font", name);
    return;
  }
}

// Select font
options.forEach((option) => {
  option.addEventListener("click", () => {
    selected.innerText = option.innerText;
    changeFont(option.innerText);

    // handle the dropdown options
    select.classList.remove("select-clicked");
    caret.classList.replace("fa-angle-up", "fa-angle-down");
    menu.classList.remove("menu-open");

    options.forEach((option) => {
      option.classList.remove("active");
    });

    option.classList.add("active");
  });
});

// Check local storage for font
const currentFont = localStorage.getItem("font");

if (currentFont) {
  document.documentElement.setAttribute("font-theme", currentFont);

  if (currentFont) {
    selected.innerText = currentFont
    changeFont(currentFont)
  }
}


