import { useEffect } from 'react';
import useAuthStore from '../store/store';


function Home() {

  // 유저 인증 상태 테스트용 함수
  const accessToken = useAuthStore((state) => state.accessToken);
  useEffect(() => {
    if (accessToken) {
      console.log('유저가 로그인 상태입니다.');
    } else {
      console.log('유저가 로그아웃 상태입니다.');
    }
  }, [accessToken]);


  return (
    <div>Home</div>
  )
}

export default Home