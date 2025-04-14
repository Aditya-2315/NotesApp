import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNote, updateToNote } from "../features/noteSlice";
import { v4 as uuidv4 } from "uuid";


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const noteId = searchParams.get("noteId");
  const allNotes = useSelector((state)=> state.note.notes)
  const dispatch = useDispatch()

  useEffect(() => {
    if(noteId){
      const note = allNotes.find((n)=> n.Id === noteId)
      setTitle(note.title)
      setValue(note.content)
    }
  }, [noteId])
  

  const createNote = ()=>{
    const note = {
      title : title,
      content: value,
      Id: noteId || uuidv4(),
      createdAt : Date().toString()
    }
    if(noteId){
      dispatch(updateToNote(note))
    }
    else{
      dispatch(addToNote(note))
    }

    setTitle('')
    setValue('')
    setSearchParams({})
  }
  return (
    <>
    <div className="items-center flex flex-col">
        <h1 className="m-2 self-center font-extrabold text-3xl">Create Note Here</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 ">
          <input
            className="border md:px-3 md:py-2 md:min-w-[350px] md:text-lg text-sm px-2 py-2 rounded-lg"
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="md:mx-3 font-bold text-sm border cursor-pointer px-2 py-1 rounded-lg hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={createNote}
          disabled={title.length < 3 ||  value.length < 3}
          >
            {noteId ? "Update Note" : "Create Note"}
          </button>
        </div>
      </div>
      <div className="mt-3">
        <textarea
          value={value}
          placeholder="Enter content here"
          onChange={(e)=>{setValue(e.target.value)}}
          rows={20}
          className="border min-w-[300px] md:min-w-[500px] p-2 rounded-lg"
        />
      </div>
      </div>
    </>
  );
};

export default Home;
