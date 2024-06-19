import { useEffect } from 'react';
import styled from 'styled-components';
import checkSignIn from '../components/authentication/checkSignIn';
import CatagoryBar from '../components/main/CatagoryBar';
import useFileterStore from '../store/useFileterStore';

import Map from '../components/map/Map';
import MapListCard from '../components/map/MapListCard';
import usePlaces from '../hooks/usePlaces';
import useAuthStore from '../store/store';

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 130px);
  .map__ul__wrap {
    width: 400px;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 20px 0;

    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: gray;
    }
    &::-webkit-scrollbar-thumb {
      background-color: skyblue;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: blue;
      transition: all 0.2s;
    }

    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }

    & > li:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;
function Home() {
  // 사용자 인증상태 전역 공유 아래처럼 사용하세요
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const filteredData = useFileterStore((state) => state.filteredData);
  useEffect(() => {
    console.log(123);
    checkSignIn();
  }, []);
  console.log('로그인 상태:', isSignedIn);

  useEffect(() => {
    console.log('Filtered Data:', filteredData);
  }, [filteredData]);

  // 스토어 커스텀 훅 fetch 테스트용 함수
  const { data: places, error, isLoading } = usePlaces();
  console.log('데이터 테이블을 잘 불러왔습니다요 =>', places);
  return (
    <>
      <CatagoryBar />
      <Wrap>
        <ul className="map__ul__wrap">
          <MapListCard />
          <MapListCard />
        </ul>

        <Map />
      </Wrap>
    </>
  );
}

export default Home;
