import styled from "styled-components";

interface ContainerProps {
  comicContainer?:any;
}
interface ModelProps {
  height: any;
}

export const Container = styled.div<ContainerProps>`
  max-width: 1440px;
  margin: auto;
  height: 100vh;
  justify-content: center;
  ${props => props.comicContainer && `
    margin-top: 15px
  `}
`;

export const A = styled.a`
  &:after {
    background-color: #e62429;
    border-color: #e62429;
    -webkit-transition: none;
    transition: none;
  }
  background-color: transparent;
  border-radius: 0;
  border: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-weight: 700;
  margin: 15px auto;
  overflow: hidden;
  padding: 0;
  position: relative;
  letter-spacing: 0;
  width: auto;
  z-index: 10;
`;

export const Model = styled.div<ModelProps>`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100%;
  min-height: 100%;
  height: ${(props) => props.height}px !important;
  margin: 0;
  padding: 0;
  z-index: 101;
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
`;

export const Avatar = styled.div<{link: string}>`
background-image: url(${props => props.link});
width: 60px;
    height: 60px;
    -webkit-border-radius: 60px;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 60px;
    -moz-background-clip: padding;
    border-radius: 60px;
    background-clip: padding-box;
    margin: 7px 0 0 5px;
    float: left;
    background-size: cover;
    background-position: center center;
`