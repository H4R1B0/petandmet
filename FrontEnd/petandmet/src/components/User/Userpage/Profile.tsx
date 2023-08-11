import { useProfileQuery, ProfileData } from 'hooks/User/useProfileQuery'
import { useDropUser } from 'hooks/User/useDropUserMutation'
import { useState } from 'react'
import { ModifyUser, useModifyMutation } from 'hooks/User/usePatchUserMutation'
import { useProfile } from 'hooks/User/useProfile'
import Backdrop from '@mui/material/Backdrop'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'

function Profile() {
  const [isModify, setIsModify] = useState(false)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const profileStore = useProfile()
  const { isLoading, isError, refetch } = useProfileQuery()
  const dropUser = useDropUser()
  const modify = useModifyMutation()
  const [cookies] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()

  const handleDropUser = () => {
    console.log('삭제')
    dropUser.mutate()
  }
  if (isLoading) {
    // refetch()
    return <div>Loading</div>
  }
  if (isError) {
    return <div>Error</div>
  }
  const saveModify = () => {
    setOpen(false)
    handleModify()
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleModify = async () => {
    if (isModify) {
      const ModifyData: ModifyUser = {
        phone,
        name,
      }
      console.log('전', cookies.access_token)
      console.log(accessToken)
      await modify.mutateAsync(ModifyData)
      console.log('동기')
      console.log('후', cookies.access_token)
      console.log(accessToken)
      await refetch()
    }
    setIsModify(!isModify)
  }
  const handleModifyFalse = () => {
    setIsModify(false)
  }
  return (
    <>
      <p className="my-10 text-3xl font-bold">계정 관리</p>
      <p className="my-6 text-2xl font-bold">기본 정보</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[33%] flex justify-evenly py-10 px-10 mb-10">
        {/* 프로필 이미지 */}
        <div className="bg-blue-300 rounded-full w-[200px] h-[200px]"></div>
        <div className="flex flex-col w-[60%]">
          <div className="text-2xl flex flex-col justify-center">
            <div className="flex justify-between">
              <p className="flex items-center">이름 </p>
              {isModify ? (
                <input
                  type="text"
                  placeholder={profileStore.name}
                  onChange={e => setName(e.target.value)}
                  value={name}
                  className="border-2 border-gray-200 rounded-lg px-4 py-1 my-1"
                />
              ) : (
                <p className="px-4 py-1 my-1">{profileStore.name}</p>
              )}
            </div>
            <div className="flex justify-between">
              <p className="flex items-center">연락처 </p>
              {isModify ? (
                <input
                  type="text"
                  placeholder={profileStore.phone}
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                  className="border-2 border-gray-200 rounded-lg px-4 py-1 my-1"
                />
              ) : (
                <p className="px-4 py-1 my-1">{profileStore.phone}</p>
              )}
            </div>
            <div className="flex justify-between">
              <p className="flex items-center">이메일 </p>
              <p className="px-4 py-1 my-1">{profileStore.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="flex items-center">출석일 </p>
              <p className="px-4 py-1 my-1">{profileStore.attendance}</p>
            </div>
            <div className="flex justify-end mt-1 text-base">
              {isModify ? (
                <div className="flex gap-2">
                  <button
                    className="py-2 px-4 bg-red-300 hover:bg-red-500 rounded-3xl"
                    onClick={handleModifyFalse}
                  >
                    취소
                  </button>
                  <button
                    className="py-2 px-4 bg-amber-300 rounded-3xl hover:bg-amber-500"
                    onClick={handleOpen}
                  >
                    저장
                  </button>
                </div>
              ) : (
                <button
                  className="py-2 px-4 bg-amber-300 rounded-3xl"
                  onClick={handleModify}
                >
                  수정하기
                </button>
              )}
            </div>
            <Backdrop invisible open={open}>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'정보를 수정하시겠습니까?'}
                </DialogTitle>
                <DialogActions className="my-2 mx-2">
                  <button
                    onClick={handleClose}
                    className="bg-red-300 hover:bg-red-500 rounded-xl px-4 py-2"
                  >
                    취소
                  </button>
                  <button
                    onClick={saveModify}
                    className="bg-gray-200 hover:bg-gray-500 rounded-xl px-4 py-2"
                  >
                    확인
                  </button>
                </DialogActions>
              </Dialog>
            </Backdrop>
          </div>
        </div>
      </div>
      <p className="my-6 text-2xl font-bold">비밀번호</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[10%] flex justify-between py-6 px-6 mb-10">
        <p className="flex flex-col justify-center">비밀번호를 변경합니다.</p>
        <div className="flex flex-col justify-center">
          <p className="py-2 px-4 bg-amber-400 rounded-3xl">비밀번호 변경</p>
        </div>
      </div>
      <p className="my-6 text-2xl font-bold">계정 삭제</p>
      <div className="border-4 border-amber-400 rounded-3xl w-full h-[10%] flex justify-between py-6 px-6 mb-10">
        <p className="flex flex-col justify-center">계정을 삭제합니다.</p>
        <div className="flex flex-col justify-center">
          <p
            className="py-2 px-4 bg-red-400 rounded-3xl cursor-pointer"
            onClick={handleDropUser}
          >
            계정 삭제
          </p>
        </div>
      </div>
    </>
  )
}

export default Profile
