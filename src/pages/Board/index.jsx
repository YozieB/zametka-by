import { useEffect, useState } from 'react'
import { Header } from '../../components/Header/index.jsx'
import { Notes } from '../../components/Notes/index.jsx'
import { SideModal } from '../../components/SideModal/index.jsx'
import { RemoveModal } from '../../components/RemoveModal/index.jsx'
import { Filter } from '../../components/Filter/index.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { getNotes, getUserData } from '../../api/api.js'
import {
  useBoardStore,
  useNotesStore,
  useUserStore,
} from '../../store/store.js'
import { Oval } from 'react-loader-spinner'
export const Board = () => {
  const [sideModalVisible, setSideModalVisible] = useState(false)
  const [noteModalVariant, setNoteModalVariant] = useState(null)
  const [removeModalVisible, setRemoveModalVisible] = useState(false)
  const [isNotesLoading, setIsNotesLoading] = useState(true)
  const setNotes = useNotesStore(state => state.setNotes)
  const setActiveBoard = useBoardStore(state => state.setActiveBoard)
  const navigate = useNavigate()
  const setUser = useUserStore(state => state.setUser)
  const { boardId } = useParams()
  useEffect(() => {
    setIsNotesLoading(true)

    getNotes(boardId)
      .then(response => {
        setNotes(response.documents[0].notes)
        setActiveBoard(response.documents[0])
        localStorage.removeItem('possibleBoard')
        getUserData().then(userData => setUser(userData))
      })
      .catch(() => {
        if (boardId && boardId.length === 20) {
          localStorage.setItem('possibleBoard', boardId)
          navigate('/')
        } else {
          navigate('/error')
        }
      })
      .finally(() => setIsNotesLoading(false))
  }, [])

  const openCreateNoteModal = () => {
    setSideModalVisible(true)
    setNoteModalVariant('create')
  }

  const openEditNoteModal = () => {
    setSideModalVisible(true)
    setNoteModalVariant('edit')
  }

  const closeSideModal = () => {
    setSideModalVisible(false)
  }

  const closeRemoveModal = () => {
    setRemoveModalVisible(false)
  }

  const openRemoveNoteModal = () => {
    setRemoveModalVisible(true)
  }

  return (
    <main
      className="flex flex-col gap-y-[20px] pl-[24px] pr-[24px] pb-[32px] select-none h-[100%] max-w-[1515px] mx-[auto]"
      style={{ scrollbarGutter: 'stable' }}
    >
      {isNotesLoading ? (
        <Oval
          height={35}
          width={35}
          color="#626268"
          wrapperStyle={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
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
          <Header handleOpenCreateNoteModal={openCreateNoteModal} />
          <Filter />
          <Notes
            handleOpenCreateNoteModal={openCreateNoteModal}
            handleOpenEditNoteModal={openEditNoteModal}
            handleOpenRemoveNoteModal={openRemoveNoteModal}
          />
        </>
      )}

      <SideModal
        heading={noteModalVariant === 'create' ? 'Add New Note' : 'Edit note'}
        subHeading={
          noteModalVariant === 'create' ? 'Create New Note' : 'Edit note'
        }
        handleClose={closeSideModal}
        isVisible={sideModalVisible}
        variant={noteModalVariant}
        addButtonText={noteModalVariant === 'create' ? 'Add' : 'Save Changes'}
      />
      <RemoveModal
        heading="Delete Note?"
        description="By deleting this note, you have no longer access to this data!"
        handleClose={closeRemoveModal}
        isVisible={removeModalVisible}
        variant="note"
      />
    </main>
  )
}
