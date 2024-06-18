import React from 'react'
import * as S from "./Header.styled"
import logo from "./logo.png"
import searchIcon from "./search.png"
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import useLogout from '../../hooks/useLogout'

const header = () => {
    const navigate = useNavigate();
    const handleLogout = useLogout();

    return (
        <S.HeaderContainer>
            <S.LeftSide>
                <S.Logo src={logo} onClick={() => navigate("/")} />
                <S.SearchInput type="search" placeholder=" Search..." />
                <S.SearchButton src={searchIcon} />
            </S.LeftSide>
            <S.RightSide>
                <Button onClick={() => navigate("/signup")}>회원가입</Button>
                <Button bgColor={"#495057"} onClick={() => navigate("/login")}>로그인</Button>
                <Button bgColor={"red"} onClick={handleLogout}>로그아웃</Button>
            </S.RightSide>
        </S.HeaderContainer>
    )
}

export default header