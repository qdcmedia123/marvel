import { createGlobalStyle }   from "styled-components";


export const CardStyles = createGlobalStyle`
 .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 200px));
  grid-gap: 10px;
  padding: 10px;
  justify-content: center;
}

.card {
  display: block;
  overflow: hidden;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-family: RobotoCondensed Bold, Trebuchet MS, Helvetica, Arial, sans-serif;
  text-decoration: none;
  outline: none;
}

.card .imgWrap-comics {
  position: relative;
  overflow: hidden;
  height: auto;
}

.card .imgWrap {
  position: relative;
  overflow: hidden;
  height: 210px;
}
.card .imgWrap::after {
  height: 4px;
  content: "";
  background-color: #e62429;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.card .imgWrap img {
  display: block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  overflow: hidden;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: top center;
  object-position: top center;
}
.card .body {
  background: #151515;
}
.card .body-comics {
  background-color: transparent;
}
.card .body-comics {
  color: #000000;
}
.card .body,
.card .body-comics {
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  position: relative;
  line-height: 1;
  padding: 24px;
  height: 145px;
  z-index: 10;
  vertical-align: middle;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.card .body .text {
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0;
  color: #fff;
}
.card .body .text-footer {
  margin: 0;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  -webkit-transition: all 0.17s ease-in-out;
  transition: all 0.17s ease-in-out;
  font-size: 12px;
  font-weight: 400;
}
.card .body::before {
  background: #e62429;
  bottom: 100%;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  -webkit-transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  -webkit-transition: -webkit-transform 0.3s;
  transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  transition: transform 0.3s, -webkit-transform 0.3s;
  width: 100%;
  z-index: -1;
}
.card .body::after {
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: #fff;
  border-style: solid;
  border-top-color: transparent;
  border-width: 12px 12px 0 0;
  bottom: 0;
  content: "";
  position: absolute;
  right: 0;
  top: auto;
  z-index: 40;
}
.card:hover .imgWrap img {
  -webkit-transform: scale3d(1.05, 1.05, 1);
  transform: scale3d(1.05, 1.05, 1);
}
.card:hover .body:before {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

.gray-text {
  color: gray;
  font-size: 14px;
}`