import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: RGB(251, 251, 251);
    }

    // 많이 쓰는 flex속성  section의 default로 변경
    section{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    *{
        box-sizing: border-box;
    }
    body{
        font-family: -apple--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 30px;
        background-color:RGB(245, 245, 245);
        color: white;
    }
`;

export default GlobalStyles;
