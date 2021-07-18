import { createGlobalStyle } from "styled-components";

export const SkewHeaderStyle = createGlobalStyle`
.skew-container {
    position: relative;
    background-color: #000000;
    margin:0;
    height: 250px;
    border-bottom: 1px solid gray;
    overflow: hidden;
    display: flex;
    justify-content: center;
}


.skew-container:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    transform: skew(92deg);
    transform-origin:bottom left;
  }

  .container-title {
      font-size: 28px;
      padding: 10px 95px;
      text-transform: uppercase;
      color:gray;
      font-family: RobotoCondensed Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
      font-weight: 600;
  }

  .comic-parent {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .parent-title {
      color: #fff;
      font-family: RobotoCondensed Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
      font-size: 30px; 
      
}`;

