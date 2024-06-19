import { useEffect, useRef, useState } from 'react';
import supabase from '../../components/api/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import usePlaces from '../../hooks/usePlaces';
import checkSignIn from '../../components/authentication/checkSignIn';
import styled from 'styled-components';

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
  display: flex;
  justify-content: center;
  width: 70%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 20px;
  border: 1px solid gray;
  cursor: pointer;

  input {
    display: none;
  }
`;

// ToDo : 이 부분이 원래 인풋임. 이상하게 반응 제대로 안 함. 바로 위 컴포넌트와 비교
// const ImageUpload = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 70%;
//   padding: 15px;
//   margin: auto;
//   margin-bottom: 10px;
//   font-size: 15px;
//   border-radius: 20px;
//   border: 1px solid gray;
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
  margin-bottom: 10px;
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

const StAddressForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StFestAddress = styled.button`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  cursor: pointer;
  background: ${(props) => (props.selected ? '#ADADAD' : '#E0E0E0')};
  transition: background-color 0.3s ease;
  &:hover {
    background: #adadad;
    text-decoration: none;
  }
`;

const StFestCategory = styled.button`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  cursor: pointer;
  background: ${(props) => (props.selected ? '#ADADAD' : '#E0E0E0')};
  transition: background-color 0.3s ease;
  &:hover {
    background: #adadad;
    text-decoration: none;
  }
`;

const StCategoryForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
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
    background: #3d593c;
    text-decoration: none;
  }
`;

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
  const [region, setRegion] = useState('');

  const { postId } = useParams();
  const isEdit = Boolean(postId); // 수정용 불리언 값
  const { data: places, error, isLoading } = usePlaces();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const isSignedIn = await checkSignIn();
      if (isSignedIn) {
        console.log('사용자가 로그인되었습니다.');
        const {
          data: { user }
        } = await supabase.auth.getUser();
        if (user && user.id) {
          setUserId(user.id);
        } else {
          console.error('유효하지 않은 사용자 ID입니다.');
        }
      } else {
        console.error('사용자가 로그인되지 않았습니다.');
      }
    };
    fetchUserData();
  }, []);

  // 아래 두 개 수정용 상태 변경 함수
  useEffect(() => {
    if (places && postId) {
      const selectedPost = places.find((place) => place.post_id === postId);
      if (selectedPost) {
        setImage(selectedPost.image);
        setFestName(selectedPost.name);
        setStDate(selectedPost.st_date);
        setEdDate(selectedPost.ed_date);
        setStTime(selectedPost.st_time);
        setEdTime(selectedPost.ed_time);
        setCategory(selectedPost.category);
        setPricing(selectedPost.pricing);
        setAddress(selectedPost.address);
        setDescription(selectedPost.description);
        setRegion(selectedPost.region);
      }
    }
  }, [places, postId]);

  const resetForm = () => {
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
    setRegion('');
    setImage('');

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  useEffect(() => {
    if (image && typeof image !== 'string' && image instanceof File) {
      console.log('이미지 선택됨 =>', image);
      handleImgUpload(image);
    }
  }, [image]);

  const newImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      handleImgUpload(file);
    }
  };

  const fileRef = useRef(null);

  const fileSelect = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleImgUpload = async (file) => {
    console.log('file:', file);

    if (!file) return; // 이미지파일 없으면 함수 끝

    const uniqueImgName = `places/${Date.now()}_${file.name}`;

    try {
      const { data, error } = await supabase.storage.from('images').upload(uniqueImgName, file);
      if (error) throw error;

      const { publicUrl } = supabase.storage.from('images').getPublicUrl(uniqueImgName).data;
      if (!publicUrl) throw new Error('이미지 유알엘을 못 가져 왔음');

      console.log('퍼블릭유알엘임 =>', publicUrl);
      setImage(publicUrl);
      console.log(publicUrl);
    } catch (error) {
      console.error('이미지 업로드 실패', error.message);
      alert(`이미지 업로드에 실패하였습니다: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('사용자 ID가 설정되지 않았습니다. 다시 로그인 해주세요.');
      return;
    }

    try {
      let data, error;

      if (isEdit) {
        // 수정 요청
        ({ data, error } = await supabase
          .from('places')
          .update({
            name: festName,
            image,
            st_date: stDate,
            ed_date: edDate,
            st_time: stTime,
            ed_time: edTime,
            category,
            pricing,
            address,
            region,
            description
          })
          .eq('post_id', postId)
          .eq('user_id', userId));
      } else {
        // 등록 요청
        ({ data, error } = await supabase.from('places').insert([
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
            region,
            description,
            user_id: userId
          }
        ]));
      }

      if (error) throw error;

      alert(isEdit ? '수정이 완료되었습니다!' : '등록이 완료되었습니다!');
      resetForm();
      navigate('/');
    } catch (error) {
      console.error(isEdit ? '게시글 수정 실패' : '게시글 등록 실패', error.message);
      alert(`게시글 ${isEdit ? '수정' : '등록'}에 실패하였습니다: ${error.message}`);
    }
  };

  const handleCancel = () => {
    const isConfirmed = window.confirm('정말 취소하시겠습니까?');
    if (isConfirmed) {
      alert('취소되었습니다.');
      navigate('/');
    }
  };

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러났습니다</div>;

  return (
    <StWriteWrapper>
      <StForm onSubmit={handleSubmit}>
        <StInputForm>
          <ImageUpload onClick={fileSelect}>
            <input type="file" onChange={newImage} ref={fileRef} />
          </ImageUpload>

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
            <StFestivalDate type="date" value={stDate} onChange={(e) => setStDate(e.target.value)} />
            <StFestivalDate type="time" value={stTime} onChange={(e) => setStTime(e.target.value)} />
          </StDateForm>

          <StDateForm>
            <StDateName>행사 종료일</StDateName>
            <StFestivalDate type="date" value={edDate} onChange={(e) => setEdDate(e.target.value)} />
            <StFestivalDate type="time" value={edTime} onChange={(e) => setEdTime(e.target.value)} />
          </StDateForm>

          <StAddressForm>
            <StFestAddress type="button" selected={region === '서울'} onClick={() => setRegion('서울')}>
              서울
            </StFestAddress>
            <StFestAddress type="button" selected={region === '강원도'} onClick={() => setRegion('강원도')}>
              강원도
            </StFestAddress>
            <StFestAddress type="button" selected={region === '경기도'} onClick={() => setRegion('경기도')}>
              경기도
            </StFestAddress>
            <StFestAddress type="button" selected={region === '경상도'} onClick={() => setRegion('경상도')}>
              경상도
            </StFestAddress>
            <StFestAddress type="button" selected={region === '충청도'} onClick={() => setRegion('충청도')}>
              충청도
            </StFestAddress>
            <StFestAddress type="button" selected={region === '전라도'} onClick={() => setRegion('전라도')}>
              전라도
            </StFestAddress>
            <StFestAddress type="button" selected={region === '제주'} onClick={() => setRegion('제주')}>
              제주
            </StFestAddress>
          </StAddressForm>

          <StTopForm>
            <StFestival //이름 수정해야함
              type="text"
              placeholder="이용금액"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            />
          </StTopForm>

          <StCategoryForm>
            <StFestCategory type="button" selected={category === '음악'} onClick={() => setCategory('음악')}>
              음악
            </StFestCategory>
            <StFestCategory type="button" selected={category === '음식'} onClick={() => setCategory('음식')}>
              음식
            </StFestCategory>
            <StFestCategory type="button" selected={category === '전통'} onClick={() => setCategory('전통')}>
              전통
            </StFestCategory>
            <StFestCategory type="button" selected={category === '예술'} onClick={() => setCategory('예술')}>
              예술
            </StFestCategory>
            <StFestCategory type="button" selected={category === '기타'} onClick={() => setCategory('기타')}>
              기타
            </StFestCategory>
          </StCategoryForm>

          <StDescription
            type="text"
            placeholder="행사 상세 내용"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </StInputForm>

        <StButtonDiv>
          <StButton>등록</StButton>
          <StButton onClick={handleCancel}>취소</StButton>
        </StButtonDiv>
      </StForm>
    </StWriteWrapper>
  );
}

export default AdminPostPage;
