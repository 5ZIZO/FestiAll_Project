import React, { useEffect } from 'react'
import * as S from "./Details.styled"
import supabaseTestJhu from '../../supabase/supabaseClient';

const Details = () => {
    const festId = "c75c7d4b-a402-49ba-a80f-4b181b843953";

    const fetchData = async () => {
        const { data: festival_info, error } = await supabaseTestJhu
            .from('festival_info')
            .select('*').eq("id", festId)
        if (error) {
            console.log("error => ", error);
        } else {
            console.log("data => ", festival_info);
        }
    };

    return (
        <>
            <S.Section>
                <S.TitleDiv>
                    <S.FestState>진행전 / 포럼</S.FestState>
                    <S.FestTitle>제 15회 이데일리 전략포럼</S.FestTitle>
                    <S.FestOutline>서울 중구 | 2024.6.18. ~ 2024.6.20.</S.FestOutline>
                </S.TitleDiv>
                <S.ContentsDiv>
                    <S.ImageDiv>
                        <S.Image src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=d6ebdc9d-2919-40ac-84d6-d12786a39666" alt="행사 이미지" />
                    </S.ImageDiv>
                    <S.TextDiv>
                        <S.ButtonDiv>
                            <h3>행사정보</h3>
                            <S.JjimButton>찜 하기</S.JjimButton>
                        </S.ButtonDiv>
                        <S.P>{"이데일리 전략포럼은 그간 시대를 아우르는 주제를 두고 세계적인 석학과 분야별 리더가 참여해 이론과 실전을 넘나들며 통찰과 지식을 향유해온 포럼이다. 이번 포럼은 <인구위기...새로운 상상력, 패러다임의 전환(Demographic crisis...New Imaginantion, Paradigm shift)>을 주제로 3일간 진행될 제 15회 이데일리 전략포럼이다."}
                        </S.P>
                    </S.TextDiv>
                    <S.MapDiv>지도</S.MapDiv>
                    <S.DetailInfo>
                        <ul>
                            <li>시작일 : 2024.06.18.</li>
                            <li>종료일 : 2024.06.20.</li>
                            <li>주소 : 서울특별시 중구 동호로 249</li>
                            <li>이용요금 : [일반]1. 정상가: 하루참석(19일 or 20일) 60,000원 / 양일참석(19일~20일) 100,000원2. 50%할인: 하루참석(19일 or 20일) 30,000원 / 양일참석(19일~20일) 50,000원* 18일(화) 세션참가 무료* 할인대상: 얼리버드 등록, 대학(원)생, KG가족사 임직원, 단체등록(10인 이상)[법인]1구좌(1명): 1,000,000원</li>
                        </ul>
                    </S.DetailInfo>
                </S.ContentsDiv>
            </S.Section>
        </>
    )
}

export default Details