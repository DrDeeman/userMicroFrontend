import React,{useState, useEffect} from 'react';
import user from '../assets/images/user.png';
import DialogHome from './dialogHome';
import './style/dialog.scss';

export default function Users(props){
     
  const [openDialog, setOpenDialog] = useState(false);
  const [auth, setAuth] = useState(null);  


  useEffect(()=>{
    
 
     fetch('/users_api/auth')
     .then(async r=>{
         if(r.ok){
            var user = await r.json();
            setAuth(user);
         }
     });

     
},[]);

    return <div 
    onClick={()=>setOpenDialog(true)}
    className='preDialog'
    style={{backgroundImage:`url(${user})`}}
    title={(auth?`login=${auth.login}  password=${auth.password}`:null)}
    >
    {
    openDialog?<DialogHome auth={auth} setDataAuth={setAuth}/>:null
    } 
    </div>
}