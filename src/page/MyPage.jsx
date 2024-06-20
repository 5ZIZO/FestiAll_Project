import styled from 'styled-components';
import MapComponent from '../components/mypage/MapComponent';
import supabase from '../components/api/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();
  const selectMapData = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
    const { data: teamData } = await supabase.from('hearts').select('*, places(*)').eq('user_id', user.id);
    console.log(teamData);
    return teamData.map((data) => data.places);
  };

  const { data: mapData, isPending } = useQuery({
    queryKey: ['teamData'],
    queryFn: selectMapData
  });

  if (isPending) {
    return null;
  }

  
  return (
    <StContainer>
      <StLeftBox>
        <StTitleLeft>내가 찜한 지역</StTitleLeft>
        <MapComponent mapData={mapData} />
      </StLeftBox>
      <StRightBox>
        <StGraphTitle>
          <p style={{ width: '40%' }}>포스터</p>
          <p style={{ width: '35%' }}>축제이름</p>
          <p style={{ width: '25%' }}>축제일정</p>
        </StGraphTitle>
        <StGraphSrollBox>
          {mapData.map((data, index) => (
            <StGraphBox 
            key={index}
            onClick={()=>navigate(`/detail/:${data.post_id}`)}>
              <StGraphImg style={{ width: '30%' }} src={data.image} />
              <p style={{ width: '30%' }}>{data.name}</p>
              <div>
                <p>{data.st_date}</p>
                <p>~ {data.ed_date}</p>
              </div>
            </StGraphBox>
          ))}
        </StGraphSrollBox>
      </StRightBox>
    </StContainer>
  );
}

export default MyPage;

const StContainer = styled.div`
  width: 80%;
  height: 800px;
  margin: 40px auto;
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
  overflow-y: auto;
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
  width: 150px;
  height: 150px;
`;