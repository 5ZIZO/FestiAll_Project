import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: 17%;
    height: 40px;
    background-color: ${props => props.$bgColor || "white"};
    color: ${props => props.$bgColor ? "white" : "black"};
    border: 2px solid ${props => props.$bgColor || "black"};
    padding: 10px 5px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    &:hover{
        filter: brightness(0.9);
    }
`;

const Button = ({ children, onClick, bgColor }) => {
    return (
        <StyledButton onClick={onClick} $bgColor={bgColor}>{children}</StyledButton>
    )
}

export default Button