import { useState } from 'react';
import styles from '../../styles/accounts/SignupSecond.module.css';
import babyImg from '../../assets/images/signup/babytaste.png';
import pepperImg from '../../assets/images/signup/pepper.png';
import ChooseAllergy from './ChooseAllergy';
import signupStore from '../../stores/signupStore';

function SignupSecond() {
  const [selectedButton, setSelectedButton] = useState(null);
  const { spicyLevel, setSpicyLevel } = signupStore();
  const handleButtonClick = (buttonValue) => {
    setSelectedButton(buttonValue);
    setSpicyLevel(buttonValue);
    console.log('매운 맛:', spicyLevel);
  };

  return (
    <div>
      <div>매운 맛은 얼마나 잘 드시나요?</div>
      <div className={styles.buttonBox}>
        <button
          className={styles.button}
          type="button"
          onClick={() => handleButtonClick(1)}
          style={{
            backgroundColor:
              selectedButton === 1
                ? 'rgba(29, 177, 119, 0.5)'
                : 'white',
            border:
              selectedButton === 1
                ? 'none'
                : '1px solid rgba(29, 177, 119, 0.7)',
            color:
              selectedButton === 1 ? 'white' : 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div className={styles.tasteBox}>
            <img
              src={babyImg}
              alt="babyImg"
              className={styles.babyImg}
            />
            애기 입맛
          </div>
        </button>
        <div className={styles.buttonLine} />
        <button
          className={styles.button}
          type="button"
          onClick={() => handleButtonClick(2)}
          style={{
            backgroundColor:
              selectedButton === 2
                ? 'rgba(29, 177, 119, 0.5)'
                : 'white',
            border:
              selectedButton === 2
                ? 'none'
                : '1px solid rgba(29, 177, 119, 0.7)',
            color:
              selectedButton === 2 ? 'white' : 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div className={styles.tasteBox}>
            <img
              src={pepperImg}
              alt="pepperImg"
              className={styles.pepperImg}
            />
            신라면
          </div>
        </button>
        <div className={styles.buttonLine} />
        <button
          className={styles.button}
          type="button"
          onClick={() => handleButtonClick(3)}
          style={{
            backgroundColor:
              selectedButton === 3
                ? 'rgba(29, 177, 119, 0.5)'
                : 'white',
            border:
              selectedButton === 3
                ? 'none'
                : '1px solid rgba(29, 177, 119, 0.7)',
            color:
              selectedButton === 3 ? 'white' : 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div className={styles.tasteBox}>
            <div style={{ marginRight: '5px', marginTop: '5px' }}>
              <img
                src={pepperImg}
                alt="pepperImg"
                className={styles.twopepperImg}
              />
              <img
                src={pepperImg}
                alt="pepperImg"
                className={styles.twopepperImg}
              />
            </div>
            불닭볶음면
          </div>
        </button>
      </div>
      {/* 선택된거 확인 */}
      {/* <p>선택된 값: {selectedButton}</p> */}
      <div style={{ marginTop: '30px' }}>
        알레르기가 있으신가요?
        <ChooseAllergy />
      </div>
    </div>
  );
}

export default SignupSecond;
