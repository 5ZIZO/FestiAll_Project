import React, { useState, useEffect } from 'react'
import * as S from "./Details.styled"
import { useParams } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useGetPlace from '../../hooks/useGetPlace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '../api/supabaseClient';

const Details = () => {
    const festId = useParams().festId;
    const [isStarted, setIsStarted] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [isJiimed, setIsJiimed] = useState(false);


    // 아직 찜 기능 완성 X, 테스트 중..
    const handleToggleJjim = () => {
        setIsJiimed(prev => !prev);
    };

    const { data: place, isError, isPending } = useGetPlace(festId);

    useEffect(() => {
        if (place) {
            const today = Date.now();
            const dateStart = Date.parse(place.st_date);
            const dateEnd = Date.parse(place.ed_date);

            setIsStarted(today >= dateStart);
            setIsEnded(today > dateEnd);
        }
        console.log(place?.address);
        if (place?.address) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(place?.address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const newCoords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    setLat(newCoords.Ma);
                    setLng(newCoords.La);
                }
            });
        }

    }, [place]);

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
                    <S.FestTitle>{place?.name}</S.FestTitle>
                    <S.FestOutline>{place?.category} | {place?.st_date} ~ {place?.ed_date}</S.FestOutline>
                </S.TitleDiv>
                <S.ContentsDiv>
                    <S.ImageDiv>
                        <S.Image src={place?.image} alt="행사 이미지" />
                    </S.ImageDiv>
                    <S.TextDiv>
                        <S.ButtonDiv>
                            <S.H3>행사정보</S.H3>
                            <S.JjimButton
                                $color={isJiimed ? "red" : "green"}
                                onClick={handleToggleJjim}>{isJiimed ? "찜 취소" : "찜 하기"}</S.JjimButton>
                        </S.ButtonDiv>
                        <S.P>{place?.description}
                        </S.P>
                    </S.TextDiv>
                    <S.MapDiv>
                        <FestMap></FestMap>
                    </S.MapDiv>
                    <S.DetailInfo>
                        <ul>
                            <li>시작일 : {place?.st_date}</li>
                            <li>종료일 : {place?.ed_date}</li>
                            <li>주소 : {place?.address}</li>
                            <li>이용요금 : {place?.pricing}</li>
                        </ul>
                    </S.DetailInfo>
                </S.ContentsDiv>
            </S.Section>
        </>
    )
}

export default Details