import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllPlaces, postPlace } from "../../components/api/places.api";
import { useCreatePost } from "../../hooks/usePostQuerys";


function AdminPostPage() {
  // const admin = true; //로그인 유저가 관리자 권한이 있으면 관리자페이지로 접근가능(supabase에서 권한 주기/기본값을 null)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (!admin) {
  //     navigate('/');
  //     alert("관리자 권한이 아닙니다!");
  //   }
  // }, [admin])

  const {mutate: createPost} = useCreatePost();
  
  const initialPost = {
    image: "",
    post_name: "",
    st_date: "",
    ed_date: "",
    st_time: "",
    ed_time: "",
    category: "",
    pricing: "",
    address: "",
    description: "",
  } 

  const [postData, setPostData] = useState(initialPost);

  const { data } = useQuery({ queryKey: ["places"], queryFn: getAllPlaces });
  console.log("data 불러와지나요?", data);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(postData);
    await createPost(postData, {
      onSuccess: () => {
        console.log("행사 등록 완료")
        setPostData(initialPost)
      }
    })
  };

  return (
    <StWriteWrapper>
      <StForm onSubmit={handleSubmit}>
        <ImageUpload src={postData.image} />
        <StInputForm>
          <StTopForm>
            <StFestival
              type="text"
              placeholder="행사명"
              value={postData.post_name}
              onChange={(e) => setPostData({...postData, post_name: e.target.value})}
            />
          </StTopForm>
          <StDateForm>
            <StDateName>행사 시작일</StDateName>
            <StFestivalDate 
              type="date" 
              value={postData.st_date}
              onChange={(e) => setPostData({...postData, st_date: e.target.value})}/>
            <StFestivalDate 
              type="time" 
              value={postData.st_time}
              onChange={(e) => setPostData({...postData, st_time: e.target.value})}/> 
          </StDateForm>
          <StDateForm>
            <StDateName>행사 종료일</StDateName>
            <StFestivalDate 
              type="date" 
              value={postData.ed_date}
              onChange={(e) => setPostData({...postData, ed_date: e.target.value})}/>
            <StFestivalDate 
              type="time" 
              value={postData.ed_time}
              onChange={(e) => setPostData({...postData, ed_time: e.target.value})}/> 
          </StDateForm>
          <StTopForm>
            <StFestival
              type="text"
              placeholder="행사주소"
              value={postData.address}
              onChange={(e) => setPostData({...postData, address: e.target.value})}
            />
            <StFestival
              type="text"
              placeholder="이용금액"
              value={postData.pricing}
              onChange={(e) => setPostData({...postData, pricing: e.target.value})}
            />
            <StFestival
              type="text"
              placeholder="행사종류"
              value={postData.category}
              onChange={(e) => setPostData({...postData, category: e.target.value})}
            />
          </StTopForm>
          <StDescription
            type="text"
            placeholder="행사 상세 내용"
            value={postData.description}
            onChange={(e) => setPostData({...postData,description: e.target.value})}
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

const ImageUpload = styled.img`
  max-width: 80%;
  max-height: 80%;
  margin-bottom: 30px;
  background-color: red;
`;

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

const StDateName = styled.div`
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