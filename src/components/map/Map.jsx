import React, { useEffect } from "react";
import styled from "styled-components";

const { kakao } = window;

const StMap = styled.div`
  width: calc(100% - 400px);
  height: 100%;
`;

export default function Map({ places }) {
  const loadMap = async () => {
    if (!kakao || !kakao.maps) {
      console.error('Kakao Maps API를 로드할 수 없습니다.');
      return;
    }

    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('지도를 표시할 div 요소를 찾을 수 없습니다.');
      return;
    }
    console.log(places);

    var map = new kakao.maps.Map(mapContainer, {
      // 지도를 표시할 div
      center: new kakao.maps.LatLng(36.2683, 127.6358), // 지도의 중심좌표
      level: 12 // 지도의 확대 레벨
    });

    const addressList = places.map((data) => data.address);
    var geocoder = new kakao.maps.services.Geocoder();

    const promises = addressList.map((address) => {
      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, function (result, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            resolve(coords);
          } else {
            reject(new Error(`Failed to get coordinates for address: ${address}`));
          }
        });
      });
    });
    let lattings = await Promise.allSettled(promises);
    lattings = lattings.filter((f) => f.status === 'fulfilled').map((m) => m.value);
    console.log(lattings);

    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
      disableClickZoom: true // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
    });

    // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
    // 데이터에서 좌표 값을 가지고 마커를 표시합니다
    // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
    var markers = lattings.map(function (data, i) {
      return new kakao.maps.Marker({
        position: data
      });
    });

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

    // 마커 클러스터러에 클릭이벤트를 등록합니다
    // 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
    // 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      // 현재 지도 레벨에서 1레벨 확대한 레벨
      var level = map.getLevel() - 1;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      map.setLevel(level, { anchor: cluster.getCenter() });
    });
  };

  useEffect(() => {
    loadMap();
  }, []);

  return <StMap id="map"></StMap>;
}