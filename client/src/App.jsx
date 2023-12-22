import React from 'react';
import './App.css';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
// import { useState } from 'react';
import axios from 'axios';

function App() {

  const [code , setCode] = React.useState( "a = 0");

 const handleCodeChanged = React.useCallback((editor , change) =>{
  // console.log('val',editor);
  setCode(editor);
 },[]);

 const displayChangedCode = () => {
  axios.post('http://localhost:8080/leetcode', { code })
  .then(({data}) => console.log(data));
  // console.log(code);

 };

  return (
    <div className="App">
      <div className="text-3xl font-bold underline">
        Create a function that adds two numbers in python.
      </div>
      <div className='absolute top-20 bottom-40 left-10 right-10'>
        <CodeMirror
          value={code}
          options={{
            theme: 'dracula',
            keyMap: 'sublime',
            mode:'python',
          }}
          onChange={handleCodeChanged}
          // onChange={(editor,change)=>{
          //   setCode(editor);
          // }}
        />
        </div>
        <div className="button" onClick={displayChangedCode}>Submit</div>
      
    </div>
  );
}

export default App;
