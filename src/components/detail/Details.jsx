import React, { useState, useEffect } from 'react'
import * as S from "./Details.styled"
import supabaseTestJhu from '../../supabaseTestJhu/supabaseClient';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import usePlaces from '../../hooks/usePlaces';


const Details = () => {
    const festId = useParams().festId;
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const fetchFestDetailInfo = async ({ queryKey }) => {
        const { data, error } = await supabaseTestJhu
            .from('festival_info')
            .select('*').eq("id", queryKey[1])
        if (error) {
            console.log("error => ", error);
        } else {
            return data[0];
        }
    };
    const { data: festival_info, isPending, isError } = useQuery({
        queryKey: ["festInfo", festId],
        queryFn: fetchFestDetailInfo,
    })

    useEffect(() => {
        if (festival_info) {
            const today = Date.now();
            const dateStart = Date.parse(festival_info.date_start);
            const dateEnd = Date.parse(festival_info.date_end);

            setIsStarted(today >= dateStart);
            setIsEnded(today > dateEnd);
        }
        console.log(festival_info?.address);
        if (festival_info?.address) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(festival_info?.address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const newCoords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    setLat(newCoords.Ma);
                    setLng(newCoords.La);
                }
            });
        }

    }, [festival_info]);

    const FestMap = () => {
        return (
            <Map
                center={{ lat, lng }}
                style={{
                    width: "1280px",
                    height: '500px',
                    borderRadius: '20px',
                }}
            >
                <MapMarker
                    style={{ border: 'tranparent' }}
                    position={{ lat, lng }}
                >행사장소
                </MapMarker>
            </Map>
        );
    };

    if (isPending) return <div>로딩 중 ...</div>
    if (isError) return <div>데이터를 불러오는 데 실패했습니다</div>

    return (
        <>
            <S.Section>
                <S.TitleDiv>
                    <S.FestState>{isStarted ? (isEnded ? "종료" : "진행 중") : "진행 전"}</S.FestState>
                    <S.FestTitle>{festival_info?.title}</S.FestTitle>
                    <S.FestOutline>{festival_info?.category} | {festival_info?.date_start} ~ {festival_info?.date_end}</S.FestOutline>
                </S.TitleDiv>
                <S.ContentsDiv>
                    <S.ImageDiv>
                        <S.Image src={festival_info?.image_url} alt="행사 이미지" />
                    </S.ImageDiv>
                    <S.TextDiv>
                        <S.ButtonDiv>
                            <S.H3>행사정보</S.H3>
                            <S.JjimButton>찜 하기</S.JjimButton>
                        </S.ButtonDiv>
                        <S.P>{festival_info?.detail}
                        </S.P>
                    </S.TextDiv>
                    <S.MapDiv>
                        <FestMap></FestMap>
                    </S.MapDiv>
                    <S.DetailInfo>
                        <ul>
                            <li>시작일 : {festival_info?.date_start}</li>
                            <li>종료일 : {festival_info?.date_end}</li>
                            <li>주소 : {festival_info?.address}</li>
                            <li>이용요금 : {festival_info?.cost}</li>
                        </ul>
                    </S.DetailInfo>
                </S.ContentsDiv>
            </S.Section>
        </>
    )
}

export default Details