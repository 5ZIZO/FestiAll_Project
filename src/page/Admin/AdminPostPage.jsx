import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


function AdminPostPage() {
    const admin = true; //로그인 유저가 관리자 권한이 있으면 관리자페이지로 접근가능(supabase에서 권한 주기/기본값을 null)
    const navigate = useNavigate()
    useEffect(() => {
        if (!admin) {
            navigate('/');
            alert("관리자 권한이 아닙니다!");
        }
    }, [admin])

    return (
        <StWriteWrapper>
            <StForm>
                {/* <StFestivalImg >이미지 들어가야함</StFestivalImg> */}
                <StInputForm>
                    <StTopForm>
                        <StFestival
                            type="text"
                            placeholder="행사명"
                        />
                    </StTopForm>
                <StDateForm>
                    <StDateName>행사일정</StDateName>
                    <StFestivalDate type="date"/>
                    <StFestivalDate type="date"/>
                </StDateForm>
                    <StTopForm>
                        <StFestival
                            type="text"
                            placeholder="행사주소"
                        />
                        <StFestival
                            type="text"
                            placeholder="이용금액"
                        />
                        <StFestival
                            type="text"
                            placeholder="행사종류"
                        />
                    </StTopForm>
                    <StDescription
                        type="text"
                        placeholder="행사 상세 내용"
                    />
                </StInputForm>
                <StButtonDiv>
                    <StButton >등록</StButton>
                    <StButton >취소</StButton>
                </StButtonDiv>
            </StForm>
        </StWriteWrapper>
    );
}


export default AdminPostPage

const StWriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  margin: 30px;
  height: 75vh;
`;

const StForm = styled.form`
  width: 50%;
`;

// const StFestivalImg = styled.img`
  
// `;


const StTopForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StFestival = styled.input`
  width: 70%;
  padding: 15px;
  margin: auto;
  margin-bottom: 15px;
  font-size: 15px;
  border-radius: 20px;
  border: 1px solid gray;
`;

const StDateForm = styled.div`
  display: flex;
  justify-content: center;
`;

const StDateName =styled.div`
  padding: 15px;
  margin: 20px 10px;
  font-size: 15px;
`;

const StFestivalDate = styled.input`
  width: 28%;
  padding: 15px;
  margin: 10px;
  font-size: 15px;
  border-radius: 20px;
  border: 1px solid gray;
`;

const StDescription = styled.textarea`
  padding: 20px;
  border-radius: 20px;
  border: 1px solid gray;
  font-size: 14px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: auto;
  min-height: 100px;
  resize: vertical;
  display: block;
`;

const StInputForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
`;

const StButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const StButton = styled.button`
  border-radius: 26px;
  border: none;
  color: white;
  font-weight: semi-bolder;
  font-size: 15px;
  background: #588157;
  margin: 5px;
  padding: 10px 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #3D593C;
    text-decoration: none;
  }
`;