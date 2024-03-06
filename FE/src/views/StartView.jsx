import StartHeader from '../components/start/StartHeader';
import StartMain from '../components/start/StartMain';
import StartFooter from '../components/start/StartFooter';

function StartView() {
  return (
    <div>
      <StartHeader />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'rgba(29, 177, 119, 0.2)',
        }}
      >
        <StartMain />
      </div>
      <StartFooter />
    </div>
  );
}

export default StartView;
