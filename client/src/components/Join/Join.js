import React,{useState} from "react";
import {Link} from 'react-router-dom';  //used to link to /chat path
import './Join.css';
import LiveConnectTitle from '../Title/Title';

const Join=()=>{
const [name,setName]=useState('');
const [room,setRoom]=useState('');
const [language,setLanguage]=useState('en');



    return (
    <div>
    <LiveConnectTitle/>
    <div className="joinOuterContainer">
    <div className="joinInnerContainer">
      <h1 className="heading">Join</h1>
      <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} ></input></div>
      <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} ></input></div>
      <div>
      {/* Language Dropdown */}
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh-CN">Chinese</option>
      </select>
      </div>
      <Link onClick={event=>(!room||!name)?event.preventDefault():console.log("User Details:",{room,name,language})} to={`/Chat?name=${name}&room=${room}&language=${language}`}>
        <button className="button mt-20" type="submit">Sign In</button>
      </Link>
    </div>
</div>
    </div>
    )
    
}

export default Join;