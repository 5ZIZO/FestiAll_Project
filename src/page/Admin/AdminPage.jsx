import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinners from '../../components/Loading/LoadingSpinners';
import supabase from '../../components/api/supabaseClient';
import useDebounce from '../../hooks/useDebounce';
import usePlaces from '../../hooks/usePlaces';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  height: 100%;
  min-height: calc(100vh - 80px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #2d5f2e;
`;

const SearchBar = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 50%;
  margin: 0 auto;
`;

const EventList = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  cursor: pointer;
`;

const EventDetails = styled.div`
  flex: 1;
  margin-right: 20px;
  font-size: 1.1em;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #2d5f2e;
  color: white;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    background-color: #3a7741;
  }
`;

const AdminPage = () => {
  const { data, error, isLoading } = usePlaces();
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000); // apply useDebounce
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinners />;
  }
  if (error) return <Container>데이터 불러오다 에러가 났습니다.</Container>;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlaces = places.filter((place) => place.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));

  const handleItemClick = (postId) => {
    navigate(`/adminpost/${postId}`);
  };

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      try {
        const { error } = await supabase.from('places').delete().eq('post_id', postId);

        if (error) {
          throw error;
        }

        alert('삭제되었습니다.');
        setPlaces(places.filter((place) => place.post_id !== postId));
      } catch (error) {
        console.error('삭제 실패:', error.message);
        alert(`삭제에 실패하였습니다: ${error.message}`);
      }
    }
  };

  const handlePostPage = () => {
    navigate(`/adminpost`);
  };

  return (
    <Container>
      <Header>
        <Logo>관리자 페이지</Logo>
        <SearchBar
          type="text"
          placeholder="찾을 행사 제목을 입력하세요."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button onClick={handlePostPage}>게시글 작성</Button>
      </Header>
      <EventList>
        {filteredPlaces.map((place) => (
          <EventItem key={place.post_id}>
            <EventDetails onClick={() => handleItemClick(place.post_id)}>{place.name}</EventDetails>
            <ButtonGroup>
              <Button onClick={() => handleItemClick(place.post_id)}>수정</Button>
              <Button onClick={() => handleDelete(place.post_id)}>삭제</Button>
            </ButtonGroup>
          </EventItem>
        ))}
      </EventList>
    </Container>
  );
};

export default AdminPage;
