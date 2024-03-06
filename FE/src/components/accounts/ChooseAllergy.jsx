import { useState } from 'react';
import styles from '../../styles/accounts/ChooseAllergy.module.css';
import beafImg from '../../assets/images/signup/allergy/beef.png';
import porkImg from '../../assets/images/signup/allergy/pork.png';
import chickenImg from '../../assets/images/signup/allergy/chicken.png';
import eggImg from '../../assets/images/signup/allergy/egg.png';
import shrimpImg from '../../assets/images/signup/allergy/shrimp.png';
import crabImg from '../../assets/images/signup/allergy/crab.png';
import squidImg from '../../assets/images/signup/allergy/squid.png';
import mackerelImg from '../../assets/images/signup/allergy/mackerel.png';
import shellfishImg from '../../assets/images/signup/allergy/shellfish.png';
import milkImg from '../../assets/images/signup/allergy/milk.png';
import peanutImg from '../../assets/images/signup/allergy/peanut.png';
import walnutImg from '../../assets/images/signup/allergy/walnut.png';
import pinenutImg from '../../assets/images/signup/allergy/pinenut.png';
import soybeanImg from '../../assets/images/signup/allergy/soybean.png';
import peachImg from '../../assets/images/signup/allergy/peach.png';
import tomatoImg from '../../assets/images/signup/allergy/tomato.png';
import wheatImg from '../../assets/images/signup/allergy/wheat.png';
import buckwheatImg from '../../assets/images/signup/allergy/buckwheat.png';
import wineImg from '../../assets/images/signup/allergy/wine.png';
import signupStore from '../../stores/signupStore';

function ChooseAllergy() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const { allergy, setAllergy } = signupStore();

  const AllergyButtonClick = (buttonValue) => {
    if (selectedButtons.includes(buttonValue)) {
      // 이미 선택된 버튼일 경우, 선택 해제
      setSelectedButtons(
        selectedButtons.filter((value) => value !== buttonValue)
      );
      setAllergy(
        selectedButtons.filter((value) => value !== buttonValue)
      );
    } else {
      // 선택되지 않은 버튼일 경우, 선택 추가
      setSelectedButtons([...selectedButtons, buttonValue]);
      setAllergy([...selectedButtons, buttonValue]);
    }
    // setAllergy(selectedButtons.join(', '));
    console.log('알레르기:', allergy);
  };
  return (
    <div className={styles.Box}>
      <div className={styles.allergyBox}>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(443)}
          style={{
            backgroundColor: selectedButtons.includes(443)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(443)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '90px' }}
            src={beafImg}
            alt="beaf"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>소고기</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(444)}
          style={{
            backgroundColor: selectedButtons.includes(444)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(444)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={porkImg}
            alt="pork"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>돼지고기</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(445)}
          style={{
            backgroundColor: selectedButtons.includes(445)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(445)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={chickenImg}
            alt="chicken"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>닭고기</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(446)}
          style={{
            backgroundColor: selectedButtons.includes(446)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(446)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img src={eggImg} alt="egg" className={styles.allergyImg} />
          <div className={styles.allergyName}>난류</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(447)}
          style={{
            backgroundColor: selectedButtons.includes(447)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(447)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={shrimpImg}
            alt="shrimp"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>새우</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(448)}
          style={{
            backgroundColor: selectedButtons.includes(448)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(448)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={crabImg}
            alt="crab"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>게</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(449)}
          style={{
            backgroundColor: selectedButtons.includes(449)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(449)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={squidImg}
            alt="squid"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>오징어</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(450)}
          style={{
            backgroundColor: selectedButtons.includes(450)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(450)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '80px' }}
            src={mackerelImg}
            alt="mackerel"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>고등어</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(451)}
          style={{
            backgroundColor: selectedButtons.includes(451)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(451)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '60px' }}
            src={shellfishImg}
            alt="shellfish"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>조개류</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(452)}
          style={{
            backgroundColor: selectedButtons.includes(452)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(452)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '60px' }}
            src={milkImg}
            alt="milk"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>우유</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(453)}
          style={{
            backgroundColor: selectedButtons.includes(453)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(453)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={peanutImg}
            alt="peanut"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>땅콩</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(454)}
          style={{
            backgroundColor: selectedButtons.includes(454)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(454)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={walnutImg}
            alt="walnut"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>호두</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(455)}
          style={{
            backgroundColor: selectedButtons.includes(455)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(455)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={pinenutImg}
            alt="pinenut"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>잣</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(456)}
          style={{
            backgroundColor: selectedButtons.includes(456)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(456)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '55px' }}
            src={soybeanImg}
            alt="soybean"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>대두</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(457)}
          style={{
            backgroundColor: selectedButtons.includes(457)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(457)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={peachImg}
            alt="peach"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>복숭아</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(458)}
          style={{
            backgroundColor: selectedButtons.includes(458)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(458)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={tomatoImg}
            alt="tomato"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>토마토</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(459)}
          style={{
            backgroundColor: selectedButtons.includes(459)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(459)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={wheatImg}
            alt="wheat"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>밀</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(460)}
          style={{
            backgroundColor: selectedButtons.includes(460)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(460)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={buckwheatImg}
            alt="buckwheat"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>메밀</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick(461)}
          style={{
            backgroundColor: selectedButtons.includes(461)
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes(461)
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={wineImg}
            alt="wine"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>아황산류</div>
        </button>

        {/* <p> 알레르기: {selectedButtons.join(', ')}</p> */}
      </div>
    </div>
  );
}

export default ChooseAllergy;
