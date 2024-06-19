import styled from "styled-components";
import MapComponent from "../components/mypage/MapComponent";
// import axios from "axios";
import MapData from "../map.json";

const StContainer = styled.div`
  width: 80%;
  height: 800px;
  margin: 50px auto;
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
    
    word-wrap: break-word;
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
    white-space: pre-wrap;
    text-align: center;
    line-height: 26px;
    max-width: 170px;
  }
`;
const StGraphImg = styled.img`
  background-image: url("http://via.placeholder.com/150x150 ");
  width: 150px;
  height: 150px;
  border: 1px solid black;
`;


function MyPage() {
  // const apiKey ='kjelz5qb9QC3+4nh0Ov2rqNUv+OgJH5zlfuBHg/gqaULC7llZC5Y4Y72aui0iIryXyxbmDE5VHE6GaOvPS1bag==';
  // const url = 'http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api';
  // const params = {
  //   serviceKey: apiKey,
  //   type: 'json',
  //   pageNo: 1,
  //   numOfRows: 10,
  // };
  // axios.get(url, { params })
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });


  return (
    <StContainer>
      <StLeftBox>
        <StTitleLeft>내가 찜한 축제</StTitleLeft>
        <MapComponent />
      </StLeftBox>
      <StRightBox>
        <StTitleRight>서울특별시(선택지역)</StTitleRight>
        <StGraphTitle>
          <p style={{ width: "40%"}}>포스터</p>
          <p style={{ width: "35%" }}>축제이름</p>
          <p style={{ width: "25%" }}>축제일정</p>
        </StGraphTitle>

        <StGraphSrollBox>
          {MapData.records.slice(5).map((data, index)=>(
          <StGraphBox key={index}> 
            <StGraphImg style={{ width: "30%" }} />
            <p style={{ width: "30%" }}>{data.축제명}</p>
            <div>
            <p>{data.축제시작일자}</p>
            <p>~ {data.축제종료일자}</p>
            </div>
          </StGraphBox>
            ))}
        </StGraphSrollBox>
      </StRightBox>
    </StContainer>
  );
}

export default MyPage
;
