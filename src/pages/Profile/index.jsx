import React, { useEffect, useState } from 'react'
import { getBoards, getUserData, logout } from '../../api/api.js'
import { Button } from '../../components/Button/index.jsx'
import editIcon from '../../icons/edit.svg'
import { useNavigate } from 'react-router-dom'
import { useBoardStore, useUserStore } from '../../store/store.js'
import { Oval } from 'react-loader-spinner'
import { SideModal } from '../../components/SideModal/index.jsx'
import { ProfileBoard } from '../../components/ProfileBoard/index.jsx'
import { RemoveModal } from '../../components/RemoveModal/index.jsx'

export const Profile = () => {
  const navigate = useNavigate()
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const [isLoading, setIsLoading] = useState(true)
  const [isLogoutLoading, setIsLogoutLoading] = useState(false)
  const [sideModalVisible, setSideModalVisible] = useState(false)
  const [removeModalVisible, setRemoveModalVisible] = useState(false)
  const setBoards = useBoardStore(state => state.setBoards)
  const boards = useBoardStore(state => state.boards)

  const closeSideModal = () => {
    setSideModalVisible(false)
  }

  const openSideModal = () => {
    setSideModalVisible(true)
  }

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const userData = await getUserData()
      setUser(userData)
      const fetchedBoards = await getBoards(userData.$id)
      setBoards(fetchedBoards.documents)
    } catch {
      navigate('/error')
    }
    setIsLoading(false)
  }

  const handleUserLogout = () => {
    setIsLogoutLoading(true)
    logout()
      .then(r => {
        setUser({})
        navigate('/')
      })
      .finally(() => setIsLogoutLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const closeRemoveModal = () => {
    setRemoveModalVisible(false)
  }

  const openRemoveModal = () => {
    setRemoveModalVisible(true)
  }

  return (
    <section className="h-[100%] p-[25px] bg-[#ECEDF0] w-[100%]">
      <div className="h-[100%] flex flex-col items-center justify-center gap-y-[10px] bg-[#fff] rounded-[12px] relative">
        {isLoading ? (
          <Oval
            height={30}
            width={30}
            color="#626268"
            wrapperStyle={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="transparent"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        ) : (
          <>
            <div className="absolute top-[15px] flex justify-between right-[20px] gap-x-[8px]">
              <Button
                variant="solid"
                extraClasses="min-h-[30px] h-[30px] text-[14px] flex items-center gap-x-[8px] font-semibold"
                onClick={openSideModal}
                disabled={boards.length >= 2}
              >
                Create Board
                <img alt="plus" src={editIcon} />
              </Button>
              <Button
                onClick={handleUserLogout}
                variant="delete"
                extraClasses="min-h-[30px] h-[30px] text-[14px] flex items-center font-semibold"
                isLoading={isLogoutLoading}
              >
                Logout
              </Button>
            </div>
            <div className="absolute bottom-[16px] flex items-center gap-x-[8px]">
              <p className="text-[#7E7E80] text-[12px]">Boards limit</p>
              <p className="text-[#7E7E80] text-[12px]">{boards.length} / 2</p>
            </div>
            <h1 className="font-bold text-2xl">Welcome, {user.name}</h1>
            <p className="mb-2 text-center">
              This is your profile page, here you can create boards
            </p>
            {boards.length ? (
              <div className="flex gap-[22px]">
                {boards.map(el => (
                  <ProfileBoard
                    key={el.$id}
                    board={el}
                    handleOpenRemoveModal={openRemoveModal}
                  />
                ))}
              </div>
            ) : (
              <p className="text-[#7E7E80] text-[14px]">
                You have no active boards
              </p>
            )}
          </>
        )}
      </div>
      <SideModal
        heading="Create board"
        subHeading="Create New Board"
        handleClose={closeSideModal}
        isVisible={sideModalVisible}
        variant="board"
        addButtonText="Create"
      />
      <RemoveModal
        heading="Delete Board?"
        description="By deleting this board, you have no longer access to this board and notes in it!"
        handleClose={closeRemoveModal}
        isVisible={removeModalVisible}
        variant="board"
      />
    </section>
  )
}
