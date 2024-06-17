import './App.css'
import usePlaces from './hooks/usePlaces';
import useStore from './store/useStore';

function App() {

  const { isPending, error } = usePlaces();
  const places = useStore((state) => state.places);
  console.log(places);

  if (isPending) return <div>로딩 중입니다...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <>
      <div>API 호출 테스트</div>
      <ul>
        {places.map((place) => (
          <li key={place.post_id}>
            <p>행사명 : {place.name}</p>
            <p>행사 일정 : {place.st_date} ~ {place.ed_date}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
