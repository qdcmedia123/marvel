import { createGlobalStyle } from "styled-components";

export const ModelStyles = createGlobalStyle`
.wf-page-continer {
  backdrop-filter: blur(5px) !important;
  position: absolute;
  height: auto;
  width: 100%;
}
.popup-container {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  width: 100%;
  height: 1275.53px !important;
  padding: 0;
  top: 0px;
  margin: 0;
  z-index: 101;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
}

.popup-wrapper {
  padding: 53px 44px;
  position: fixed;
  left: calc(50% - 700px / 2 - 0.5px);
  right: calc(50% - 700px / 2 - 0.5px);
  top: 50px;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  z-index: 100;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.summary {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  /* identical to box height, or 130% */
  color: #000000;
}

.dark {
  background: #f6f6f6;
}

.col-wrapper {
  display: flex;
  margin-top: 15px;
  width: 100%;
  justify-content: center;
}

.col-text {
  color: #6c6c6c;
  padding-left: 15px;
  font-family: RobotoCondensed Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
}

.popup-title {
  padding-bottom: 15px;
  font-family: RobotoCondensed Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
  font-size: 24px;
  line-height: 40px;
  border-bottom: 1px solid gray;
}

.center {
  width: 100%;
  justify-content: center;
}

.nofify {
  text-align: center;
  margin: 25px;
  font-size: 18px;
}

@media only screen and (max-width: 786px) {
  .popup-wrapper {
    left: 15px;
    right: 15px;
  }
}

`;
