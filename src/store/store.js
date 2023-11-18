import { create } from 'zustand'
import { createNote, getNotes } from '../api/api.js'

export const useNotesStore = create(set => ({
  notes: [],
  isNotesLoading: false,
  isAddNoteLoading: false,
  fetchNotes: () => {
    getNotes().then(r => {
      set({ notes: r.documents })
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
        }))
      })
      .finally(() => {
        set(() => ({
          isAddNoteLoading: false,
        }))
      })
  },
}))
