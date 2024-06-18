
import { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../../components/api/supabaseClient";
import { v4 as uuid } from "uuid";

function AdminPostPage() {
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');
  const [festName, setFestName] = useState('');
  const [stDate, setStDate] = useState('');
  const [edDate, setEdDate] = useState('');
  const [stTime, setStTime] = useState('');
  const [edTime, setEdTime] = useState('');
  const [category, setCategory] = useState('');
  const [pricing, setPricing] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const checkUser = async() => {
      try {
        const {
          data:{user}, 
          error
        } = await supabase.auth.getUser();

        setUserId(user.id);

        if (error) {
          throw error;
        }

        console.log("잘 불러왔어요!", user.id);
      } catch (error) {
        console.error("실패", error.message);
      }
    }
    checkUser();
  },[]);
  console.log("userid 상태", userId);

  const newImage = (e) => {
    const file = e.target.files[0];
    if(file) {
      handleImgUpload();
    }
  };

  const fileSelect = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImgUpload = async (file) => {
    if (!file) return;  //이미지파일 없으면 함수 끝

    const uniqueImgName = `${uuid()}_${file.name}`;
  
    try{
      const {data, error} = await supabase.storage.from('images/places').upload(uniqueImgName, file);
      if(error) throw error;

      const {publicUrl} = supabase.storage.from('images/places').getPublicUrl(uniqueImgName).data;
      if(data) {
        setImage(data.publicUrl)
      }
    } catch (error) {
      console.error("이미지 업로드 실패", error.message);
    }
  } 

  const handleSubmit = async (e) => {
      e.preventDefault()
      const { data } = await supabase
    .from('places')
    .insert([
        { 
            name: festName, 
            image,
            st_date: stDate,
            ed_date: edDate,
            st_time: stTime,
            ed_time: edTime,
            category,
            pricing,
            address,
            description,
            user_id: userId,
        },
    ])
    alert("등록이 완료되었습니다!");
    setUserId('');
    setFestName('');
    setStDate('');
    setEdDate('');
    setStTime('');
    setEdTime('');
    setCategory('');
    setPricing('');
    setAddress('');
    setDescription('');
  }


  return (
    <StWriteWrapper>
      <StForm onSubmit={handleSubmit}>

        <ImageUpload onClick={fileSelect}>
        <input type="file" onChange={newImage}></input>
        </ImageUpload>
        <StInputForm>
          <StTopForm>
            <StFestival
              type="text"
              placeholder="행사명"
              value={festName}
              onChange={(e) => setFestName(e.target.value)}
            />
          </StTopForm>
          <StDateForm>
            <StDateName>행사 시작일</StDateName>
            <StFestivalDate 
              type="date" 
              value={stDate}
              onChange={(e) => setStDate(e.target.value)}/>
            <StFestivalDate 
              type="time" 
              value={stTime}
              onChange={(e) => setStTime(e.target.value)}/> 
          </StDateForm>
          <StDateForm>
            <StDateName>행사 종료일</StDateName>
            <StFestivalDate 
              type="date" 
              value={edDate}
              onChange={(e) => setEdDate(e.target.value)}/> 
            <StFestivalDate 
              type="time" 
              value={edTime}
              onChange={(e) => setEdTime(e.target.value)}/> 
          </StDateForm>
          <StTopForm>
            <StFestival
              type="text"
              placeholder="행사주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <StFestival
              type="text"
              placeholder="이용금액"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            />
            <StFestival
              type="text"
              placeholder="행사종류"
              value={category}
              onChange={(e) => setCategory(e.target.value)} 
            />
          </StTopForm>
          <StDescription
            type="text"
            placeholder="행사 상세 내용"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

const ImageUpload = styled.div`
  max-width: 80%;
  max-height: 80%;
  margin-bottom: 30px;
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