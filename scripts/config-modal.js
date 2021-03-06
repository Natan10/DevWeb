const html = document.querySelector("html");
const configButton = document.querySelector(".config-box");
const configModal = document.querySelector(".config-modal");
const checkBoxTheme = document.querySelector(".theme-config input");
const checkBoxFont = document.querySelector(".font-config input");

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

function transformKeys(key) {
  return "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();
}

configButton.onclick = (e) => {
  e.preventDefault();
  configButton.classList.toggle("opened");
  configModal.classList.toggle("opened");
};

checkBoxTheme.addEventListener("change", ({ target }) => {
  target.checked ? changeColors(darkColors) : changeColors(initialColors);
});

checkBoxFont.addEventListener("change", ({ target }) => {
  target.checked
    ? html.style.setProperty("--font-size", "18px")
    : html.style.setProperty("--font-size", "16px");
});
