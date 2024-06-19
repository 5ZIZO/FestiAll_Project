// import React from 'react';
// import { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import supabase from '../../components/api/supabaseClient';

// function AdminPage() {
//   // const { data } = useQuery({ queryKey: ["places"], queryFn: getAllPlaces });
//   // console.log("data 들어오나요?", data);

//     return (
//         <>
//             <StFestWrapper> 
//             <h1>행사 목록</h1>
//                 <StFestForm>
//                     <div>행사명</div>
//                     <div>행사일정</div> 
//                     <div>행사주소</div> 
//                     <div>이용금액</div> 
//                     <div>카테고리</div>
//                     <StButtonDiv>
//                         <StButton>수정</StButton>
//                         <StButton>삭제</StButton>
//                     </StButtonDiv>
//                 </StFestForm>
//                 <StFestForm>
//                     <div>행사명</div>
//                     <div>행사일정</div> 
//                     <div>행사주소</div> 
//                     <div>이용금액</div> 
//                     <div>카테고리</div>
//                     <StButtonDiv>
//                         <StButton>수정</StButton>
//                         <StButton>삭제</StButton>
//                     </StButtonDiv>
//                 </StFestForm>
//             </StFestWrapper>
//         </>
//     );
// }

// export default AdminPage;

// const StFestWrapper = styled.div`
//     display: block;
//     justify-content: column;
//     padding: 30px;
//     margin: 30px;
//     background: #E0E0E0;
// `;

// const StFestForm = styled.div`
//     width: 80%;
//     display: flex;
//     flex-direction: flex-start;
//     overflow: auto;
//     border: 1px solid gray;
//     border-radius: 10px;
//     padding: 20px;
//     margin: 10px;
//     margin-left: 100px;
//     margin-bottom: 25px;
//     // background: red;
// `;


// const StButtonDiv = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     margin: 20px;
//     // background: green;
// `;

// const StButton = styled.button`
//     border-radius: 26px;
//     border: none;
//     color: white;
//     font-weight: semi-bolder;
//     font-size: 15px;
//     background: #588157;
//     margin: 5px;
//     padding: 10px 25px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//     &:hover {
//         background: #3D593C;
//         text-decoration: none;
//     }
// `;