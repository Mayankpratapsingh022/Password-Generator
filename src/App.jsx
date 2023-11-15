import React, { useState, useCallback,useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

//useRef hook

const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzs";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-=_+[]{}|;:'~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setpassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setpassword]);


const copyPasswordToClipboard = useCallback(()=>{
passwordRef.current?.select()
passwordRef.current?.setSelectionRange(0,length)
window.navigator.clipboard.writeText(password)

},[password])


useEffect(()=> {
passwordGenerator()

},[length,numberAllowed,charAllowed,passwordGenerator])



  return (
    <>
      <div className="w-full h-screen bg-gray-600 p-4">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500  bg-gray-800">
          <h1 className="text-4xl text-center my-3 p-10 text-white">
            Password Generotor
          </h1>
        </div>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none text-xl font-bold rounded-none w-full py-2 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700  hover:bg-blue-500 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white p-2">length : {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className=" p-2 cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-white p-2">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              className=" p-2 cursor-pointer"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label className="text-white p-2">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
