import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/store";
import Button from "../Button/Button";
import checkSignIn from "../authentication/checkSignIn";
import * as S from "./Header.styled";
import logo from "./logo.png";
import searchIcon from "./search.png";

const header = () => {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const isSignedIn = useAuthStore((state) => state.isSignedIn);

  useEffect(() => {
    checkSignIn();
  }, []);

  const handleLogoutAndCheckSignIn = async () => {
    await handleLogout();
    checkSignIn();
  };

  return (
    <S.HeaderContainer>
      <S.LeftSide>
        <S.Logo src={logo} onClick={() => navigate("/")} />
        <S.SearchInput
          type="search"
          placeholder="축제명으로 검색이 가능합니다."
        />
        <S.SearchButton src={searchIcon} />
      </S.LeftSide>
      <S.RightSide>
        {isSignedIn ? (
          <Button bgColor={"red"} onClick={handleLogoutAndCheckSignIn}>
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

export default header;
