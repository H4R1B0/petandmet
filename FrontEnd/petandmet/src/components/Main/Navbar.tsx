import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Final from 'images/final.svg'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { styled } from '@mui/material/styles'
import { UserLogOut } from 'hooks/User/useLogOut'

import { useAccessToken } from 'hooks/useAccessToken'
const pages = [
  '입양',
  '참여 소통',
  '후원',
  '로그인',
  '회원가입',
  '로그아웃',
  '마이페이지',
]
const settings = ['입양 절차', '입양 신청', '입양 후기']
const notify = ['공지 사항', '봉사 신청', 'Q & A']
const charge = ['충전 하기', '후원 하기', '후원 후기']

const NavButton = styled(Button)(({ theme }) => ({
  my: 2,
  color: 'white',
  display: 'block',
  fontSize: '1.5rem', // 텍스트 사이즈를 더 크게
  fontWeight: 'bold',
}))

function Navbar() {
  const logout = UserLogOut()
  let navigate = useNavigate()
  const [cookie, setCookie, removeCookie] = useCookies(['access_token'])
  const {
    accessToken,
    centerUuid,
    userUuid,
    setAccessToken,
    setCenterUuid,
    setUserUuid,
  } = useAccessToken()

  const logOut = () => {
    removeCookie('access_token')
    localStorage.clear()
    setAccessToken('')
    setCenterUuid('')
    setUserUuid('')
    navigate('/login')
    handleCloseNavMenu()
    logout.mutate()
  }
  const goToLogin = () => {
    navigate('/login')
    handleCloseNavMenu()
  }
  const goToSignUP = () => {
    navigate('/register')
    handleCloseNavMenu()
  }
  const goToAdoptProcess = () => {
    navigate('/adpotprocess')
    handleCloseUserMenu()
    handleCloseNavMenu()
  }
  const goToAdoptCheckList = () => {
    navigate('/adoptchecklist')
    handleCloseUserMenu()
    handleCloseNavMenu()
  }
  const goToAdoptReview = () => {
    navigate('/board/adopt/list')
    handleCloseUserMenu()
    handleCloseNavMenu()
  }
  const goToNotice = () => {
    navigate('/board/notice/list')
    handleCloseNotify()
    handleCloseNavMenu()
  }
  const goToVolunteer = () => {
    navigate('/volunteer')
    handleCloseNotify()
    handleCloseNavMenu()
  }
  const goToQna = () => {
    navigate('/board/qna/list')
    handleCloseNotify()
    handleCloseNavMenu()
  }
  const goToCharge = () => {
    navigate('/donate/charge')
    handleCloseCharge()
    handleCloseNavMenu()
  }
  const goToDonate = () => {
    navigate('/donate/item')
    handleCloseCharge()
    handleCloseNavMenu()
  }
  const goToDonateReview = () => {
    navigate('/board/support/list')
    handleCloseCharge()
    handleCloseNavMenu()
  }
  const goToMyPage = () => {
    if (centerUuid === null) {
      navigate('/mypage')
    } else {
      navigate('/admin')
    }
    handleCloseNavMenu()
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )
  const [anchorElNotify, setAnchorElNotify] =
    React.useState<null | HTMLElement>(null)
  const [anchorElCharge, setAnchorElCharge] =
    React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleOpenNotify = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotify(event.currentTarget)
  }
  const handleCloseNotify = () => {
    setAnchorElNotify(null)
  }
  const handleOpenCharge = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCharge(event.currentTarget)
  }
  const handleCloseCharge = () => {
    setAnchorElCharge(null)
  }
  const handleHome = () => {
    navigate('/')
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FFA629',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={handleHome}
            className="cursor-pointer"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img alt="logo" src={Final} style={{ width: 200 }} />
          </Typography>
          {/* <Box sx={{ flexGrow: 1 }}></Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* <Box sx={{ flexGrow: 1 }}></Box> */}
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                // display: { xs: 'block', md: 'none' },
                display: 'flex',
                gap: '4rem',
              }}
            >
              <MenuItem onClick={handleOpenUserMenu}>
                <Typography textAlign="center">{pages[0]}</Typography>
              </MenuItem>
              <MenuItem onClick={handleOpenNotify}>
                <Typography textAlign="center">{pages[1]}</Typography>
              </MenuItem>
              <MenuItem onClick={handleOpenCharge}>
                <Typography textAlign="center">{pages[2]}</Typography>
              </MenuItem>
              <MenuItem
                onClick={
                  userUuid !== undefined && userUuid !== '' ? logOut : goToLogin
                }
              >
                <Typography textAlign="center">
                  {userUuid !== undefined && userUuid !== ''
                    ? pages[5]
                    : pages[3]}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={
                  userUuid !== undefined && userUuid !== ''
                    ? goToMyPage
                    : goToSignUP
                }
              >
                <Typography textAlign="center">
                  {userUuid !== undefined && userUuid !== ''
                    ? pages[6]
                    : pages[4]}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* 작아질 때 */}

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ flexGrow: 1 }}></Box>
            <NavButton onClick={handleOpenUserMenu}>{pages[0]}</NavButton>
            <NavButton onClick={handleOpenNotify}>{pages[1]}</NavButton>
            <NavButton onClick={handleOpenCharge}>{pages[2]}</NavButton>
            <NavButton
              onClick={
                userUuid !== undefined && userUuid !== '' ? logOut : goToLogin
              }
            >
              {userUuid !== undefined && userUuid !== '' ? pages[5] : pages[3]}
            </NavButton>
            <NavButton
              onClick={
                userUuid !== undefined && userUuid !== ''
                  ? goToMyPage
                  : goToSignUP
              }
            >
              {userUuid !== undefined && userUuid !== '' ? pages[6] : pages[4]}
            </NavButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={setting}
                  onClick={
                    index === 0
                      ? goToAdoptProcess
                      : index === 1
                      ? goToAdoptCheckList
                      : index === 2
                      ? goToAdoptReview
                      : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElNotify}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNotify)}
              onClose={handleCloseNotify}
            >
              {notify.map((item, index) => (
                <MenuItem
                  key={item}
                  onClick={
                    index === 0
                      ? goToNotice
                      : index === 1
                      ? goToVolunteer
                      : index === 2
                      ? goToQna
                      : handleCloseNotify
                  }
                >
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElCharge}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElCharge)}
              onClose={handleCloseCharge}
            >
              {charge.map((item, index) => (
                <MenuItem
                  key={item}
                  onClick={
                    index === 0
                      ? goToCharge
                      : index === 1
                      ? goToDonate
                      : index === 2
                      ? goToDonateReview
                      : handleCloseCharge
                  }
                >
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
