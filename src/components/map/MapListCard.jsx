import styled from "styled-components";

const List = styled.li`
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
`;

function MapListCard() {
  return (
    <List>
      <img src="http://via.placeholder.com/295x243" />
      <div className="card__item">
        <p className="date">6/17 ~ 6/19</p>
        <p className="title">Product name</p>
        <p className="desc">
          This is a product description. It is best to keep it short, between 1
          or 3 lines.
        </p>

        <button className="btn--add" type="button">
          Add to cart
        </button>
      </div>
    </List>
  );
}

export default MapListCard;
