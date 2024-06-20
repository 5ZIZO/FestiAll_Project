import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../components/api/supabaseClient';
import checkSignIn from '../../components/authentication/checkSignIn';
import usePlaces from '../../hooks/usePlaces';

const StWriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 100%;
  padding: 40px 0;
`;

const StForm = styled.form`
  width: 700px;
`;

const ImageUploadButton = styled.label`
  display: flex;
  justify-content: center;
  width: 100%;
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

const StTopForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StFestival = styled.input`
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StDateForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDateName = styled.div`
  padding: 15px;
  margin-right: 10px;
  font-size: 15px;
`;

const StFestivalDate = styled.input`
  width: 45%;
  padding: 0px 15px;
  height: 40px;
  margin: 10px 2.5%;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StDescription = styled.textarea`
  padding: 20px;
  border-radius: 5px;
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
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* background-color: #ddd; */
  > h3 {
    color: #2d5f2e;
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    padding-bottom: 20px;
  }
`;

const StAddressForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StFestiAddress = styled.button`
  border: ${(props) => (props.selected ? 0 : '1px solid gray')};
  border-radius: 20px;
  height: 40px;
  padding: ${(props) => (props.selected ? '0 21px' : '0 20px')};
  margin: 5px;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  background: ${(props) => (props.selected ? '#333' : '#fff')};
  transition: background-color 0.3s ease;
  &:hover {
    background: #333;
    color: #fff;
    border: 0;
    padding: 0 21px;
    text-decoration: none;
  }
`;

const StFestiDetailAddress = styled.input`
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StFestiPricing = styled.input`
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StFestiCategory = styled.button`
  border: ${(props) => (props.selected ? 0 : '1px solid gray')};
  border-radius: 20px;
  height: 40px;
  padding: ${(props) => (props.selected ? '0 21px' : '0 20px')};
  margin: 5px;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  background: ${(props) => (props.selected ? '#333' : '#fff')};
  transition: background-color 0.3s ease;
  &:hover {
    background: #333;
    color: #fff;
    border: 0;
    padding: 0 21px;
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
  const [category, setCategory] = useState('음악');
  const [pricing, setPricing] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('서울');
  const [previewImage, setPreviewImage] = useState();

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
        setPreviewImage(selectedPost.image);
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
      createImagePreview(file);
    }
  };

  const createImagePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  const fileRef = useRef(null);

  const fileSelect = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleImgUpload = async (file) => {
    console.log('file:', file);

    if (!file) return;

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
      navigate('/adminpage');
    } catch (error) {
      console.error(isEdit ? '게시글 수정 실패' : '게시글 등록 실패', error.message);
      alert(`게시글 ${isEdit ? '수정' : '등록'}에 실패하였습니다: ${error.message}`);
    }
  };

  const handleCancel = () => {
    const isConfirmed = window.confirm('등록을 취소하시겠습니까?');
    if (isConfirmed) {
      alert('취소되었습니다.');
      navigate('/adminpage');
    }
  };

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러났습니다</div>;

  return (
    <StWriteWrapper>
      <StForm onSubmit={handleSubmit}>
        <StInputForm>
          <h3>행사 {isEdit ? '수정' : '등록'}</h3>
          <ImageUploadButton>
            이미지 선택하기
            <input type="file" onChange={newImage} ref={fileRef} />
          </ImageUploadButton>

          {previewImage && (
            <div style={{ margin: '10px 0', width: '100%', height: 'auto', background: '#f5f5f5', overflow: 'hidden' }}>
              <img
                src={previewImage}
                alt="미리보기 이미지"
                style={{ display: 'block', width: '100%', margin: '0 auto', objectFit: 'cover' }}
              />
            </div>
          )}

          <StTopForm>
            <StFestival
              type="text"
              placeholder="행사명"
              value={festName}
              onChange={(e) => setFestName(e.target.value)}
            />
          </StTopForm>

          <StDateName>행사 시작일</StDateName>
          <StDateForm>
            <StFestivalDate type="date" value={stDate} onChange={(e) => setStDate(e.target.value)} />
            <StFestivalDate type="time" value={stTime} onChange={(e) => setStTime(e.target.value)} />
          </StDateForm>

          <StDateName>행사 종료일</StDateName>
          <StDateForm>
            <StFestivalDate type="date" value={edDate} onChange={(e) => setEdDate(e.target.value)} />
            <StFestivalDate type="time" value={edTime} onChange={(e) => setEdTime(e.target.value)} />
          </StDateForm>

          <StAddressForm>
            <StFestiAddress type="button" selected={region === '서울'} onClick={() => setRegion('서울')}>
              서울
            </StFestiAddress>
            <StFestiAddress type="button" selected={region === '강원도'} onClick={() => setRegion('강원도')}>
              강원도
            </StFestiAddress>
            <StFestiAddress type="button" selected={region === '경기도'} onClick={() => setRegion('경기도')}>
              경기도
            </StFestiAddress>
            <StFestiAddress type="button" selected={region === '경상도'} onClick={() => setRegion('경상도')}>
              경상도
            </StFestiAddress>
            <StFestiAddress type="button" selected={region === '충청도'} onClick={() => setRegion('충청도')}>
              충청도
            </StFestiAddress>
            <StFestiAddress type="button" selected={region === '전라도'} onClick={() => setRegion('전라도')}>
              전라도
            </StFestiAddress>
            <StFestiAddress type="button" selected={region === '제주'} onClick={() => setRegion('제주')}>
              제주
            </StFestiAddress>
          </StAddressForm>

          <StTopForm>
            <StFestiDetailAddress
              type="text"
              placeholder="상세주소"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </StTopForm>

          <StTopForm>
            <StFestiPricing
              type="text"
              placeholder="이용금액"
              value={pricing}
              onChange={(e) => setPricing(e.target.value)}
            />
          </StTopForm>

          <StCategoryForm>
            <StFestiCategory type="button" selected={category === '음악'} onClick={() => setCategory('음악')}>
              음악
            </StFestiCategory>
            <StFestiCategory type="button" selected={category === '음식'} onClick={() => setCategory('음식')}>
              음식
            </StFestiCategory>
            <StFestiCategory type="button" selected={category === '전통'} onClick={() => setCategory('전통')}>
              전통
            </StFestiCategory>
            <StFestiCategory type="button" selected={category === '예술'} onClick={() => setCategory('예술')}>
              예술
            </StFestiCategory>
            <StFestiCategory type="button" selected={category === '기타'} onClick={() => setCategory('기타')}>
              기타
            </StFestiCategory>
          </StCategoryForm>

          <StDescription
            type="text"
            placeholder="행사 상세 내용"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </StInputForm>

        <StButtonDiv>
          <StButton type="submit">등록</StButton>
          <StButton type="button" onClick={handleCancel}>
            취소
          </StButton>
        </StButtonDiv>
      </StForm>
    </StWriteWrapper>
  );
}

export default AdminPostPage;
