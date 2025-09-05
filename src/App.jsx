import React, { useEffect, useState } from 'react'
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import Tools from './Tools';
function App() {
const appID = Number(import.meta.env.VITE_APP_ID)
const userID = import.meta.env.VITE_USER_ID
const roomID = import.meta.env.VITE_ROOM_ID          
const userName = import.meta.env.VITE_USER_NAME
const [currentTool, setCurrentTool] = useState(null)
const token = import.meta.env.VITE_TOKEN
const server = import.meta.env.VITE_SERVER
const zg = new ZegoExpressEngine(appID, server);
const zegoSuperBoard = ZegoSuperBoardManager.getInstance();
const initBoard=async ()=>{
  await zegoSuperBoard.init(zg, {
    parentDomID: 'parentDomID', // D of the parent container to be mounted to.
    appID, // The AppID you get.
    userID, // User-defined ID
    token // The Token you get that used for validating the user identity.
});

await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
setCurrentTool(zegoSuperBoard.getToolType())
await zegoSuperBoard.createWhiteboardView({
    name: 'Sahil Virtual WhiteBoard', // Whiteboard name
    perPageWidth: 1600, // Width of each whiteboard page
    perPageHeight: 900, // Height of each whiteboard page
    pageCount:1 // Page count of a whiteboard
});
}


useEffect(()=>{
  if(zegoSuperBoard){
    initBoard()
  }
},[zegoSuperBoard])
  return (
    <div className='h-[100vh] bg-black w-full' >
      <div id="parentDomID" className='w-full h-full'></div>
      <Tools currentTool={currentTool} onClick={(tool)=>{
        zegoSuperBoard.setToolType(tool.type)
        setCurrentTool(tool.type)
      }}/>
    </div>
  )
}

export default App
