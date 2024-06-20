import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../api/supabaseClient';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  height: 100vh;
  margin: 1.5rem;

  @media screen and (min-width: 1024px) {
    height: 100vh;
    overflow: hidden;
    .login__content {
      grid-template-columns: repeat(2, max-content);
      justify-content: center;
      align-items: center;
      margin-left: 10rem;
    }
  }
`;

export const Content = styled.div`
  display: grid;
`;

export const ImgWrapper = styled.div`
  justify-self: center;

  img {
    width: 250px;
    // margin-top: 1rem;
  }
`;

export const Forms = styled.div`
  position: absolute;
  top: 24rem;
  width: 100%;
  height: 368px;
  @media screen and (min-width: 576px) {
    width: 348px;
    justify-self: center;
  }
`;

export const Form = styled.form`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #f2f2f2;
  padding: 2rem 1rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(35, 0, 77, 0.2);
  animation-duration: 0.4s;
  animation-name: animateLogin;

  &.none {
    display: none;
  }

  &.block {
    display: block;
  }
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export const InputBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.5rem;
  padding: 1.125rem 1rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.5rem;
`;

export const Icon = styled.i`
  font-size: 1.5rem;
  color: #588157;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  font-size: 0.938rem;
  font-weight: 700;
  color: #23004d;
  width: 100%;

  &::placeholder {
    font-size: 0.938rem;
    font-family: 'Open Sans', sans-serif;
    color: #a49eac;
  }
`;

export const Button = styled.button`
  display: block;
  padding: 1rem;
  margin: 2rem 0;
  background-color: #588157;
  color: #fff;
  font-weight: 600;
  text-align: center;
  border-radius: 0.5rem;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  margin: 20px auto;
  width: 100%;

  &:hover {
    background-color: #65bf97;
  }

  &:disabled {
    background-color: #a5a5a5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin: 10px;
`;

export const KakaoButton = styled.img`
  display: block;
  margin: 10px auto;
  cursor: pointer;
  width: 100%;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    let errorMessage = '';

    if (!validateEmail(email)) {
      errorMessage = '이메일 형식을 확인해주세요';
    } else if (password.length < 6) {
      errorMessage = '비밀번호는 6자리 이상으로 설정해주세요';
    } else if (password !== confirmPassword) {
      errorMessage = '비밀번호 재입력이 일치하지 않습니다';
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });

      if (error) {
        const signUpError = `회원가입 중 에러가 발생했습니다.: ${error.message}`;
        setError(signUpError);
        console.error(signUpError);
      } else {
        alert(`${data.user.email} 님 회원가입을 축하드립니다!`);
        console.log('회원가입 완료:', data);
        navigate('/');
      }
    } catch (error) {
      const signUpError = `회원가입 중 에러가 발생했습니다.: ${error.message}`;
      // Todo: 에러메시지 스위치문
      setError(signUpError);
      console.error(signUpError);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setError('이메일 형식을 확인해주세요');
    } else {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  useEffect(() => {
    // 버튼 활성화/비활성화 상태 업데이트
    if (email && password && confirmPassword && !error && password === confirmPassword && validateEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, confirmPassword, error]);

  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    })
  }

  return (
    <Container>
      <Content>
        <ImgWrapper>
          <img
            src="https://kmfvncclriiektxphias.supabase.co/storage/v1/object/public/images/public/Festiall_Model.png?t=2024-06-18T03%3A56%3A18.517Z"
            alt="user login"
          />
        </ImgWrapper>
        <Forms>
          <Form className="block" id="login-up" onSubmit={handleSignUp}>
            <Title>회원가입 페이지</Title>
            <InputBox>
              <Icon className="bx bx-at"></Icon>
              <Input type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
            </InputBox>
            <InputBox>
              <Icon className="bx bx-lock"></Icon>
              <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
            </InputBox>
            <InputBox>
              <Icon className="bx bx-lock"></Icon>
              <Input
                type="password"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </InputBox>
            {password !== confirmPassword && confirmPassword && (
              <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={isButtonDisabled}>
              회원가입
            </Button>
            <KakaoButton src="src/assets/kakao_login_medium_wide.png" onClick={signInWithKakao} />
          </Form>
        </Forms>
      </Content>
    </Container>
  );
};

export default SignUp;
