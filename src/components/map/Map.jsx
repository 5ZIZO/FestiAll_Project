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
          new window.kakao.maps.Size(32, 32),
          {
            offset: new window.kakao.maps.Point(16, 32),
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
      <MenuWrap>
        <Option>
          <Input
            type="text"
            id="keyword"
            size="15"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <Button onClick={searchPlaces}>검색하기</Button>
        </Option>
        <hr />
        <PlacesList>
          {placesList.map((place, index) => (
            <ListItem key={index} className="item">
              <span className={`markerbg marker_${index + 1}`}></span>
              <div className="info">
                <h5>{place.place_name}</h5>
                {place.road_address_name ? (
                  <>
                    <span>{place.road_address_name}</span>
                    <span className="jibun gray">{place.address_name}</span>
                  </>
                ) : (
                  <span>{place.address_name}</span>
                )}
                <span className="tel">{place.phone}</span>
              </div>
            </ListItem>
          ))}
        </PlacesList>
        <Pagination>
          {pagination &&
            Array.from({ length: pagination.last }, (_, i) => (
              <PageLink
                key={i}
                href="#"
                className={i + 1 === pagination.current ? "on" : ""}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </PageLink>
            ))}
        </Pagination>
      </MenuWrap>
      <MapContainer id="map" ref={mapContainer}></MapContainer>
    </Container>
  );
};

export default Map;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MenuWrap = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  padding: 10px;
  position: absolute;
  left: 400px;
  top: 80px;
  width: 250px;
  z-index: 10;
  height: 600px;
  overflow: auto;
`;

const Option = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: calc(100% - 80px);
  padding: 5px;
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  margin-left: 5px;
  padding: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const PlacesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  display: flex;
  padding: 10px;

  .markerbg {
    background-color: skyblue;
    border-radius: 50%;
    height: 10px;
    margin-right: 10px;
    width: 10px;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;

    h5 {
      color: #333;
      font-size: 16px;
      margin: 0;
    }

    .jibun {
      color: #8c8c8c;
    }

    .tel {
      color: #009900;
    }
  }
`;

const Pagination = styled.div`
  text-align: center;
`;

const PageLink = styled.a`
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #333;
  cursor: pointer;
  display: inline-block;
  margin: 0 2px;
  padding: 2px 6px;
  text-decoration: none;

  &.on {
    background-color: #4caf50;
    border-color: #4caf50;
    color: white;
  }
`;

const MapContainer = styled.div`
  height: calc(100vh - 80px);
  width: calc(100vw - 400px);
`;
