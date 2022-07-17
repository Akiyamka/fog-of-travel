declare global {
  interface Config {

  }
  
  declare module "solid-js" {
    namespace JSX {
      interface IntrinsicElements { 
        'map-gl': any;
      }
    }
  }
}

