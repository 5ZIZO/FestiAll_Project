# FestiAll
## 전국 행사 정보를 알려주는 사이트

FestiAll은 전국의 행사 정보를 유저들에게 알려주는 사이트 입니다.


전국 각지의 행사 정보를 알려주어 유저들이 있는 지역 근처 혹은 여행을 가려는 지역 근처의 행사에 대한 정보를 미리 알아 각 지역의 행사들의 접근성을 높이는 데에 목적이 있습니다.

## 팀원 구성

<div align="center" dir="auto">
<table>
<thead>
<tr>
<th align="center"><strong>김병준</strong></th>
<th align="center"><strong>김동신</strong></th>
<th align="center"><strong>이가현</strong></th>
<th align="center"><strong>서샛별</strong></th>
<th align="center"><strong>이준혁</strong></th>
<th align="center"><strong>정현욱</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><a href="https://github.com/Captain-Kim"><img src="https://avatars.githubusercontent.com/u/160568904?v=4" height="150" width="150" style="max-width: 100%;"> <br> @Captain-Kim</a></td>

<td align="center"><a href="https://github.com/KimDongSin"><img src="https://avatars.githubusercontent.com/u/81426391?v=4" height="150" width="150" style="max-width: 100%;"> <br> @KimDongSin</a></td>

<td align="center"><a href="https://github.com/Ga-zzang"><img src="https://avatars.githubusercontent.com/u/165372628?v=4" height="150" width="150" style="max-width: 100%;"> <br> @Ga-zzang</a></td>

<td align="center"><a href="https://github.com/ssbmel"><img src="https://avatars.githubusercontent.com/u/159214124?v=4" height="150" width="150" style="max-width: 100%;"> <br> @ssbmel</a></td>

<td align="center"><a href="https://github.com/LeeJunhyeok369"><img src="https://avatars.githubusercontent.com/u/82815583?v=4" height="150" width="150" style="max-width: 100%;"> <br> @LeeJunhyeok369</a></td>

<td align="center"><a href="https://github.com/ghastlymouse"><img src="https://avatars.githubusercontent.com/u/163982251?v=4" height="150" width="150" style="max-width: 100%;"> <br> @ghastlymouse</a></td>


</tr>
</tbody>
</table>
</div>

## 역할 및 업무 분담
- 이가현
  - 팀장 및 관리자 페이지 담당
- 이준혁
  - 메인 페이지 (카테고리 검색) 및 전반적 세부 UI 담당
- 김병준
  - 로그인, 회원가입 페이지 및 인증/인가, Supabase 총괄 담당
- 김동신
  - 메인 페이지 (지도) 담당, 전체적인 UI 수정 담당
- 서샛별
  - 마이페이지 담당
- 정현욱
  - 행사 상세 페이지 및 찜 기능 담당
## 페이지별 기능
### 메인 페이지
- 카카오 맵 API를 이용한 지도 및 지도 위치에 따른 지역별 행사를 화면에 노출
- 검색어 혹은 지역, 카테고리 별 행사 검색 기능 구현
### 상세 페이지
- 행사의 이름, 장소 등의 상세 정보를 화면에 노출
- 찜 기능 구현
### 마이 페이지
- 유저가 찜한 행사를 지도와 함께 화면에 노출
### 관리자 페이지
- 유저들에게 보여줄 행사 데이터를 DB에 추가, 수정, 삭제하는 페이지
- 행사 데이터의 CRUD 기능 구현
### 로그인, 회원가입 페이지
- Supabase의 auth api를 이용해 인증/인가 구현

## 제작 기간
- 2024.06.17~2024.06.20

## 페이지 구성
- 메인 페이지
- 관리자 페이지
  - 행사 데이터 추가, 수정 페이지
  - 행사 데이터 확인, 삭제 페이지
- 상세 페이지
- 마이 페이지
- 로그인 페이지
- 회원가입 페이지

## 기술 환경 및 스택
### Environment

<img src="https://img.shields.io/badge/visual studio code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### Config

<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=black">

### Development

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/@tanstack/react--query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img src="https://img.shields.io/badge/react--router--dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/react--kakao--maps-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">
<img src="https://img.shields.io/badge/react--spinners-ED8B00?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/zustand-E48E00?style=for-the-badge&logo=zustand&logoColor=white">


### Communication
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

### Deploy
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

## Trouble Shooting
3개 정도 ?
1.
2.
3.
