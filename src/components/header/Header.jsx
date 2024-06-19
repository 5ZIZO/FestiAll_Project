import React, { useEffect } from 'react'
import * as S from "./Header.styled"
import logo from "./logo.png"
import searchIcon from "./search.png"
import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/store'
import checkSignIn from '../authentication/checkSignIn'

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
                <S.SearchInput type="search" placeholder=" Search..." />
                <S.SearchButton src={searchIcon} />
            </S.LeftSide>
            <S.RightSide>
                {isSignedIn ? (
                    <Button bgColor={"red"} onClick={handleLogoutAndCheckSignIn}>로그아웃</Button>
                ) : (
                    <>
                        <Button onClick={() => navigate("/introduction")}>회원가입</Button>
                        <Button bgColor={"#495057"} onClick={() => navigate("/login")}>로그인</Button>
                    </>
                )}
            </S.RightSide>
        </S.HeaderContainer>
    );
}

export default header