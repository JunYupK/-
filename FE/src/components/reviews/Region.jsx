import axios from 'axios';

function Regeion() {
  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          axios
            .get('https://i10a209.p.ssafy.io/api/region')
            .then((data) => {
              console.log(data);
            });
        }}
      >
        아무버튼임
      </button>
    </div>
  );
}
export default Regeion;
