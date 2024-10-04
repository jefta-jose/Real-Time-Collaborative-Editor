import React, { useCallback, useEffect, useState } from 'react'
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import './Editor.css'
import { io } from 'socket.io-client';


const Editor = () => {
  //access the socket from anywhere using state
  const [socket , setSoccket] = useState()
  const [quill, setQuill] = useState()


  //text design options ------------------------------------------------------------------------------------
  const toolBarOptions = [
    [{header: [1,2,3,4,5,6, false]}],
    [{font: []}],
    ['bold', 'italic', 'underline', 'strike'],
    [{color: []}, {background:[]}],
    [{script: "sub"}, {script: "super"}],
    [{align: []}],
    ["image", "background", "code-block"],
    ["clean"]
  ]

  //text editor -----------------------------------------------------------------------------------------------
  const wrapperRef = useCallback(wrapper =>{
    if (wrapper == null) return

    wrapper.innerHTML = '';
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {theme: 'snow' , modules: {toolbar: toolBarOptions}})
    setQuill(q);

  },[])

  //socket io connection --------------------------------------------------------------------------------------
  useEffect(()=>{
    const s = io('http://localhost:5000')
    setSoccket(s);

    return () => {
      s.disconnect()
    }

  },[]);

  //detect changes made by user
  useEffect(()=>{
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return
      //send changes to the server
      socket.emit('send-changes', delta)
    }
    quill.on('text-change', handler)

    //remove the event listener when its no longer needed
    return () => {
      quill.off('text-change', handler)
    }
  }, [socket , quill]);

  //handle broadcasting on the frontend
  useEffect(()=>{
    if (socket == null || quill == null) return

    const handler = (delta) => {
      quill.updateContents(delta)
    }
    socket.on('receive-changes', handler)

    //remove the event listener when its no longer needed
    return () => {
      socket.off('receive-changes', handler)
    }
  }, [socket , quill]);


  return (
    <div className='editor-container' ref={wrapperRef}>

    </div>
  )
}

export default Editor