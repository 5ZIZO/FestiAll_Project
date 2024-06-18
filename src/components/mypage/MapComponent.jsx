import { useEffect } from 'react';
import styled from 'styled-components';

const StMap = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px auto;
  border: 1px solid #D8D8D8;
`;

const MapComponent = () => {
  useEffect(() => {
    // Kakao Maps API가 이미 로드된 경우
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      // Kakao Maps API를 동적으로 로드
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY`; // Replace with your actual API key
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          initializeMap();
        } else {
          console.error('Failed to load Kakao Maps API.');
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const initializeMap = () => {
    const { kakao } = window;
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.56684222514979, 126.97866640250403),
      level: 3,
    };
    new kakao.maps.Map(container, options);
  };

  return <StMap id="map"></StMap>;
};

export default MapComponent;