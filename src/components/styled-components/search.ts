import { createGlobalStyle } from "styled-components";

export const SearchStyle = createGlobalStyle`
.search-container {
  max-width: 1290px;
  margin: auto;
}

.search-childs {
  display: grid;
  grid-template-columns: minmax(150px, 100%);
  padding: 25px 15px;
  grid-gap: 15px;
}

.clear-text {
  display: flex;
  align-items: center;
  cursor: pointer;
}

`;