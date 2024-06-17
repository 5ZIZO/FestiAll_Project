import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await axiosInstance.post('/auth/v1/signup', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.error) throw response.error;
      alert('회원가입 성공');
    } catch (error) {
      alert('회원가입 실패: ' + error.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default SignUp;