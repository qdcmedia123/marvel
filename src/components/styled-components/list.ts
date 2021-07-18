import { createGlobalStyle } from "styled-components";

export const List = createGlobalStyle`
.button {
  display: inline-block;
  text-transform: uppercase;
  text-decoration: none;
  padding: 10px 20px;
  background-color: #e62429;
  border: 3px solid #e62429;
  position: relative;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
  font-weight: bold;
}

.button:before {
  content: "";
  width: 20px;
  height: 20px;
  background: #fff;
  border: 3px solid #e62429;
  transform: rotate(45deg);
  position: absolute;
  border-top: 0;
  border-left: 0;
  border-bottom: 0;
  top: -12px;
  left: -13px;
}
.button:after {
  content: "";
  width: 20px;
  height: 20px;
  background: #fff;
  border: 3px solid #e62429;
  transform: rotate(-132deg);
  position: absolute;
  border-top: 0;
  border-left: 0;
  border-bottom: 0;
  top: auto;
  right: -13px;
  bottom: -12px;
}

button:hover {
  background-color: #b81c20;
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
`;
