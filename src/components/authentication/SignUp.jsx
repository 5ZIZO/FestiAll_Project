import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../api/supabaseClient';
import styled from 'styled-components';

const Container = styled.div`
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

const Content = styled.div`
  display: grid;
`;

const ImgWrapper = styled.div`
  justify-self: center;

  img {
    width: 250px;
    margin-top: 3rem;
  }
`;

const Forms = styled.div`
  position: relative;
  height: 368px;
  @media screen and (min-width: 576px) {
    width: 348px;
    justify-self: center;
  }
`;

const Form = styled.form`
  position: absolute;
  bottom: 5rem;
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

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.5rem;
  padding: 1.125rem 1rem;
  background-color: #fff;
  margin-top: 1rem;
  border-radius: 0.5rem;
`;

const Icon = styled.i`
  font-size: 1.5rem;
  color: #588157;
`;

const Input = styled.input`
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

const Button = styled.button`
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
  margin-left: auto;

  &:hover {
    background-color: #65bf97;
  }

  &:disabled {
    background-color: #a5a5a5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const SignUp = () => {
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
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
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
        password: password,
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
      // 에러메시지 스위치문
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
    setError('');  // 에러 메시지 초기화
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError('');  // 에러 메시지 초기화
  };

  useEffect(() => {
    // 버튼 활성화/비활성화 상태 업데이트
    if (email && password && confirmPassword && !error && password === confirmPassword && validateEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, confirmPassword, error]);

  return (
    <Container>
      <Content>
        <ImgWrapper>
          <img src="https://kmfvncclriiektxphias.supabase.co/storage/v1/object/public/images/public/Festiall_Model.png?t=2024-06-18T03%3A56%3A18.517Z" alt="user login" />
        </ImgWrapper>
        <Forms>
          <Form className="block" id="login-up" onSubmit={handleSignUp}>
            <Title>회원가입 페이지</Title>
            <InputBox>
              <Icon className='bx bx-at'></Icon>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
              />
            </InputBox>
            <InputBox>
              <Icon className='bx bx-lock'></Icon>
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
              />
            </InputBox>
            <InputBox>
              <Icon className='bx bx-lock'></Icon>
              <Input
                type="password"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </InputBox>
            {password !== confirmPassword && confirmPassword && (
              <ErrorMessage>
                비밀번호가 일치하지 않습니다
              </ErrorMessage>
            )}
            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
            <Button type="submit" disabled={isButtonDisabled}>
              회원가입
            </Button>
          </Form>
        </Forms>
      </Content>
    </Container>
  );
};

export default SignUp;