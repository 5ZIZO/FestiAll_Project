import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    height: 80px;
    background-color: #eeeeee;
    border-bottom: 1px solid #b2b9c0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 40px;
`;

export const LeftSide = styled.ul`
    width: 50%;
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const RightSide = styled.ul`
    width: 50%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 30px;
`;

export const Logo = styled.img`
    width: 150px;
    height: 45px;
    object-fit: fill;
    cursor: pointer;
`;

export const SearchInput = styled.input`
    width: 355px;
    height: 40px;
    border: 2px solid #B2B9C0;
    border-radius: 8px;
`;

export const SearchButton = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;
