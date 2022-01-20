const html = document.querySelector("html");
const configButton = document.querySelector(".config-box");
const configModal = document.querySelector(".config-modal");
const checkBoxTheme = document.querySelector(".theme-config input");
const checkBoxFont = document.querySelector(".font-config input");

const preferences = {
  theme: "whiteMode",
  fontsize: "regular",
};

const initialColors = {
  bg: getStyle(html, "--bg"),
  fontColor: getStyle(html, "--font-color"),
  shadowColor: getStyle(html, "--shadow-color"),
  headerColor: getStyle(html, "--header-color"),
};

const darkColors = {
  bg: "#141726",
  fontColor: "#efeff4",
  shadowColor: "#00000099",
  headerColor: "#efeff4",
};

function getStyle(element, style) {
  return window.getComputedStyle(element).getPropertyValue(style);
}

function changeColors(colors) {
  Object.keys(colors).map((key) => {
    html.style.setProperty(transformKeys(key), colors[key]);
  });
}

function changeFontsize(fontsize) {
  html.style.setProperty("--font-size", `${fontsize}px`);
}

function transformKeys(key) {
  return "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();
}

function updatePreferences() {
  Object.keys(preferences).map((key) =>
    localStorage.setItem(`${key}Preference`, preferences[key])
  );
  setPreferences();
}

function setPreferences() {
  Object.keys(preferences).map(
    (key) => (preferences[key] = localStorage.getItem(`${key}Preference`))
  );

  if (preferences.theme == "darkMode") {
    changeColors(darkColors);
    checkBoxTheme.checked = "checked";
  } else {
    changeColors(initialColors);
  }

  if (preferences.fontsize == "large") {
    changeFontsize(18);
    checkBoxFont.checked = "checked";
  } else {
    changeFontsize(16);
  }
}

configButton.onclick = (e) => {
  e.preventDefault();
  if (configButton.classList.contains("opened")) {
    updatePreferences();
  }
  configButton.classList.toggle("opened");
  configModal.classList.toggle("opened");
};

checkBoxTheme.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(darkColors) : changeColors(initialColors);
  preferences.theme == "whiteMode"
    ? (preferences.theme = "darkMode")
    : (preferences.theme = "whiteMode");
});

checkBoxFont.addEventListener("change", ({ target }) => {
  target.checked ? changeFontsize(18) : changeFontsize(16);
  preferences.fontsize == "large"
    ? (preferences.fontsize = "regular")
    : (preferences.fontsize = "large");
});

window.onload = () => {
  if (!localStorage.getItem("themePreference")) {
    updatePreferences();
  } else {
    setPreferences();
  }
};
