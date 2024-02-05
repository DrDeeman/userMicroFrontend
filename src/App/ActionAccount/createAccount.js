import React, {useRef} from 'react';
import {
    FormControl,
    Button,
    InputLabel,
    TextField
  } from '@material-ui/core';
  import {AlertHOC} from '../HOCs/AlertHOC';


export const CreateAccount = AlertHOC(function (props){
     
    const loginRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    
    function handleSubmit(ev){

     ev.preventDefault();
      
     fetch('/users_api/users/',{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            login:loginRef.current.value,
            password:passwordRef.current.value,
            email:emailRef.current.value,
        })
        })
        .then(async r=>{
            if(r.ok){
                var result = await r.text();
                props.successCallback(result);
                props.closePopup();
            } else {
                var result = await r.json();
                props.alertCallback(result);
            }
        })

    } 

    return <div  className='wrapperForm'>
        <h3>Пожалуйста, создайте учетную запись</h3>

        <form onSubmit={(handleSubmit)}>
        <div>
            <TextField
                        label={'Логин'}
                        name="login"
                        defaultValue={''}
                        variant="standard"
                        inputRef={loginRef}
                      />
        </div>
        <div><TextField
                        label={'Пароль'}
                        name="password"
                        defaultValue={''}
                        variant="standard"
                        helperText={'Пароль должен состоять из минимум 8 символов'}
                        inputRef={passwordRef}
                      />
        </div>
        <div>
        <TextField
                        label={'Почта'}
                        name="email"
                        defaultValue={''}
                        variant="standard"
                        inputRef={emailRef}
                      />
        </div>
         <Button
              type="submit" 
              variant="contained"
              color="primary"
            >
              Создать
            </Button>
        </form>
    </div>
})