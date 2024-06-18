import styled from "styled-components";
import Map from "../components/map/Map";
import MapListCard from "../components/map/MapListCard";

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;

  .map__ul__wrap {
    width: 400px;
    height: 100vh;
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
  return (
    <Wrap>
      <ul className="map__ul__wrap">
        <MapListCard />
        <MapListCard />
      </ul>

      <Map />
    </Wrap>
  );
}

export default Home;
