import "bootstrap/dist/js/bootstrap.esm.min.js";

function initThemeManager() {
  return new ThemeManager();
}

async function loadHtml(templateUrl, templateId) {
  const response = await fetch(templateUrl || "./my-template.html");
  const htmlString = await response.text();
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  const template = doc.querySelector(`#${templateId || "my-template"}`);
  return template.cloneNode(true);
}

class ThemeManager {
  constructor() {
    this.init();
  }

  getStoredTheme = () => localStorage.getItem("theme");
  setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  getPreferredTheme = () => {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  setTheme = (theme) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active use");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const svgOfActiveBtn = btnToActive.querySelector("i").getAttribute("class");

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    themeSwitcher.querySelector("i").setAttribute("class", svgOfActiveBtn);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  init() {
    this.setTheme(this.getPreferredTheme());

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        const storedTheme = this.getStoredTheme();
        if (storedTheme !== "light" && storedTheme !== "dark") {
          this.setTheme(this.getPreferredTheme());
        }
      });

    window.addEventListener("DOMContentLoaded", () => {
      this.showActiveTheme(this.getPreferredTheme());

      document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
        toggle.addEventListener("click", () => {
          const theme = toggle.getAttribute("data-bs-theme-value");
          this.setStoredTheme(theme);
          this.setTheme(theme);
          this.showActiveTheme(theme, true);
        });
      });
    });
  }
}

class ComponentManager {
  constructor() {
    this.init();
    console.log("ComponentManager constructed");
  }

  init() {
    console.log("ComponentManager initialized");
  }
}

class TopNavBar extends HTMLElement {
  constructor() {
    super();
    const templateUrl = this.getAttribute("template-url");
    const templateId = this.getAttribute("template-id");
    console.log("TopNavBar templateUrl", templateUrl);
    console.log("TopNavBar templateId", templateId);

    if (templateUrl && templateId) {
      loadHtml(templateUrl, templateId)
        .then((template) => {
          this.innerHTML = template.innerHTML;
          console.log("TopNavBar constructed");
        })
        .catch((error) => {
          console.error("Error loading navbar template:", error);
        });
      return;
    }
  }

  connectedCallback() {
    // this.innerHTML = this.innerHTML;
    console.log("TopNavBar connected to the DOM", this.innerHTML);
  }
}

class TemplatedComponent extends HTMLElement {

  constructor() {
    super();
    this.componentId = this.id;
    const templateUrl = this.getAttribute("template-url");
    const templateId = this.getAttribute("template-id");
    console.log("TemplatedComponent", this.componentId, templateUrl);
    console.log("TemplatedComponent", this.componentId, templateId);

    if (templateUrl && templateId) {
      loadHtml(templateUrl, templateId)
        .then((template) => {
          this.innerHTML = template.innerHTML;
          console.log("TemplatedComponent constructed", this.componentId);
        })
        .catch((error) => {
          console.error("Error loading templated component:", error);
        });
      return;
    }
  }

  connectedCallback() {
    console.log("TemplatedComponent connected to the DOM", this.componentId, this.innerHTML);
  }
}


export { initThemeManager, ComponentManager, loadHtml, TopNavBar, TemplatedComponent };
