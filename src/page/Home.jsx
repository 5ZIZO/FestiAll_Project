import { useEffect } from 'react';
import usePlaces from '../hooks/usePlaces';
import useAuthStore from '../store/store';
import checkSignIn from '../components/authentication/\bcheckSignIn';


function Home() {

  // 사용자 인증상태 전역 공유 아래처럼 사용하세요
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  useEffect(()=>{
    checkSignIn();
  },[])
  console.log('로그인 상태:', isSignedIn);

  // 스토어 커스텀 훅 fetch 테스트용 함수
  const { data: places, error, isLoading } = usePlaces();
  console.log('데이터 테이블을 잘 불러왔습니다요 =>' , places);

  return (
    <div>Home</div>
  )
}

export default Home