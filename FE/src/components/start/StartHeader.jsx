import { Link } from 'react-router-dom';
import styles from '../../styles/start/StartView.module.css';
import imgLogo from '../../assets/images/logo.png';

function StartHeader() {
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          src={imgLogo}
          alt="mainLogo"
          className={styles.imgLogo}
        />
      </Link>
    </div>
  );
}

export default StartHeader;
