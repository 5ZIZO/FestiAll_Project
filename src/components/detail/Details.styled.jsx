import styled from "styled-components";

export const Section = styled.section`
    width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FestState = styled.div`
    margin-top: 10px;
    width: 50%;
    height: 40px;
    background-color: #495057;
    color: white;
    border: 2px solid black;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FestTitle = styled.h1`
    font-size: 2em;
    margin: 0.67em 0;
    font-weight: bold;
`;

export const FestOutline = styled.div`
    color: #9A9A9A;
`;

export const ContentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    gap: 20px;
`;

export const P = styled.p`
    width: 100%;
    padding: 10px;
`;

export const ImageDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const Image = styled.img`
    width: 100%;
    border-radius: 10px;
`;

export const TextDiv = styled.div`
    width: 100%;
`;

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

export const H3 = styled.h3`
    font-size: 1.17em;
    margin: 1em 0;
    font-weight: bold;
`;

export const JjimButton = styled.button`
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    color: white;
    background-color: ${props => props.$color};
    cursor: pointer;
    &:hover{
        filter: brightness(0.9);
    }
`;

export const DetailDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: self-start;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 30px;
`;

export const MapDiv = styled.div`

`;

export const DescriptionDiv = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`;

export const DetailBar = styled.div`
    width: 100%;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 8px;
    padding: 1%;
`;

export const H4 = styled.h4`
    font-size: 1em;
    margin: 0;
    font-weight: bold;
`;