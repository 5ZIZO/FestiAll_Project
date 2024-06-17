import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import useAuthStore from '../../store/store';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axiosInstance.post('/auth/v1/token?grant_type=password', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.error) throw response.error;
      setAccessToken(response.data.access_token);
      alert('로그인 성공');
      navigate('/');
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  const handleLogout = () => {
    clearAccessToken();
    alert('로그아웃 성공');
  };

  // handleLogout을 다른 컴포넌트에서 사용할 수 있도록 전역 상태에 저장
  useAuthStore.setState({ handleLogout });

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Authentication;