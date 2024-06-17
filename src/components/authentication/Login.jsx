import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Login = ({ setAccessToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

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
    </div>
  );
};

export default Login;