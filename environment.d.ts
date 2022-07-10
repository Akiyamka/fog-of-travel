// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'map-gl': unknown; // Normal web component
    }
  }

  interface Config {

  }
}
