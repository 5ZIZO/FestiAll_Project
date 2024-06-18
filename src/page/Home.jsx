import styled from "styled-components";
import Map from "../components/map/Map";

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

    li {
      width: 343px;
      height: 499px;
      border: 1px solid #b2b9c0;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      & .date {
        color: #b2b9c0;
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        margin-top: 10px;
      }

      & .title {
        color: #495057;
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
      }

      & .desc {
        color: #1b1d1f;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }

      & .btn--add {
        width: 295px;
        height: 40px;
        border-radius: 8px;
        background-color: #495057;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        font-size: 16px;
        font-weight: 400;
        margin-top: 24px;
      }
    }
  }
`;

function Home() {
  return (
    <Wrap>
      <ul className="map__ul__wrap">
        <li>
          <img src="http://via.placeholder.com/295x243" />
          <div className="card__item">
            <p className="date">6/17 ~ 6/19</p>
            <p className="title">Product name</p>
            <p className="desc">
              This is a product description. It is best to keep it short,
              between 1 or 3 lines.
            </p>

            <button className="btn--add" type="button">
              Add to cart
            </button>
          </div>
        </li>

        <li>
          <img src="http://via.placeholder.com/295x243" />
          <div className="card__item">
            <p className="date">6/17 ~ 6/19</p>
            <p className="title">Product name</p>
            <p className="desc">
              This is a product description. It is best to keep it short,
              between 1 or 3 lines.
            </p>

            <button className="btn--add" type="button">
              Add to cart
            </button>
          </div>
        </li>
      </ul>

      <Map />
    </Wrap>
  );
}

export default Home;
