import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import urlStore from '../../stores/urlStore';
import foodmap from '../../styles/foodmap/FoodMap.module.css';
import markerStyle from '../../styles/mapcontents/marker.module.css';
import dongsanStore from '../../stores/dongsanStore';
import globalFilterStore from '../../stores/globalFilterStore';

function FoodMap() {
  const mapRef = useRef(null);
  const { currentMyLocation } = useGeolocation();
  const { naver } = window;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const { API_URL } = urlStore();
  const tenPowSeven = 10 ** 7;
  let restaurantId = 0;
  const { dongsanUsers } = dongsanStore(); // 동산에 추가된 유저 정보
  const { locationFilterData, searchValue } = globalFilterStore();

  // 최초 렌더링 및 이용자의 현재 위치가 변할 때 지도 제작 코드
  useEffect(() => {
    if (naver && naver.maps) {
      if (
        currentMyLocation.lat !== 0 &&
        currentMyLocation.lng !== 0
      ) {
        // eslint-disable-next-line max-depth
        if (localStorage.getItem('ACCESS_TOKEN')) {
          // eslint-disable-next-line max-depth
          if (!dongsanUsers) {
            return;
          }

          console.log('로그인한 지도');

          const fetchData = async () => {
            try {
              if (
                currentMyLocation.lat !== 0 &&
                currentMyLocation.lng !== 0 &&
                mapRef.current !== null
              ) {
                const response = await axios.get(
                  `${API_URL}/naver/search/v2/?query=${query}`
                );
                console.log('글로벌 검색 수행 완료!', response);
                const searchList = response.data;

                const markers = [];
                const infoWindows = [];

                // 네이버 지도 옵션 선택
                const mapOptions = {
                  // 지도의 초기 중심 좌표
                  center: new naver.maps.LatLng(
                    searchList[0].mapy / tenPowSeven,
                    searchList[0].mapx / tenPowSeven
                  ),
                  logoControl: false, // 네이버 로고 표시 X
                  mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
                  scaleControl: true, // 지도 축척 컨트롤의 표시 여부
                  tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
                  zoom: 14, // 지도의 초기 줌 레벨
                  zoomControl: true, // 줌 컨트롤 표시
                  zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
                };
                mapRef.current = new naver.maps.Map(
                  'map',
                  mapOptions
                );

                const createMarkerAndInfoWindow = (item) => {
                  const markerContent = `
                    <div class=${markerStyle.wrapper}>
                      <div class=${markerStyle.searchInfo}>${item.name}</div>
                    </div>
                  `;
                  const marker = new naver.maps.Marker({
                    map: mapRef.current,
                    position: new naver.maps.LatLng(
                      item.mapy / tenPowSeven,
                      item.mapx / tenPowSeven
                    ),
                    icon: {
                      content: markerContent,
                      anchor: new naver.maps.Point(0, 50),
                    },
                  });

                  const infoWindowContent = `
                    <div class=${markerStyle.none} id="restaurantId">${item.id}</div>
                  `;

                  const infoWindow = new naver.maps.InfoWindow({
                    content: infoWindowContent,
                    zIndex: -100,
                    anchorSize: {
                      width: 0,
                      height: 0,
                    },
                    borderWidth: 0,
                  });

                  markers.push(marker);
                  infoWindows.push(infoWindow);
                };

                // eslint-disable-next-line max-depth
                for (let i = 0; i < searchList.length; i += 1) {
                  createMarkerAndInfoWindow(searchList[i]);
                }

                const getClickHandler = (index) => () => {
                  if (infoWindows[index].getMap()) {
                    infoWindows[index].close();
                  } else if (mapRef.current !== null) {
                    infoWindows[index].open(
                      mapRef.current,
                      markers[index]
                    );

                    restaurantId =
                      document.querySelector(
                        '#restaurantId'
                      ).innerText;
                    infoWindows[index].close();

                    navigate(
                      `/main/restaurants/${restaurantId}/detail`,
                      {
                        state: {
                          id: restaurantId,
                        },
                      }
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록 함수
                const registerClickHandlers = () => {
                  for (let i = 0; i < markers.length; i += 1) {
                    naver.maps.Event.addListener(
                      markers[i],
                      'click',
                      getClickHandler(i)
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록
                registerClickHandlers();

                // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'zoom_changed',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
                // 지도 드래그 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'dragend',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
              }
            } catch (error) {
              console.error('글로벌 검색 수행 중 오류 발생!', error);
            }
          };

          const filterSearchData = () => {
            console.log('로케이션 필터 데이터', locationFilterData);
            if (locationFilterData.length === 0) {
              return;
            }

            const markers = [];
            const infoWindows = [];

            // 네이버 지도 옵션 선택
            const mapOptions = {
              // 지도의 초기 중심 좌표
              center: new naver.maps.LatLng(
                locationFilterData[0].mapy / tenPowSeven,
                locationFilterData[0].mapx / tenPowSeven
              ),
              logoControl: false, // 네이버 로고 표시 X
              mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
              scaleControl: true, // 지도 축척 컨트롤의 표시 여부
              tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
              zoom: 14, // 지도의 초기 줌 레벨
              zoomControl: true, // 줌 컨트롤 표시
              zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
            };
            mapRef.current = new naver.maps.Map('map', mapOptions);

            const createMarkerAndInfoWindow = (item) => {
              const markerContent = `
                <div class=${markerStyle.wrapper}>
                  <div class=${markerStyle.searchInfo}>${item.name}</div>
                </div>
              `;
              const marker = new naver.maps.Marker({
                map: mapRef.current,
                position: new naver.maps.LatLng(
                  item.mapy / tenPowSeven,
                  item.mapx / tenPowSeven
                ),
                icon: {
                  content: markerContent,
                  anchor: new naver.maps.Point(0, 50),
                },
              });

              const infoWindowContent = `
                <div class=${markerStyle.none} id="restaurantId">${item.id}</div>
              `;

              const infoWindow = new naver.maps.InfoWindow({
                content: infoWindowContent,
                zIndex: -100,
                anchorSize: {
                  width: 0,
                  height: 0,
                },
                borderWidth: 0,
              });

              markers.push(marker);
              infoWindows.push(infoWindow);
            };

            // eslint-disable-next-line max-depth
            for (let i = 0; i < locationFilterData.length; i += 1) {
              createMarkerAndInfoWindow(locationFilterData[i]);
            }

            const getClickHandler = (index) => () => {
              if (infoWindows[index].getMap()) {
                infoWindows[index].close();
              } else if (mapRef.current !== null) {
                infoWindows[index].open(
                  mapRef.current,
                  markers[index]
                );

                restaurantId =
                  document.querySelector('#restaurantId').innerText;
                infoWindows[index].close();

                navigate(`/main/restaurants/${restaurantId}/detail`, {
                  state: {
                    id: restaurantId,
                  },
                });
              }
            };

            // 정보창의 이벤트 핸들러 등록 함수
            const registerClickHandlers = () => {
              for (let i = 0; i < markers.length; i += 1) {
                naver.maps.Event.addListener(
                  markers[i],
                  'click',
                  getClickHandler(i)
                );
              }
            };

            // 정보창의 이벤트 핸들러 등록
            registerClickHandlers();

            // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
            naver.maps.Event.addListener(
              mapRef.current,
              'zoom_changed',
              () => {
                if (mapRef.current !== null) {
                  checkForMarkersRendering(mapRef.current, markers);
                }
              }
            );
            // 지도 드래그 시 마커 업데이트 이벤트 핸들러
            naver.maps.Event.addListener(
              mapRef.current,
              'dragend',
              () => {
                if (mapRef.current !== null) {
                  checkForMarkersRendering(mapRef.current, markers);
                }
              }
            );
          };

          // 사용자 정보 받아오기
          const fetchUserData = async () => {
            try {
              const userIds = [];
              for (let i = 0; i < dongsanUsers.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                const response = await axios.get(
                  `${API_URL}/account/${dongsanUsers[i].id}`
                );
                console.log('유저 정보들', response);
                userIds.push(response.data);
              }
              return userIds;
            } catch (error) {
              console.error('유저 정보 받아오기 오류', error);
              return [];
            }
          };

          // 맛집 목록 받아오기
          const fetchRestaurantData = async (userIds) => {
            try {
              const restaurantLists = [];
              for (let i = 0; i < userIds.length; i += 1) {
                // eslint-disable-next-line no-await-in-loop
                const res = await axios.get(
                  `${API_URL}/restaurant/v2/${userIds[i].id}`
                );
                console.log('맛집 목록들', res);
                restaurantLists.push(res.data);
              }
              return { restaurantLists, userIds };
            } catch (err) {
              console.error('맛집 목록 받기 에러', err);
              return [];
            }
          };

          // eslint-disable-next-line max-depth
          if (searchValue) {
            fetchData();
          } else if (locationFilterData.length !== 0) {
            filterSearchData();
          } else {
            // 선언한 함수 호출
            fetchUserData()
              .then((userIds) => fetchRestaurantData(userIds))
              .then((mapDatas) => {
                let centerLat = 0;
                let centerLng = 0;

                for (let i = 0; i < mapDatas.userIds.length; i += 1) {
                  for (
                    let j = 0;
                    j < mapDatas.restaurantLists[i].length;
                    j += 1
                  ) {
                    centerLat =
                      mapDatas.restaurantLists[i][j].mapy /
                      tenPowSeven;
                    centerLng =
                      mapDatas.restaurantLists[i][j].mapx /
                      tenPowSeven;

                    console.log(
                      `${i}행 ${j}열`,
                      centerLat,
                      centerLng
                    );

                    // eslint-disable-next-line max-depth
                    if (centerLat !== 0 && centerLng !== 0) {
                      break;
                    }
                  }
                  if (centerLat !== 0 && centerLng !== 0) {
                    break;
                  }
                }

                // 네이버 지도 옵션 선택
                const mapOptions = {
                  // 지도의 초기 중심 좌표
                  center: new naver.maps.LatLng(centerLat, centerLng),
                  logoControl: false, // 네이버 로고 표시 X
                  mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
                  scaleControl: true, // 지도 축척 컨트롤의 표시 여부
                  tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
                  zoom: 16, // 지도의 초기 줌 레벨
                  zoomControl: true, // 줌 컨트롤 표시
                  zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
                };
                mapRef.current = new naver.maps.Map(
                  'map',
                  mapOptions
                );

                console.log('지도에 필요한 모든 데이터', mapDatas);
                const markers = [];
                const infoWindows = [];

                for (let i = 0; i < mapDatas.userIds.length; i += 1) {
                  // 마커 찍기
                  for (
                    let j = 0;
                    j < mapDatas.restaurantLists[i].length;
                    j += 1
                  ) {
                    console.log('유저 정보', mapDatas.userIds[i]);
                    const markerContent = `
                      <div class=${markerStyle.wrapper}>
                        <img src=/assets/random/profile${mapDatas.userIds[i].picture}.png alt="프로필 사진" class=${markerStyle.imgStyle}>
                        <div class=${markerStyle.restaurantInfo}>${mapDatas.restaurantLists[i][j].name}</div>
                      </div>
                    `;
                    const marker = new naver.maps.Marker({
                      map: mapRef.current,
                      position: new naver.maps.LatLng(
                        mapDatas.restaurantLists[i][j].mapy /
                          tenPowSeven,
                        mapDatas.restaurantLists[i][j].mapx /
                          tenPowSeven
                      ),
                      icon: {
                        content: markerContent,
                        anchor: new naver.maps.Point(0, 50),
                      },
                    });

                    const infoWindowContent = `
                      <div class=${markerStyle.none} id="restaurantId">${mapDatas.restaurantLists[i][j].id}</div>
                    `;
                    const infoWindow = new naver.maps.InfoWindow({
                      content: infoWindowContent,
                      anchorSize: {
                        width: 0,
                        height: 0,
                      },
                      borderWidth: 0,
                    });

                    markers.push(marker);
                    infoWindows.push(infoWindow);
                  }
                }

                // 마커 클릭 이벤트
                const getClickHandler = (index) => () => {
                  if (infoWindows[index].getMap()) {
                    infoWindows[index].close();
                  } else if (mapRef.current !== null) {
                    infoWindows[index].open(
                      mapRef.current,
                      markers[index]
                    );
                    restaurantId =
                      document.querySelector(
                        '#restaurantId'
                      ).innerText;
                    console.log('클릭한 가게 아이디', restaurantId);
                    infoWindows[index].close();
                    navigate(
                      `/main/restaurants/${restaurantId}/detail`,
                      {
                        state: {
                          id: restaurantId,
                        },
                      }
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록 함수
                const registerClickHandlers = () => {
                  for (let j = 0; j < markers.length; j += 1) {
                    naver.maps.Event.addListener(
                      markers[j],
                      'click',
                      getClickHandler(j)
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록
                registerClickHandlers();

                // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'zoom_changed',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
                // 지도 드래그 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'dragend',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
              });
          }
        } else {
          console.log('로그인 안한 지도!');
          const fetchData = async () => {
            try {
              if (
                currentMyLocation.lat !== 0 &&
                currentMyLocation.lng !== 0 &&
                mapRef.current !== null
              ) {
                const response = await axios.get(
                  `${API_URL}/naver/search/v2/?query=${query}`
                );
                console.log('글로벌 검색 수행 완료!', response);
                const searchList = response.data;

                const markers = [];
                const infoWindows = [];

                // 네이버 지도 옵션 선택
                const mapOptions = {
                  // 지도의 초기 중심 좌표
                  center: new naver.maps.LatLng(
                    searchList[0].mapy / tenPowSeven,
                    searchList[0].mapx / tenPowSeven
                  ),
                  logoControl: false, // 네이버 로고 표시 X
                  mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
                  scaleControl: true, // 지도 축척 컨트롤의 표시 여부
                  tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
                  zoom: 14, // 지도의 초기 줌 레벨
                  zoomControl: true, // 줌 컨트롤 표시
                  zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
                };
                mapRef.current = new naver.maps.Map(
                  'map',
                  mapOptions
                );

                const createMarkerAndInfoWindow = (item) => {
                  const markerContent = `
                    <div class=${markerStyle.wrapper}>
                      <div class=${markerStyle.searchInfo}>${item.name}</div>
                    </div>
                  `;
                  const marker = new naver.maps.Marker({
                    map: mapRef.current,
                    position: new naver.maps.LatLng(
                      item.mapy / tenPowSeven,
                      item.mapx / tenPowSeven
                    ),
                    icon: {
                      content: markerContent,
                      anchor: new naver.maps.Point(0, 50),
                    },
                  });

                  const infoWindowContent = `
                    <div class=${markerStyle.none} id="restaurantId">${item.id}</div>
                  `;

                  const infoWindow = new naver.maps.InfoWindow({
                    content: infoWindowContent,
                    zIndex: -100,
                    anchorSize: {
                      width: 0,
                      height: 0,
                    },
                    borderWidth: 0,
                  });

                  markers.push(marker);
                  infoWindows.push(infoWindow);
                };

                // eslint-disable-next-line max-depth
                for (let i = 0; i < searchList.length; i += 1) {
                  createMarkerAndInfoWindow(searchList[i]);
                }

                const getClickHandler = (index) => () => {
                  if (infoWindows[index].getMap()) {
                    infoWindows[index].close();
                  } else if (mapRef.current !== null) {
                    infoWindows[index].open(
                      mapRef.current,
                      markers[index]
                    );

                    restaurantId =
                      document.querySelector(
                        '#restaurantId'
                      ).innerText;
                    infoWindows[index].close();

                    navigate(
                      `/main/restaurants/${restaurantId}/detail`,
                      {
                        state: {
                          id: restaurantId,
                        },
                      }
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록 함수
                const registerClickHandlers = () => {
                  for (let i = 0; i < markers.length; i += 1) {
                    naver.maps.Event.addListener(
                      markers[i],
                      'click',
                      getClickHandler(i)
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록
                registerClickHandlers();

                // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'zoom_changed',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
                // 지도 드래그 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'dragend',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
              }
            } catch (error) {
              console.error('글로벌 검색 수행 중 오류 발생!', error);
            }
          };

          const filterSearchData = () => {
            console.log('로케이션 필터 데이터', locationFilterData);
            if (locationFilterData.length === 0) {
              return;
            }

            const markers = [];
            const infoWindows = [];

            // 네이버 지도 옵션 선택
            const mapOptions = {
              // 지도의 초기 중심 좌표
              center: new naver.maps.LatLng(
                locationFilterData[0].mapy / tenPowSeven,
                locationFilterData[0].mapx / tenPowSeven
              ),
              logoControl: false, // 네이버 로고 표시 X
              mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
              scaleControl: true, // 지도 축척 컨트롤의 표시 여부
              tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
              zoom: 14, // 지도의 초기 줌 레벨
              zoomControl: true, // 줌 컨트롤 표시
              zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
            };
            mapRef.current = new naver.maps.Map('map', mapOptions);

            const createMarkerAndInfoWindow = (item) => {
              const markerContent = `
                <div class=${markerStyle.wrapper}>
                  <div class=${markerStyle.searchInfo}>${item.name}</div>
                </div>
              `;
              const marker = new naver.maps.Marker({
                map: mapRef.current,
                position: new naver.maps.LatLng(
                  item.mapy / tenPowSeven,
                  item.mapx / tenPowSeven
                ),
                icon: {
                  content: markerContent,
                  anchor: new naver.maps.Point(0, 50),
                },
              });

              const infoWindowContent = `
                <div class=${markerStyle.none} id="restaurantId">${item.id}</div>
              `;

              const infoWindow = new naver.maps.InfoWindow({
                content: infoWindowContent,
                zIndex: -100,
                anchorSize: {
                  width: 0,
                  height: 0,
                },
                borderWidth: 0,
              });

              markers.push(marker);
              infoWindows.push(infoWindow);
            };

            // eslint-disable-next-line max-depth
            for (let i = 0; i < locationFilterData.length; i += 1) {
              createMarkerAndInfoWindow(locationFilterData[i]);
            }

            const getClickHandler = (index) => () => {
              if (infoWindows[index].getMap()) {
                infoWindows[index].close();
              } else if (mapRef.current !== null) {
                infoWindows[index].open(
                  mapRef.current,
                  markers[index]
                );

                restaurantId =
                  document.querySelector('#restaurantId').innerText;
                infoWindows[index].close();

                navigate(`/main/restaurants/${restaurantId}/detail`, {
                  state: {
                    id: restaurantId,
                  },
                });
              }
            };

            // 정보창의 이벤트 핸들러 등록 함수
            const registerClickHandlers = () => {
              for (let i = 0; i < markers.length; i += 1) {
                naver.maps.Event.addListener(
                  markers[i],
                  'click',
                  getClickHandler(i)
                );
              }
            };

            // 정보창의 이벤트 핸들러 등록
            registerClickHandlers();

            // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
            naver.maps.Event.addListener(
              mapRef.current,
              'zoom_changed',
              () => {
                if (mapRef.current !== null) {
                  checkForMarkersRendering(mapRef.current, markers);
                }
              }
            );
            // 지도 드래그 시 마커 업데이트 이벤트 핸들러
            naver.maps.Event.addListener(
              mapRef.current,
              'dragend',
              () => {
                if (mapRef.current !== null) {
                  checkForMarkersRendering(mapRef.current, markers);
                }
              }
            );
          };

          // eslint-disable-next-line max-depth
          if (searchValue) {
            fetchData();
          } else if (locationFilterData.length !== 0) {
            filterSearchData();
          } else {
            // 네이버 지도 옵션 선택
            const mapOptions = {
              // 지도의 초기 중심 좌표
              center: new naver.maps.LatLng(
                currentMyLocation.lat,
                currentMyLocation.lng
              ),
              logoControl: false, // 네이버 로고 표시 X
              mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
              scaleControl: true, // 지도 축척 컨트롤의 표시 여부
              tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
              zoom: 16, // 지도의 초기 줌 레벨
              zoomControl: true, // 줌 컨트롤 표시
              zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
            };
            mapRef.current = new naver.maps.Map('map', mapOptions);
          }
        }
      }
    }
  }, [currentMyLocation, dongsanUsers, query, locationFilterData]);

  return <div id="map" className={foodmap.map} />;
}

export default FoodMap;
