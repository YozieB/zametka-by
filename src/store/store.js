import { create } from 'zustand'
import {
  createBoard,
  createNote,
  deleteBoard,
  deleteNote,
  getBoards,
  getNotes,
  getUserData,
  googleLogin,
  updateNoteData,
  updateNoteStatus,
} from '../api/api.js'

export const useNotesStore = create((set, get) => ({
  notes: [],
  setNotes: notes => {
    set(() => ({
      notes,
    }))
  },
  filteredNotes: [],
  activeFilter: '',
  setActiveFilter: filter => {
    set(() => ({
      activeFilter: filter,
    }))
  },
  availableOptions: ['Critical', 'Normal', 'Checked'],
  editNoteData: {},
  noteToRemove: {},
  isNotesLoading: false,
  isAddNoteLoading: false,
  isSetNoteCheckedLoading: false,
  isUpdateNoteLoading: false,
  isDeleteNoteLoading: false,
  fetchNotes: id => {
    getNotes(id).then(response => {
      set({
        notes: response.documents[0].notes,
      })
    })
  },
  addNote: note => {
    set(() => ({
      isAddNoteLoading: true,
    }))
    createNote(note)
      .then(response => {
        set(state => ({
          notes: [...state.notes, response],
          activeFilter: response.status,
        }))
        get().filterNotesByStatus(response.status)
      })
      .finally(() => {
        set(() => ({
          isAddNoteLoading: false,
        }))
      })
  },
  setNoteChecked: note => {
    set(() => ({
      isSetNoteCheckedLoading: true,
    }))
    updateNoteStatus(note, 'Checked')
      .then(response => {
        set(state => ({
          notes: state.notes.map(el => {
            if (el.$id === response.$id) {
              el = response
            }
            return el
          }),
          activeFilter: 'Checked',
        }))
        get().filterNotesByStatus('Checked')
      })
      .finally(() => {
        set(state => ({
          isSetNoteCheckedLoading: false,
        }))
      })
  },
  setEditNoteData: noteData => {
    set(() => ({
      editNoteData: noteData,
    }))
  },
  updateNote: (note, data) => {
    set(() => ({
      isUpdateNoteLoading: true,
    }))
    updateNoteData(note, data)
      .then(response => {
        set(state => ({
          notes: state.notes.map(el => {
            if (el.$id === response.$id) {
              el = response
            }
            return el
          }),
          activeFilter: response.status,
        }))
        get().filterNotesByStatus(response.status)
      })
      .finally(() => {
        set(() => ({
          isUpdateNoteLoading: false,
        }))
      })
  },
  deleteNote: note => {
    set(() => ({
      isDeleteNoteLoading: true,
    }))
    deleteNote(note)
      .then(response => {
        set(state => ({
          notes: state.notes.filter(el => el.$id !== note.$id),
          filteredNotes: state.notes.filter(el => el.$id !== note.$id),
          activeFilter: '',
        }))
      })
      .finally(() => {
        set(() => ({
          isDeleteNoteLoading: false,
        }))
      })
  },
  setNoteToRemove: note => {
    set(() => ({
      noteToRemove: note,
    }))
  },
  filterNotesByStatus: status => {
    set(state => ({
      filteredNotes: state.notes.filter(el => {
        if (state.availableOptions.includes(status)) {
          // if (!state.availableOptions.includes(el.status)) {
          //   console.log('nety')
          // }
          return el.status === status
        }
        return state.notes
      }),
    }))
  },
}))

export const useUserStore = create(set => ({
  user: {},
  setUser: userData => {
    set(() => ({
      user: userData,
    }))
  },
}))

export const useBoardStore = create(set => ({
  boards: [],
  activeBoard: {},
  setActiveBoard: board => {
    set(() => ({
      activeBoard: board,
    }))
  },
  isAddBoardLoading: false,
  isDeleteBoardLoading: false,
  addBoard: board => {
    set(() => ({
      isAddBoardLoading: true,
    }))
    createBoard(board)
      .then(response => {
        set(state => ({
          boards: [...state.boards, response],
        }))
      })
      .finally(() => {
        set(() => ({
          isAddBoardLoading: false,
        }))
      })
  },
  setBoards: el => {
    set(() => ({
      boards: el,
    }))
  },
  boardToRemove: {},
  setBoardToRemove: board => {
    set(() => ({
      boardToRemove: board,
    }))
  },
  deleteBoard: board => {
    set(() => ({
      isDeleteBoardLoading: true,
    }))
    deleteBoard(board)
      .then(response => {
        set(state => ({
          boards: state.boards.filter(el => el.$id !== board.$id),
        }))
      })
      .finally(() => {
        set(() => ({
          isDeleteBoardLoading: false,
        }))
      })
  },
}))
