import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../api/supabaseClient';
import signInWithKakao from './signInWithKakao';
import {
  Button,
  Container,
  Content,
  ErrorMessage,
  Form,
  Forms,
  Icon,
  ImgWrapper,
  Input,
  InputBox,
  Title,
  KakaoButton
} from './auth.styled';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let errorMessage = '';

    if (!validateEmail(email)) {
      errorMessage = '이메일 형식을 확인해주세요.';
    } else if (password.length < 6) {
      errorMessage = '비밀번호는 6자리 이상이어야 합니다.';
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        const signUpError = `로그인 중 에러가 발생했습니다.: ${error.message}`;
        setError(signUpError);
        console.error(signUpError);
      } else {
        alert(`${data.user.email} 님의 방문을 환영합니다!`);
        navigate('/');
      }
    } catch (error) {
      const loginError = `로그인 중 에러가 발생했습니다.: ${error.message}`;
      setError(loginError);
      console.error(loginError);
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

  useEffect(() => {
    // 버튼 활성화/비활성화 상태 업데이트
    if (email && password && !error && validateEmail(email)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password, error]);

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
          <Form className="block" id="login-up" onSubmit={handleLogin}>
            <Title>로그인 페이지</Title>
            <InputBox>
              <Icon className="bx bx-at"></Icon>
              <Input type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
            </InputBox>
            <InputBox>
              <Icon className="bx bx-lock"></Icon>
              <Input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
            </InputBox>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit" disabled={isButtonDisabled}>
              이메일로 로그인
            </Button>
            <KakaoButton src="src/assets/kakao_login_medium_wide.png" onClick={signInWithKakao} />
          </Form>
        </Forms>
      </Content>
    </Container>
  );
};

export default Login;
