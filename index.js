import "bootstrap/dist/js/bootstrap.esm.min.js";

class ThemeChanger extends HTMLElement {
  constructor() {
    super();

    const templateUrl = this.getAttribute("template-url");
    const templateId = this.getAttribute("template-id");
    console.log("TopNavBar templateUrl", templateUrl);
    console.log("TopNavBar templateId", templateId);

    if (templateUrl && templateId) {
      loadHtml(templateUrl, templateId)
        .then((template) => {
          if (template.nodeName === "TEMPLATE") {
            console.log("Loaded template:", template);
            this.innerHTML = template.innerHTML;
          } else {
            console.warn("Loaded node is not a template:", template);
            this.innerHTML = template.outerHTML;
          }

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
          if (template.nodeName === "TEMPLATE") {
            console.log("Loaded template:", template);
            this.innerHTML = template.innerHTML;
          } else {
            console.warn("Loaded node is not a template:", template);
            this.innerHTML = template.outerHTML;
          }
          console.log("TemplatedComponent constructed", this.componentId);
        })
        .catch((error) => {
          console.error("Error loading templated component:", error);
        });
      return;
    }
  }

  connectedCallback() {
    console.log(
      "TemplatedComponent connected to the DOM",
      this.componentId,
      this.innerHTML
    );
  }
}

function initThemeChanger() {
  return new ThemeChanger();
}

async function loadHtml(templateUrl, templateId) {
  const response = await fetch(templateUrl || "./my-template.html");
  const htmlString = await response.text();
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  const template = doc.querySelector(`#${templateId || "my-template"}`);
  return template.cloneNode(true);
}

export { loadHtml, ThemeChanger, TemplatedComponent };
