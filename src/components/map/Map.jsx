import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4338524b2a6b4d4f30b172736982fc4&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
          disableDoubleClickZoom: true,
          scrollwheel: true,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 확대 축소 제어
        const zoomControl = new window.kakao.maps.ZoomControl({
          animation: window.kakao.maps.Animation.DROP, // 애니메이션 옵션 설정
        });
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
  }, []);

  return <div id="map" style={{ width: "50%", height: "90vh" }}></div>;
};

export default Map;
