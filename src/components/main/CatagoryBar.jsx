import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import usePlaces from "../../hooks/usePlaces";

const CatagoryBarWarp = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(205, 205, 205);
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;

const SelectStyle = styled(Select)`
  width: 200px;
  height: 40px;
  margin-right: 20px;
`;

const AreaOptions = [
  { value: "모든 지역", label: "모든 지역" },
  { value: "서울", label: "서울" },
  { value: "강원도", label: "강원도" },
  { value: "경기도", label: "경기도" },
  { value: "경상도", label: "경상도" },
  { value: "충청도", label: "충청도" },
  { value: "전라도", label: "전라도" },
  { value: "제주", label: "제주" },
];
const TypeOptions = [
  { value: "모든 장르", label: "모든 장르" },
  { value: "음악", label: "음악" },
  { value: "음식", label: "음식" },
  { value: "전통", label: "전통" },
  { value: "예술", label: "예술" },
  { value: "기타", label: "기타" },
];
const NowOptions = [
  { value: "모든 축제", label: "모든 축제" },
  { value: "진행 예정", label: "진행 예정" },
  { value: "진행중", label: "진행중" },
  { value: "지난 축제", label: "지난 축제" },
];

const data = [
  { id: 1, area: "서울", type: "음악", status: "진행 예정" },
  { id: 2, area: "강원도", type: "음식", status: "진행중" },
  { id: 3, area: "경기도", type: "전통", status: "지난 축제" },
];

export default function CatagoryBar() {
  const placesData = usePlaces();

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedNow, setSelectedNow] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const handleAreaChange = (selectedOption) => {
    setSelectedArea(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const handleNowChange = (selectedOption) => {
    setSelectedNow(selectedOption);
  };

  useEffect(() => {
    let updatedData = placesData;
    console.log(placesData);

    if (selectedArea && selectedArea.value !== "모든 지역") {
      updatedData = updatedData.filter(
        (item) => item.area === selectedArea.value
      );
    }

    if (selectedType && selectedType.value !== "모든 장르") {
      updatedData = updatedData.filter(
        (item) => item.type === selectedType.value
      );
    }

    if (selectedNow && selectedNow.value !== "모든 축제") {
      updatedData = updatedData.filter(
        (item) => item.status === selectedNow.value
      );
    }

    setFilteredData(updatedData);
    console.log(updatedData);
  }, [selectedArea, selectedType, selectedNow]);

  return (
    <>
      <CatagoryBarWarp>
        <SelectStyle
          value={selectedArea}
          onChange={handleAreaChange}
          options={AreaOptions}
          placeholder="지역"
        />
        <SelectStyle
          value={selectedType}
          onChange={handleTypeChange}
          options={TypeOptions}
          placeholder="장르"
        />
        <SelectStyle
          value={selectedNow}
          onChange={handleNowChange}
          options={NowOptions}
          placeholder="진행 상황"
        />
      </CatagoryBarWarp>
    </>
  );
}
