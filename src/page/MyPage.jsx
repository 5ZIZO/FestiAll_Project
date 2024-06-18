import styled from "styled-components";
import MapComponent from "../components/mypage/MapComponent";


const StContainer = styled.div`
  width: 80%;
  height: 1000px;
  margin: 100px auto;
  padding: 5%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5%;
`;
const StLeftBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StTitleLeft = styled.h2`
  font-size: 1.5rem;
`;
const StTitleRight = styled.h2`
  font-size: 1.5rem;
`;
const StRightBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StGraphTitle = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin: 50px auto; 
`;
const StGraphBox = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
`;
const StGraphImg = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

function App() {
  return (
    <StContainer>
      <StLeftBox>
        <StTitleLeft>내가 찜한 축제</StTitleLeft>
          <MapComponent />
      </StLeftBox>
      <StRightBox>
        <StTitleRight>서울특별시(선택지역)</StTitleRight>
        <StGraphTitle>
          <p>축제포스터</p>
          <p>축제이름</p>
          <p>축제일정</p>
        </StGraphTitle>
        <hr style={{backgroundColor: "black"}}/>
        <StGraphBox>
          <StGraphImg>이미지</StGraphImg>
          <p>축제 타이틀</p>
          <p>2024-00-00~2024-00-00</p>
        </StGraphBox>
      </StRightBox>
    </StContainer>
  );
}

export default App;
