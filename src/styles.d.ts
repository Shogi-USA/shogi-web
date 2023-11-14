/**
 * A declaration file that allows importing SCSS modules in TypeScript.
 * This declaration file tells TypeScript that any file ending in `.module.scss` can be imported as a module.
 * The module will have a default export of an object with keys that are class names and values that are strings.
 */
declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}