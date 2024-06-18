import usePlaces from '../hooks/usePlaces';


function Home() {

  // 스토어 커스텀 훅 fetch 테스트용 함수
  const { data: places, error, isLoading } = usePlaces();
  console.log('데이터 테이블을 잘 불러왔습니다요 =>' , places);

  return (
    <div>Home</div>
  )
}

export default Home