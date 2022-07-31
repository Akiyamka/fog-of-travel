export async function wrapInWebComponent(wrapper: HTMLDivElement) {
  // @ts-ignore
  const style = await import('maplibre-gl/dist/maplibre-gl.css?raw');
  const css = style.default;

  class MapWebComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'closed' });
  
  
      // Create some CSS to apply to the shadow dom
      const style = document.createElement('style');  
      style.textContent = `
        .wrapper {
          position: relative;
          display: block;
          height: 100%;
          width: 100vw;
        }
      ` + css;

      // Attach the created elements to the shadow dom
      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.setAttribute('class', 'wrapper');

    }
  }
  return MapWebComponent;
}