// This .babelrc.js configuration utilizes babel-plugin-import to optimize bundle size 
// when using Material-UI. It contains two plugin instances for @mui/material and 
// @mui/icons-material, ensuring that only the specific components and icons used 
// are included in the final build. This approach prevents the entire MUI library 
// from being bundled, thereby enhancing performance and efficiency.
const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'core', // Import the core components from the MUI library
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    'icons', // Import the icon components from the MUI library
  ],
];

module.exports = { plugins };