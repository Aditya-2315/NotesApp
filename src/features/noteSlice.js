import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: localStorage.getItem("notes")?JSON.parse(localStorage.getItem("notes")):[]
  },
  reducers: {
    addToNote: (state,action) => {
      const note = action.payload
      state.notes.push(note)
      localStorage.setItem("notes",JSON.stringify(state.notes))
      toast("Note Created!!!")
    },
    updateToNote: (state,action) => {
      const note = action.payload
      const index = state.notes.findIndex((item)=>item.Id === note.Id)
      if (index>=0) {
        state.notes[index] = note
        localStorage.setItem("notes",JSON.stringify(state.notes))
        toast("Note Updated Successfully !!")
      }

    },
    resetAllNote: (state, action) => {
      state.notes = []
      localStorage.removeItem("notes")
    },
    removeFromNote:(state,action)=>{
      const noteId = action.payload

      const index = state.notes.findIndex((item)=>item.Id === noteId)
      if (index>=0) {
        state.notes.splice(index,1)
        localStorage.setItem("notes", JSON.stringify(state.notes))

        toast("Note Deleted Successfully!!")
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToNote,updateToNote,removeFromNote,resetAllNote } = noteSlice.actions

const noteReducer = noteSlice.reducer

export default  noteReducer