'use client'
import { useState } from 'react';
import { useSocket } from './context/socketProvider'
import classes from './page.module.css'
export default function page(){
  const {sendMessage} = useSocket();
  const [message, setMessage]= useState('')
  return(

    <div>
      <div>
        <h1>All messages will appear here</h1>
      </div>
      <div>

        <input 
        className={classes["chat-input"]} 
        onChange={(e)=>{setMessage(e.target.value)}}
        placeholder='Message...'/>
        <button 
        className={classes["send-button"]}
         onClick={(e)=>{sendMessage(message)}}
        >Send</button>
      </div>
    </div>
  )
}