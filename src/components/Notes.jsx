import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromNote } from '../features/noteSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";


const Notes = () => {
  const notes = useSelector((state) => state.note.notes)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')

  function handleDelete(noteId) {
    dispatch(removeFromNote(noteId))
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear().toString().slice(-2);
    return `${month} ${day},${year}`;
  };

  const filteredData = notes.filter(
    (note) => note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className='items-center flex flex-col p-5'>
      <input type="search" placeholder='search here' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border px-3 py-2 rounded-lg min-w-[300px] md:min-w-2xl' />
      <div className='flex flex-col gap-4 mt-4 border p-2 rounded-lg md:min-w-2xl'>
        <h1 className='font-extrabold text-4xl'>All Notes</h1>
        {
          filteredData.length > 0 && filteredData.map(
            note => (
              <div
                className='border p-2 rounded-lg flex gap-5 md:min-w-[400px] min-w-[200px] justify-between'
                key={note.Id}>
                <div className='flex flex-col gap-1 '>
                  <div className='md:text-3xl text-xl line-clamp-1 font-extrabold '>
                    {note.title}
                  </div>
                  <div className='text-lg line-clamp-1'>
                    {note.content}
                  </div>
                </div>
                <div className='ml-2 flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <button className='py-2 px-1.5 border rounded-md cursor-pointer hover:bg-black hover:text-white hover:font-extrabold'>
                      <Link to={`/?noteId=${note?.Id}`}>
                        <CiEdit />
                      </Link>
                    </button>
                    <button className='py-2 px-1.5  border rounded-md cursor-pointer hover:bg-black hover:text-white hover:font-extrabold'>
                      <Link to={`/notes/:${note?.Id}`}>
                        <GrView />
                      </Link>
                    </button>
                    <button className='py-2 px-1.5 border rounded-md cursor-pointer hover:bg-black hover:text-white hover:font-extrabold' onClick={() => handleDelete(note?.Id)}>
                      <MdOutlineDeleteOutline />
                    </button>
                    <button className='py-2 px-1.5 border rounded-md cursor-pointer hover:bg-black hover:text-white hover:font-extrabold' onClick={() => {
                      navigator.clipboard.writeText(note?.content)
                      toast.success("Copied to Clipboard!!")
                    }}>
                      <IoCopyOutline className='hover:font-extrabold' />
                    </button>
                    <button className='py-2 px-1.5 border rounded-md cursor-pointer hover:bg-black hover:text-white hover:font-extrabold'
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.href}/${note?.Id}`)
                      toast.success("Link Copied to Clipboard!!")}}
                    
                    >
                      <IoShareSocialOutline />
                    </button>
                  </div>
                  <div className='flex items-center gap-1.5 self-center'>
                  <CiCalendar />
                    {formatDate(note.createdAt)}
                  </div>
                </div>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Notes