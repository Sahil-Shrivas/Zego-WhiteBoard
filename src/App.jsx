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
  try {
    console.log('Starting whiteboard initialization...');
    
    await zegoSuperBoard.init(zg, {
      parentDomID: 'parentDomID', // D of the parent container to be mounted to.
      appID, // The AppID you get.
      userID, // User-defined ID
      token // The Token you get that used for validating the user identity.
  });
  console.log('ZegoSuperBoard initialized successfully');

  await zg.loginRoom(roomID, token, {userID, userName}, {userUpdate: true});
  console.log('Logged into room successfully');
  
  const view = await zegoSuperBoard.createWhiteboardView({
      name: 'Sahil Virtual WhiteBoard', // Whiteboard name
      perPageWidth: 1600, // Width of each whiteboard page
      perPageHeight: 900, // Height of each whiteboard page
      pageCount:1 // Page count of a whiteboard
  });
  console.log('Whiteboard view created:', view);
  
  // Mount the whiteboard to the parent container
  const superBoardView = zegoSuperBoard.getSuperBoardView();
  if (superBoardView) {
    const zegoSuperBoardSubView = superBoardView.getCurrentSuperBoardSubView();
    if (zegoSuperBoardSubView) {
      const model = zegoSuperBoardSubView.getModel();
      const uniqueID = model.uniqueID;
      const result = await superBoardView.switchSuperBoardSubView(uniqueID);
      console.log('Whiteboard mounted:', result);
    }
  }
  
  // Set up drawing mode and tools immediately after mounting
  try {
    // Enable drawing mode
    const superBoardView = zegoSuperBoard.getSuperBoardView();
    console.log('SuperBoard view:', superBoardView);
    
    if (superBoardView) {
      const currentSubView = superBoardView.getCurrentSuperBoardSubView();
      console.log('Current sub view:', currentSubView);
      
      if (currentSubView) {
        // ZegoSuperBoardOperationMode.Draw = 4
        currentSubView.setOperationMode(4);
        console.log('Drawing mode enabled');
        
        // Set default tool to pen
        zegoSuperBoard.setToolType(1);
        setCurrentTool(1);
        console.log('Pen tool set as default');
        
        // Set some default brush properties
        zegoSuperBoard.setBrushColor('#000000');
        zegoSuperBoard.setBrushSize(3);
        console.log('Brush color and size set');
        
        // Test if we can get tool info
        const toolType = zegoSuperBoard.getToolType();
        console.log('Current tool type:', toolType);
        
        // Test brush properties
        const brushColor = zegoSuperBoard.getBrushColor();
        const brushSize = zegoSuperBoard.getBrushSize();
        console.log('Brush color:', brushColor, 'Brush size:', brushSize);
        
      } else {
        console.error('No current sub view found');
      }
    } else {
      console.error('No super board view found');
    }
  } catch (error) {
    console.error('Error in setup:', error);
  }
  
  } catch (error) {
    console.error('Error initializing whiteboard:', error);
  }
}


useEffect(()=>{
  console.log('Environment variables check:');
  console.log('VITE_APP_ID:', import.meta.env.VITE_APP_ID);
  console.log('VITE_USER_ID:', import.meta.env.VITE_USER_ID);
  console.log('VITE_ROOM_ID:', import.meta.env.VITE_ROOM_ID);
  console.log('VITE_TOKEN:', import.meta.env.VITE_TOKEN ? 'SET' : 'NOT SET');
  console.log('VITE_SERVER:', import.meta.env.VITE_SERVER);
  
  if(zegoSuperBoard){
    initBoard()
  }
},[zegoSuperBoard])
  return (
    <div className='h-[100vh] bg-gray-100 w-full relative' >
      <div id="parentDomID" className='w-full h-full border-2 border-blue-500 relative'>
        <div className="absolute top-4 right-4 bg-white p-2 rounded shadow z-50">
          <p className="text-sm">Whiteboard Container</p>
          <p className="text-xs text-gray-600">Current Tool: {currentTool}</p>
          <p className="text-xs text-gray-600">Status: {currentTool ? 'Tool selected' : 'No tool'}</p>
        </div>
        {/* Test overlay to see if container is interactive */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <p className="text-gray-400 text-lg">Whiteboard Area</p>
        </div>
      </div>
      <Tools currentTool={currentTool} onClick={(tool)=>{
        console.log('=== Tool clicked ===');
        console.log('Tool name:', tool.name);
        console.log('Tool type:', tool.type);
        
        try {
          // Ensure drawing mode is enabled
          const superBoardView = zegoSuperBoard.getSuperBoardView();
          if (superBoardView) {
            const currentSubView = superBoardView.getCurrentSuperBoardSubView();
            if (currentSubView) {
              currentSubView.setOperationMode(4); // Draw mode
              console.log('Drawing mode re-enabled');
            }
          }
          
          zegoSuperBoard.setToolType(tool.type);
          setCurrentTool(tool.type);
          console.log('Tool set successfully:', tool.name);
          
          // Verify the tool was set
          const currentToolType = zegoSuperBoard.getToolType();
          console.log('Current tool type after setting:', currentToolType);
          
        } catch (error) {
          console.error('Error setting tool:', error);
        }
      }}/>
    </div>
  )
}

export default App
