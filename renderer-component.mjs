const sym = "render-target";
const registry = new CustomElementRegistry();

class Renderer extends HTMLElement {
  instanceCount = 0;

  static get observedAttributes() {
    return ["ref"];
  }

  constructor() {
    super();

    // use a clean registry to avoid any conflicts
    this.attachShadow({ mode: "open", registry });

    // Render given component
    // this.el = this.shadowRoot.createElement(this.#name);
    // this.#render();
  }

  get #name() {
    return [sym, this.instanceCount.toString()].join("-v");
  }

  async #render() {
    const { default: Component } = await import(this.attributes.ref.value);
    registry.define(this.#name, Component);
    // this.el.tagName = this.#name;
    this.shadowRoot.innerHTML = `<${this.#name} />`;
  }

  attributeChangedCallback() {
    this.instanceCount++;
    this.#render();
  }
}

export default Renderer;
