import './App.css'
import usePlaces from './hooks/usePlaces';
import styled from 'styled-components';

const TestDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const TestItemDiv = styled.div`
border: 3px solid black;
`

function App() {
  const { data: places, isPending, isError, error } = usePlaces();

  if (isPending) return <div>로딩 중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <>
      <h1>API 호출 테스트</h1>
      <TestDiv>
        {places && places.map((place) => (
          <TestItemDiv key={place.post_id}>
            <p>행사명 : {place.name}</p>
            <p>행사 시작일 : {place.st_date}일 {place.st_time}분 시작</p>
            <p>행사 종료일 : {place.ed_date}일 {place.ed_time}분 종료</p>
            <p>행사 종류 : {place.category}</p>
            <p>행사장 주소 : {place.address}</p>
            <p>참가비 : {place.pricing} 원</p>
            <p>행사 상세내용 : {place.description}</p>
            <p>행사 이미지 : <img src={place.image} style={{ width: '200px' }} /></p>
          </TestItemDiv>
        ))}
      </TestDiv>
    </>
  );
}

export default App;

