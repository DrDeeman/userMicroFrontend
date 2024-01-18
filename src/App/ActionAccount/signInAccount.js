import React, {useRef} from 'react';
import {
    FormControl,
    Button,
    InputLabel,
    TextField
  } from '@material-ui/core';
  import {AlertHOC} from '../HOCs/AlertHOC';


  export const SignInAccount = AlertHOC(function(props){
     
    const loginRef = useRef();
    const passwordRef = useRef();

    
    function handleSubmit(e){

        e.preventDefault();
      
        fetch('/users_api/login',{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({
                login:loginRef.current.value,
                password:passwordRef.current.value
            })
            },false)
            .then(async r=>{
                var result = await r.json();
                if(r.ok){
                    props.closePopup();
                    localStorage.setItem("accessToken",result.accessToken);
                    localStorage.setItem("refreshToken",result.refreshToken);
                    props.setDataAuth(result.dataUser);
                } else props.alertCallback(result);
            })
    }

    return <div  className='wrapperForm'>
        <h3>Пожалуйста, введите данные учетной записи</h3>

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
                        inputRef={passwordRef}
                      />
        </div>
        <div>

        </div>
         <Button
              type="submit" 
              variant="contained"
              color="primary"
            >
              Войти
            </Button>
        </form>
    </div>
})