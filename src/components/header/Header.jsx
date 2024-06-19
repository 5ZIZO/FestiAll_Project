import React, { useEffect } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/store';
import useFileterStore from '../../store/useFileterStore'; // Zustand store import
import Button from '../Button/Button';
import checkSignIn from '../authentication/checkSignIn';
import * as S from './Header.styled';
import logo from './logo.png';

const Header = () => {
  const param = useLocation();
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  const setSearchTerm = useFileterStore((state) => state.setSearchTerm); // Zustand action 가져오기

  useEffect(() => {
    checkSignIn();
  }, []);

  const handleLogoutAndCheckSignIn = async () => {
    await handleLogout();
    checkSignIn();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.search.value); // 검색어를 Zustand에 저장
  };

  return (
    <S.HeaderContainer>
      <S.LeftSide>
        <S.Logo src={logo} onClick={() => navigate('/')} />
        {param.pathname === '/' && (
          <S.SearchForm onSubmit={handleSearch}>
            <S.SearchInput id="search" name="search" placeholder="축제명으로 검색이 가능합니다." />
            <button type="submit">
              <IoMdSearch />
            </button>
          </S.SearchForm>
        )}
      </S.LeftSide>
      <S.RightSide>
        {isSignedIn ? (
          <Button bgColor={'red'} onClick={handleLogoutAndCheckSignIn}>
            로그아웃
          </Button>
        ) : (
          <>
            <S.Nav to="/signup">회원가입</S.Nav>
            <S.Nav to="/login">로그인</S.Nav>
          </>
        )}
      </S.RightSide>
    </S.HeaderContainer>
  );
};

export default Header;
