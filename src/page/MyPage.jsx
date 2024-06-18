import styled from "styled-components";
import MapComponent from "../components/mypage/MapComponent";

const StContainer = styled.div`
  width: 80%;
  height: 800px;
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
  justify-content: space-around;
  margin: 40px auto;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  justify-content: space-around;

  p {
    text-align: center;
  }
`;
const StGraphSrollBox = styled.div`
  width: 100%;
  height: 700px;
  /* border: 1px solid black; */
  overflow-y: scroll;
`;
const StGraphBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  white-space: nowrap;
  margin: 10px auto;
  p {
    text-align: center;
  }
`;
const StGraphImg = styled.img`
  background-image: url("http://via.placeholder.com/150x150 ");
  width: 150px;
  height: 150px;
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
          <p style={{ width: "30%" }}>포스터</p>
          <p style={{ width: "30%" }}>축제이름</p>
          <p style={{ width: "40%" }}>축제일정</p>
        </StGraphTitle>

        <StGraphSrollBox>
          <StGraphBox>
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>축제 타이틀</p>
            <p style={{ width: "40%" }}>2024-00-00 ~ 2024-00-00</p>
          </StGraphBox>
          <StGraphBox>
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>축제 타이틀</p>
            <p style={{ width: "40%" }}>2024-00-00 ~ 2024-00-00</p>
          </StGraphBox>
          <StGraphBox>
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>축제 타이틀</p>
            <p style={{ width: "40%" }}>2024-00-00 ~ 2024-00-00</p>
          </StGraphBox>
          <StGraphBox>
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>축제 타이틀</p>
            <p style={{ width: "40%" }}>2024-00-00 ~ 2024-00-00</p>
          </StGraphBox>
          <StGraphBox>
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>축제 타이틀</p>
            <p style={{ width: "40%" }}>2024-00-00 ~ 2024-00-00</p>
          </StGraphBox>
          <StGraphBox>
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>축제 타이틀</p>
            <p style={{ width: "40%" }}>2024-00-00 ~ 2024-00-00</p>
          </StGraphBox>
        </StGraphSrollBox>
      </StRightBox>
    </StContainer>
  );
}

export default App;
