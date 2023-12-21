import React,{useState} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {CreateAccount} from './ActionAccount/createAccount';
import {SignInAccount} from './ActionAccount/signInAccount';
import {LogoutAccount} from './ActionAccount/logoutAccount';

export default function({auth, setDataAuth}){

    const [createAccount, setCreateAccount] = useState(false);
    const [signInAccount, setSignInAccount] = useState(false);

    function logoutAccount(){
        fetch('/users_api/logout')
        .then(r=>{
            if(r.ok)setDataAuth(null);
        })
    }

    return (
        <div className="dialog">
            <div>
                <button onClick={()=>setCreateAccount(true)}>Создать учетную запись</button>
                <Popup open={createAccount} onClose={()=>setCreateAccount(false)} modal nested>
                  <CreateAccount closePopup={()=>{
                    setTimeout(()=>setCreateAccount(false),2000);
                  }}/>
                </Popup>
            </div>

            {!auth?
            <div>
                <button onClick={()=>setSignInAccount(true)}>Авторизоваться</button>
                <Popup  open={signInAccount} onClose={()=>setSignInAccount(false)} modal nested>
                    <SignInAccount closePopup={()=>setSignInAccount(false)} setDataAuth={setDataAuth}/>
                </Popup>
            </div>
            :null}

            {auth?
            <div>
                 <button onClick={()=>logoutAccount()}>Выйти</button>
            </div>
            :null}

        </div>

    )
}