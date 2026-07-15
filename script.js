const translations = document.querySelectorAll("[data-en][data-zh]");
const translatedImages = document.querySelectorAll("[data-alt-en][data-alt-zh]");
const languageToggle = document.getElementById("langToggle");
const description = document.querySelector('meta[name="description"]');

const pageMetadata = {
  en: {
    title: "Dong Qiu | Academic Homepage",
    description: "Academic homepage of Dong Qiu, a postdoctoral researcher in mathematics at Zhejiang University.",
    toggleLabel: "切换到中文"
  },
  zh: {
    title: "邱冬 | 个人学术主页",
    description: "邱冬的个人学术主页，现为浙江大学数学科学学院博士后研究人员。",
    toggleLabel: "Switch to English"
  }
};

function preferredLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage === "en" || queryLanguage === "zh") {
    return queryLanguage;
  }

  const savedLanguage = window.localStorage.getItem("homepage-language");
  if (savedLanguage === "en" || savedLanguage === "zh") {
    return savedLanguage;
  }

  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

let language = preferredLanguage();

function applyLanguage(nextLanguage, persist = true) {
  language = nextLanguage;

  translations.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  translatedImages.forEach((image) => {
    image.alt = image.dataset[`alt${language === "en" ? "En" : "Zh"}`];
  });

  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.title = pageMetadata[language].title;
  description.content = pageMetadata[language].description;
  languageToggle.setAttribute("aria-label", pageMetadata[language].toggleLabel);

  if (persist) {
    window.localStorage.setItem("homepage-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }
}

languageToggle.addEventListener("click", () => {
  applyLanguage(language === "en" ? "zh" : "en");
});

applyLanguage(language, false);
