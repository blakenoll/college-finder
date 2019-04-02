import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {

  }

  * {
    box-sizing: border-box;
  }

    body {
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;

    h1,h2,h3,h4,h5,h6 {
    font-family: Karla;
    color: #0c2340;
    }

    a {
      color: #2A5DB0;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

`;
