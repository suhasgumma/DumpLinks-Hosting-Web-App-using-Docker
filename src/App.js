import React, {useEffect, useState} from 'react';
import './App.css';
// import useLocalStorage from 'use-local-storage';
import {db} from "./Firebase";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import  dbk  from './hero-pattern-dark.webp';
import  lbk  from './hero-pattern.webp';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import LightModeIcon from '@mui/icons-material/LightMode';
function App() {
  const [user, setuser] =useState("");
  let time=Date().toLocaleString();
  const [message, setmessage] =useState("done!");
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const empty={color:"rgb(15, 23, 42)"};
  const [open, setOpen] = useState(false);
  const  vertical="bottom";
  const horizontal= "center";


  const [l, setl] =useState(0);
  const [t, sett] =useState(0);
  const [links, setlinks] =useState({});
  // const [texts, settexts] =useState({});






  ///////////////theme change///////////
  const [isdark,setisdark]=useState(false);
const [toggle, settoggle] =useState(false);
const [theme, settheme]=useState("Dark");
const [body,setbody]=useState(empty);
const [torso,settorso]=useState(empty);
const bodyD={
"backgroundColor": "rgba(17, 24, 39, 0.9)",
"color": "#fff"
};

const bluebutton={
background: "#336fd1",
boxshadow:"0px 24px 38px 3px hsla(0,0%,0%,0.14), 0px 9px 46px 8px hsla(0,0%,0%,0.12), 0px 11px 15px -7px hsla(0,0%,0%,0.2)"
};
const brownbutton={
  background: "#46576e",
  boxshadow:"0px 24px 38px 3px hsla(0,0%,0%,0.14), 0px 9px 46px 8px hsla(0,0%,0%,0.12), 0px 11px 15px -7px hsla(0,0%,0%,0.2)"
  };


const [textfeilds,settextfeilds]=useState(empty);
const textfeildsD={
border:"1.8px solid #333333",
"backgroundColor": "#111827",
"color": "#fff"
};

const themeset =( x)=>{
  if (x===false )
  {
    setisdark(false);
    settheme("Dark ");
    setbody(empty);
    settextfeilds(empty);
    settorso(empty);
  }
  else{
    setisdark(true);
    settheme("Light ");
    setbody(bodyD);
    settextfeilds(textfeildsD);
    settorso({"backgroundColor":"#111827"});
  }

};

const themechange =(e)=>{
  themeset(e.target.checked);
}
useEffect(()=> {themeset(defaultDark);settoggle(defaultDark)},[]);
/////////////////////////////////////theme end



////////////////////////create boxxes

function linkchange(key , e){
  let temp={...links}
  temp[key]=e.target.value
  setlinks(temp);

}

// function textchange(key , e){
//   let temp={...texts}
//   temp[key]=e.target.value
//   settexts(temp);

// }

////////////////////////////







/////////////////////data fetch //////////////
function getlinks(){
  if(user==""){
    return
  }
  let data;
  setl(0);
  sett(0);
  setlinks({});
  // settexts({});
  
      db.collection("user-data").doc(user).get().then((doc) => {
        if (doc.exists) {
            data= doc.data();
            setl(data['L']);
            sett(data['T']); 
            setlinks(data) 

            // for(let x=1;x<=data['L'];x++){
            //   const temp="link"+x;
            //   setlinks(links => ({...links,[temp]:data[temp]}))
            // } 
            // for(let x=1;x<=data['T'];x++){
            //   const temp="text"+x;
            //   settexts(texts => ({...texts,[temp]:data[temp]}))
            // } 
            

            setmessage(" fetching data !!!") ;
            setOpen(true);
          
        } else {
          const obj={
            L:3,
            T:2,
            link1:"",
            link2:"",
            link3:"",
            text1:"",
            text2:""
          };
          db.collection("user-data").doc(user).set(obj);
          data=obj;
          setl(data['L']);
          sett(data['T']);  
          setlinks({ link1:"",
          link2:"",
          link3:"",
          text1:"",
          text2:""});
          

          setmessage("  new key created !!!") ;
          setOpen(true);
        }
    }).catch((error) => {
    });
  
  handletrash();
    
  
  
    }
/////////////////////////////////get links





const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen(false);
};

const keychange=(e)=> {
  if (e.key === 'Enter') {
    getlinks()
  }

}



function linkupdate(key){
  db.collection("user-data").doc(user).update({
    [key] : links[key]
   
});

time=Date().toLocaleString();
let pp={ [time]:links[key]};
db.collection("trash").doc(user).get().then((doc) => {
  if (doc.exists) {
    db.collection("trash").doc(user).update(pp);
  }
  else{
    db.collection("trash").doc(user).set(pp);
  }
});


}

const saveHit=(key,e)=>{
  if (e.key === 'Enter') {
    linkupdate(key);
    setOpen(true); 
    setmessage("Data Saved !!!");

  }

};

// function textupdate(key){
//   db.collection("user-data").doc(user).update({
//     [key] : links[key]
   
// });

// }
//////////////////////////////////////////////////
const addlink=(LorT)=>{
  let temp;
  if (LorT==0){
    temp="link"+(l+1);
    db.collection("user-data").doc(user).update({"L" : (l+1)});
    setl(l+1);
  }
  if (LorT==1){
    temp="text"+(t+1);
    db.collection("user-data").doc(user).update({"T" : (t+1)});
    sett(t+1);
  }
 
db.collection("user-data").doc(user).update({
  [temp] : ""
 
});

  
  setlinks(links => ({...links,[temp]:""}))


};



//////////////////getting ip
const iplink="https://ipinfo.io?token=31306b6ed07e9c";
let ip;

async function getip(){
let res;
  await fetch(iplink).then((response) => response.json())
  .then((jsonResponse) => res={ip:jsonResponse['ip'],loc:jsonResponse['loc']})
    .catch((e)=> res="unkown")
return res;
};




async function  handletrash(){
  time=Date().toLocaleString();
  ip=await getip();
  let pp={ [time]:ip};
  db.collection("keyData").doc(user).get().then((doc) => {
    if (doc.exists) {
      db.collection("keyData").doc(user).update(pp);
    }
    else{
      db.collection("keyData").doc(user).set(pp);
    }
  });



};
  
///////////////////////////////////






  return (
    


  <div className='body' style={body}>

<div className="sticky">
<div className='header' style={body}>
<a className='title1' style={body} href='/' title="dumplinks.ga" >Dump<span style={{color:"#3c82f6"}}>L</span>inks</a>


<div className='toggle' title="change theme" >
<LightModeIcon  style={{opacity:isdark?"1":"0.5",marginRight:"5px"}} />
<label className="switch">
  <input  type="checkbox" checked={toggle}  onChange={(e)=>{settoggle(e.target.checked); themechange(e)}}/>
  <span className="slider round"></span>
</label>
<DarkModeIcon  style={{opacity:isdark?"0.5":"1"}}/>
</div>


</div>
</div>





<div className="torso" style={torso}>
<img src={dbk} style={{display:isdark?"block":"none"}} className="lighting1"/>
<img src={lbk} style={{display:isdark?"none":"block"}} className="lighting2"/>


























<div className="key" >
    
  <p className="description">Dumplinks is a platform to share links & texts between devices(pc ⇄ phone).
First time users enter any key of your own choice and hit <b>get data </b>
 to create a new key. Enter the same key later and hit <b>get data </b> to get the data saved.</p>
  <div className='key_input'> 
  <input style={textfeilds}   autoFocus  type="textbox" placeholder="*Enter key" className="copyLinkInput1"  onChange={(e)=>{setuser(e.target.value);}} onKeyPress={keychange} value={user} />

  <button  style ={{background: "#3c82f6",
boxshadow:"0px 24px 38px 3px hsla(0,0%,0%,0.14), 0px 9px 46px 8px hsla(0,0%,0%,0.12), 0px 11px 15px -7px hsla(0,0%,0%,0.2)"}
} onClick={()=>{getlinks(); }}  >Get Data </button>
</div>
</div>

<div className="copylinks">
{


[...Array(l).keys()].map(n => {
    let temp="link"+(n+1)
    return (
    <div className="copyLinkElement" key={temp}>
    <label>
    <input style={textfeilds}    type="textbox" placeholder="enter any text and hit save" className="copyLinkInput"  onChange={e =>   linkchange(temp,e)}  onKeyPress={(e)=>saveHit(temp,e)} value={links[temp]}/>
    <button style ={isdark? bluebutton: {background: "#5e98f8"}} onClick={()=>{linkupdate(temp);setOpen(true); setmessage("Data Saved !!!")   }} >save link!</button>
    <button style ={isdark? brownbutton: {background: "#5C6B70"}} onClick={ () => {navigator.clipboard.writeText(links[temp]);setOpen(true); setmessage("copied !!!") }}>copy link!</button>
    </label>
    </div> 
    )
})




}









<div title="add an link element" className="addelement" style={{ display: (l<8) ? 'block' : 'none' }}>
<IconButton aria-label="upload picture" component="span" className='add'  onClick={()=>addlink(0)}>
<AddCircleIcon  style={{ fontSize: "50px",  color:"#3c82f6"}}/>
</IconButton>
</div>
</div>







<div className="copylinks">



{
[...Array(t).keys()].map(n => {
  let temp="text"+(n+1)
    return (
    <div className="copyTextElement" key={temp}>
    
    <textarea style={textfeilds} placeholder="enter any text and hit save" className="copyTextInput" onChange={(e)=> linkchange(temp,e)}    value={links[temp]}></textarea>
    <button style ={isdark? bluebutton: {background: "#5e98f8"}} onClick={()=>{linkupdate(temp);setOpen(true); setmessage("Data Saved !!!")   }} >save link!</button>
    <button style ={isdark? brownbutton: {background: "#5C6B70"}} onClick={ () => {navigator.clipboard.writeText(links[temp]);setOpen(true); setmessage("copied !!!") }}>copy link!</button>
   
    </div> 
    )
})



}







<div title="add an text element" className="addelement" style={{ display: (t<5) ? 'block' : 'none' }} >
<IconButton aria-label="upload picture" component="span" className='add' onClick={()=>addlink(1)}>
<AddCircleIcon  style={{ fontSize: "50px"  ,color:"#3c82f6"}}/>
</IconButton>
</div>
</div>



{/* <button onClick={handletrash}>ip in con</button> */}
<Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2399} 
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
</div>
</div>  
  );
}

export default App;
