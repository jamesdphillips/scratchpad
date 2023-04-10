class Simple extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "closed" });
    this.shadowRoot.innerHTML = "<span>simple made easy</span>";
  }
}

export default Simple;
