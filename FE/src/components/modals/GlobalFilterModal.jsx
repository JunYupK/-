import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import swal from 'sweetalert2';
import UserSortSelect from '../select/UserSortSelect';
import UserAgeSelect from '../select/UserAgeSelect';
import LocationSortSelect from '../select/LocationSortSelect';
import LocationMenuSelect from '../select/LocationMenuSelect';
import LocationSelect from '../select/LocationSelect';
import globalFilter from '../../styles/modals/GlobalFilter.module.css';
import globalFilterStore from '../../stores/globalFilterStore';
import urlStore from '../../stores/urlStore';
import dongsanStore from '../../stores/dongsanStore';

function GlobalFilterModal() {
  // 필터 클릭
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('장소');
  const filterOpen = Boolean(anchorElFilter);
  const {
    rankSort,
    choisedMenu,
    location,
    setLocationFilterData,
    setSearchValue,
  } = globalFilterStore();
  const { API_URL } = urlStore();
  const { setShowRefreshBtn } = dongsanStore();
  const navigate = useNavigate();

  const filterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const filterClose = () => {
    setAnchorElFilter(null);
  };
  const userTab = () => {
    setCurrentFilter('유저');
  };
  const locationTab = () => {
    setCurrentFilter('장소');
  };

  const filterBtnClick = () => {
    setShowRefreshBtn(true);
    if (currentFilter === '장소' && location) {
      console.log('별점 높은순 1', rankSort);
      console.log('선택된 메뉴', choisedMenu);
      console.log('지역 아이디', location);

      const menuCategory = [];
      for (let i = 0; i < choisedMenu.length; i += 1) {
        menuCategory.push({
          name: choisedMenu[i],
        });
      }

      axios({
        method: 'post',
        url: `${API_URL}/restaurant/search/filter`,
        data: {
          isDescend: rankSort,
          restaurantFoodCategories: menuCategory,
          regionId: location,
        },
      })
        .then((res) => {
          console.log('장소 필터 검색!', res);
          setLocationFilterData(res.data);
          filterClose();
        })
        .catch((err) => {
          console.error('장소 필터 검색ㅠㅠ', err);
        });
    } else if (!location) {
      filterClose();
      swal.fire({
        text: '지역을 반드시 설정해주세요!',
        icon: 'warning',
        confirmButtonColor: '#1DB177',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <div>
      <TuneTwoToneIcon
        id="filter-button"
        className={globalFilter.filterBtn}
        aria-controls={filterOpen ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={filterOpen ? 'true' : undefined}
        onClick={(e) => {
          filterClick(e);
          setSearchValue('');
          navigate({
            pathname: '/main/restaurants',
          });
        }}
        fontSize="medium"
        color="disabled"
      />
      <Menu
        id="filter-menu"
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
        anchorEl={anchorElFilter}
        open={filterOpen}
        onClose={filterClose}
        TransitionComponent={Fade}
      >
        {currentFilter === '유저' ? (
          <div className={globalFilter.modalContainer}>
            <div className={globalFilter.btnContainer}>
              <button
                type="button"
                className={globalFilter.activeBtn}
                onClick={userTab}
              >
                유저
              </button>
              <button
                type="button"
                className={globalFilter.unactiveBtn}
                onClick={locationTab}
              >
                장소
              </button>
            </div>
            <div className={globalFilter.filterMenu}>
              <UserSortSelect />
              <UserAgeSelect />
            </div>
          </div>
        ) : (
          <div className={globalFilter.modalContainer}>
            <div className={globalFilter.btnContainer}>
              {/* <button
                type="button"
                className={globalFilter.unactiveBtn}
                onClick={userTab}
              >
                유저
              </button> */}
              <button
                type="button"
                className={globalFilter.activeBtn}
                onClick={locationTab}
              >
                장소
              </button>
            </div>
            <div className={globalFilter.filterMenu}>
              <LocationSortSelect />
              <LocationMenuSelect />
              <LocationSelect />
              <button
                type="button"
                className={globalFilter.locationBtn}
                onClick={() => filterBtnClick()}
              >
                검색
              </button>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default GlobalFilterModal;
