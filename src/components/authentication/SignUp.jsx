import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    const {email, password, displayName, age, first_name} = formData;

    try {
      // Supabase auth 테이블에 사용자 등록
      const { data: signUpData, error: signUpError } = await axiosInstance.post('/auth/v1/signup', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (signUpError) throw signUpError;

      // Users 테이블에 추가 정보 삽입
      const { data: insertData, error: insertError } = await axiosInstance.post('/rest/v1/Users', {
        auth_id: signUpData.user.id, // Supabase auth 테이블에서 생성된 유저의 UUID
        email,
        // is_admin: false, // 자동삽입 되게 했음
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
      });

      if (insertError) throw insertError;

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
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default SignUp;