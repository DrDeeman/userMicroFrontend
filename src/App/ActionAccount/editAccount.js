import React, {useRef} from 'react';
import {
    FormControl,
    Button,
    InputLabel,
    TextField
  } from '@material-ui/core';
  import {AlertHOC} from '../HOCs/AlertHOC';


export const EditAccount = AlertHOC(function (props){
     
  
    const emailRef = useRef();
    
    function handleSubmit(e){

     e.preventDefault();
      
     fetch('/users_api/auth',{
        method:"PATCH",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            email:emailRef.current.value,
        })
        })
        .then(async r=>{
            if(r.ok){
                var result = await r.json();
                props.setDataAuth(result.dataUser);
                props.closePopup();
            } else {
                var result = await r.json();
                props.alertCallback(result);
            }
        })

    } 

    return <div  className='wrapperForm'>
        <h3>Отредактируйте личные данные</h3>

        <form onSubmit={(handleSubmit)}>
        <div>
        <TextField
                        label={'Почта'}
                        name="email"
                        defaultValue={props.dataAuth.email}
                        variant="standard"
                        inputRef={emailRef}
                      />
        </div>
         <Button
              type="submit" 
              variant="contained"
              color="primary"
            >
              Редактировать
            </Button>
        </form>
    </div>
})