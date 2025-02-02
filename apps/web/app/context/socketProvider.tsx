"use client"

import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {Socket, io} from 'socket.io-client'

interface SocketProviderProps {
    children: ReactNode;
  }
  interface ISocketContext{
    sendMessage:(msg:string)=>any;
    messages: string[];
  }

  const SocketContext = createContext<ISocketContext|null>(null);

  export const useSocket =()=>{
    const state = useContext(SocketContext);
    if(!state)throw new Error(`state is undefined`)
    return state;
  }
  export const SocketProvider = ({ children }: SocketProviderProps) => {
        const [socket, setSocket]= useState<Socket>() 
        const [messages, setMessages]= useState<string[]>([])
        const sendMessage: ISocketContext['sendMessage'] = useCallback((msg)=>{
            console.log('send message',msg)
            if(socket){
                socket.emit('event:message',{message:msg})
            }
        },[socket])
        
        const onMessageRec = useCallback((msg:string)=>{
            console.log("From Server Message Recived", msg)
            const {message} = JSON.parse(msg) as {message:string}
            setMessages((prev)=>[...prev, message])
        },[])

        useEffect(()=>{
            const _socket = io("http://localhost:4000")
            _socket.on('message', onMessageRec)
            setSocket(_socket)
            return()=>{
                _socket.disconnect();
                _socket.off('message', onMessageRec)
                setSocket(undefined);
            }
                },[])
    return (
      <SocketContext.Provider value={{sendMessage, messages }}>
        {children}
      </SocketContext.Provider>
    );
  };