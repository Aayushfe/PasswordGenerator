
import { useState ,useCallback, useEffect, useRef} from 'react'

function App() {
  let [length,setlength] =useState(8) ;
  let [number,setNumber] =useState(false) ;
  let [char,setChar] =useState(false);
  let [password,setPassword] =useState('');

  const passwordRef = useRef(null)

  const passwrdGenrator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTVUWXYZabcdefghijklmnopqrstuvwxyz";
    if(number)str+='123456789'
    if(char) str+= '!@#$%^&*{}[]'

    for(let i = 1;i<=length;i++){
      let charac = Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(charac)
    }
    setPassword(pass)
  },[length,number,char,setPassword])
  
  const copyPasswordToClip = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,199)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwrdGenrator()
  },[length,number,char,passwrdGenrator])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center mb-4'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' 
        value={password} 
        className='outline-none w-full py-1 px-3' 
        placeholder='password' 
        ref={passwordRef}
        readOnly/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' 
        onClick={copyPasswordToClip}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6} max={100} 
          value={length} className='cursor-pointer' 
          onChange={(e)=>{setlength(e.target.value)}}/>
          <label>Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input  type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              setNumber((prev) => !prev);
          }}/>
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                  setChar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
     </div>
    </>
  )
}

export default App
