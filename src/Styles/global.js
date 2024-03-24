// createGlobalStyle allows to create global component
import { createGlobalStyle } from "styled-components";

// the GlobalStyles is now a react component
// Here we are invoking createGlobalStyle
export const GlobalStyles = createGlobalStyle`

    body{
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.titleColor};
        margin: 0;
        padding: 0;
    }

    // avoiding scrollbar at the userpage
    body::-webkit-scrollbar{
        display: none;
    }

    .canvas{
        display: grid;
        min-height: 100vh;
        // rows are decided automatically
        grid-auto-flow: row; 
        gap: 0.5rem;
        text-align: center;
        align-items: center;
        width: 100vw;
    }

    .type-box{
        max-width: 1000px;
        height: 140px;
        margin-left: auto;
        margin-right: auto;
        // text overflowing horizontally so used below css
        overflow: hidden;
    }

    .words-wrapper{
        display: flex;
        flex-wrap: wrap;
        font-size: 32px;
        color: ${({ theme }) => theme.typeBoxText}
    }

    .word{
        margin: 5px;
        padding-right: 2px;
    }

    .hidden-input{
        opacity: 0;
    }

    .correct{
        color: ${({ theme }) => theme.titleColor};
    }

    .incorrect{
        color: red;
    }

    .current{
        border-left: 1px solid;
        animation: blinking 2s infinite;
        @keyframes blinking{
            0% {border-left-color:white;}
            25% {border-left-color:black;}
            50% {border-left-color:white;}
            75% {border-left-color:black;}
            100% {border-left-color:white;}
        }
    }

    .current-right{
        border-right: 1px solid;
        animation: blinkingRight 2s infinite;
        @keyframes blinkingRight{
            0% {border-right-color:white;}
            25% {border-right-color:black;}
            50% {border-right-color:white;}
            75% {border-right-color:black;}
            100% {border-right-color:white;}
        }
    }

    .skipped{
        color: grey;
    }

    .upper-menu{
        display: flex;
        width: 1000px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        font-size: 1.4rem;
        padding: 0.5rem;
    }

    .modes{
        display: flex;
        gap: 5px;
    }

    .time-modes: hover{
        color: green;
        cursor: pointer;
    }

    .stats-box{
        display: flex;
        width: 1000px;
        margin-left: auto;
        margin-right: auto;
        gap: 40px;
    }

    .left{
        width: 30%;
        padding: 20px;
        margin-top: 10px;
    }

    .right{
        width: 70%;
    }

    .title{
        font-size: 22px;
        color: ${({ theme }) => theme.typeBoxText};
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .subtitle{
        font-size: 22px;
        color: ${({ theme }) => theme.titleColor};
        text-align: right;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .restart{
        font-size: 26px;
        cursor: pointer;
        width: 60%;
        padding: 5px;
        margin: auto;
        margin-top: 50px;
        border: 1px solid ${({ theme }) => theme.background};
        border-radius: 10px;
    }

    .restart:hover{
        background-color: ${({ theme }) => theme.background};
    }

    .header, .footer{
        display: flex;
        justify-content: space-between;
        width: 1000px;
        margin-left: auto;
        margin-right: auto;
    }

    .screen-center{
        display: flex;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 5rem;
    }

    .table, .user-page-graph{
        width: 1000px;
        margin: auto;
        margin-bottom: 30px;
    }

    .table{
        margin-bottom: 80px;
    }

    .user-info{
        width: 1000px;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        background: ${({ theme }) => theme.titleColor};
        color: ${({ theme }) => theme.background};
        border-radius: 20px;
    }

    .user{
        width: 50%;
        display: flex;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 1.2rem;
        border-right: 2px solid;
        align-items: center;
    }

    .info{
        width: 60%;
        padding: 1rem;
    }
    .picture{
        width: 40%;
    }

    .total-tests-taken{
        width: 50%;
        font-size: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
