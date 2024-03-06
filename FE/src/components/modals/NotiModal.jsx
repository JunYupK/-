import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

function NotiModal() {
  const [anchorElNoti, setanchorElNoti] = useState(null);
  const notiOpen = Boolean(anchorElNoti);
  const notiClick = (event) => {
    setanchorElNoti(event.currentTarget);
  };
  const notiClose = () => {
    setanchorElNoti(null);
  };

  return (
    <div>
      <IconButton
        onClick={notiClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={notiOpen ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={notiOpen ? 'true' : undefined}
      >
        <NotificationsIcon fontSize="large" color="disabled" />
      </IconButton>
      <Menu
        anchorEl={anchorElNoti}
        id="account-menu"
        open={notiOpen}
        onClose={notiClose}
        onClick={notiClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <MenuItem onClick={notiClose}>
          <Avatar /> OOO님이 당신을 팔로우했습니다.
        </MenuItem>
        <Divider />
        <MenuItem onClick={notiClose}>
          <Avatar /> OOO님이 당신을 기록했습니다.
        </MenuItem>
      </Menu>
    </div>
  );
}

export default NotiModal;
