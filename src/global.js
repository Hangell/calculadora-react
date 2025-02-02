import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'technology';
    src: url('/assets/fonts/Technology.ttf') format('truetype');
  }

*, body {
  font-family: 'technology', sans-serif;
  margin: 0;
  padding: 0;
}
`