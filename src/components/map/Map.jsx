import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [placesList, setPlacesList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_KEY;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer.current, options);
        setMap(map);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlacesList(data);
        setPagination(pagination);
        displayPlaces(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    });
  };

  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    const newMarkers = places.map((place, index) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position,
        image: new window.kakao.maps.MarkerImage(
          "https://ifh.cc/g/T3HOhD.png",
          new window.kakao.maps.Size(30, 30),
          {
            spriteSize: new window.kakao.maps.Size(30, 30),
            spriteOrigin: new window.kakao.maps.Point(0, index * 46 + 10),
            offset: new window.kakao.maps.Point(15, 30),
          }
        ),
      });

      marker.setMap(map);
      bounds.extend(position);

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });
      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      return marker;
    });

    setMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => marker.setMap(null));
      return newMarkers;
    });

    map.setBounds(bounds);
  };

  const displayInfowindow = (marker, title) => {
    const infowindow = new window.kakao.maps.InfoWindow({
      zIndex: 1,
    });
    infowindow.setContent(`<div style="padding:5px;z-index:1;">${title}</div>`);
    infowindow.open(map, marker);
  };

  const handlePageClick = (page) => {
    if (pagination) {
      pagination.gotoPage(page);
    }
  };

  return (
    <Container>
      <MapContainer id="map" ref={mapContainer}></MapContainer>
    </Container>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  width: calc(100vw - 400px);
  height: 100%;
`;
