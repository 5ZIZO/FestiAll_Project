import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import useAuthStore from '../../store/store';
import useFileterStore from '../../store/useFileterStore'; // Zustand store import
import Button from '../Button/Button';
import checkSignIn from '../authentication/checkSignIn';
import { getCurrentUser } from './../api/api';
import * as S from './Header.styled';
import logo from './logo.png';

const Header = () => {
  const param = useLocation();
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);
  const [userId, setUserId] = useState(null);
  const setSearchTerm = useFileterStore((state) => state.setSearchTerm); // Zustand action 가져오기
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await getCurrentUser();
        console.log('userData:', userData.email);
        setUserId(userData.email);
        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoadingUser(false);
      }
    }

    if (isSignedIn) {
      setIsLoadingUser(true);
      getUserData();
    }
    console.log("isSignedIn:",isSignedIn)
    checkSignIn();
  }, [isSignedIn]);

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
        {isSignedIn === null || isLoadingUser ? (
          <></>
        ) : isSignedIn === false ? (
          <>
            <S.Nav to="/login">로그인</S.Nav>
            <S.Nav to="/signup">회원가입</S.Nav>
          </>
        ) : (
          <>
            <S.Nav to={userId === 'admin@admin.admin' ? '/adminpage' : '/mypage'}>
              {userId === 'admin@admin.admin' ? '관리자 페이지' : '마이 페이지'}
            </S.Nav>
            <Button bgColor={'red'} onClick={handleLogoutAndCheckSignIn}>
              로그아웃
            </Button>
          </>
        )}
      </S.RightSide>
    </S.HeaderContainer>
  );
};

export default Header;
