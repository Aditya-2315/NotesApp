import React from 'react'
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { toast } from 'react-toastify'
import { IoCopyOutline } from "react-icons/io5";


const ViewNote = () => {
  const { id } = useParams()
  const clearnedId = id.replace(/^:/, "")
  const allNotes = useSelector((state) => state.note.notes)
  const note = allNotes.filter((n) => n.Id === clearnedId)[0]

  return (
    <>
        <div className="items-center flex flex-col">

      <div className="flex flex-col gap-2">
        <h1 className="m-2 self-center font-extrabold text-3xl">View Note</h1>
        <div className="flex gap-3 place-content-between">
          <input
            className="border md:px-3 py-2 md:min-w-[430px] min-w-[240px] md:text-lg text-sm px-2 rounded-lg"
            type="text"
            value={note.title}
            placeholder="Enter your title"
            disabled
          />
          <button 
          className='ml-2 border py-2 rounded-lg px-3 cursor-pointer hover:bg-black hover:text-white'
          onClick={() => {
            navigator.clipboard.writeText(note?.content)
            toast.success("Copied to Clipboard!!")
          }}><IoCopyOutline /></button>
        </div>
      </div>
      <div className="mt-3">
        <textarea
          placeholder="Enter content here"
          value={note.content}
          rows={20}
          disabled
          className="border min-w-[300px] md:min-w-[500px] p-2 rounded-lg"
        />
      </div>
      </div>

    </>

  )
}

export default ViewNote