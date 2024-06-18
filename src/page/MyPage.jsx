import styled from "styled-components";


const StContainer = styled.div`
  width: 80%;
  height: 1000px;
  background-color: gray;
  margin: 100px auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const StLeftBox = styled.div`
  display: grid;
`;
const StTitle = styled.h2`
`;
const StRightBox = styled.div`
  display: grid;
  width: 50%;
  height: 100%;
`;
const StMap = styled.div`
  width: 90%;
  background-color: white;
  margin: 0 auto;

`;

function App() {
  return (
    <StContainer>
      <StLeftBox>
        <StTitle>내가 찜한 축제</StTitle>
        <StMap>지도</StMap>
      </StLeftBox>
      <StRightBox>
        <h3>선택지역</h3>
        <div>
          <p>축제이름</p>
          <p>축제일정</p>
          <hr />
        </div>
        <div>
          <img src="" alt="" />
          <p>축제 타이틀</p>
          <p>2024-00-00~2024-00-00</p>
        </div>
      </StRightBox>
    </StContainer>
  );
}

export default App;
