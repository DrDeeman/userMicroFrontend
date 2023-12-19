import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';


export function AlertHOC(Component) {
  return function (props) {
    const [errorState, setErrorState] = useState([]);
    const [successState, setSuccessState] = useState(null);
    

    useEffect(() => {
      if (errorState.length > 0) var timerError = setTimeout(() => setErrorState([]), 5000);
      return () => clearTimeout(timerError);
    }, [errorState]);

    useEffect(() => {
      if (successState) var timerSuccess = setTimeout(() => setSuccessState(null), 5000);
      return () => clearTimeout(timerSuccess);
    }, [successState]);

    return (
      <React.Fragment>
        {errorState.length > 0 ? (
          <Alert
            variant="filled"
            sx={{ position: 'fixed', left: 0, top: 0, zIndex: 1000, width: '100%' }}
            severity="error"
          >
            {'Ошибки:' + errorState.join(',')}
          </Alert>
        ) : (
          ''
        )}

        {successState ? (
          <Alert
            variant="filled"
            sx={{ position: 'fixed', left: 0, top: 0, zIndex: 1000, width: '100%' }}
            severity="success"
          >
            {successState}
          </Alert>
        ) : (
          ''
        )}

        <Component
          {...props}
          alertCallback={(error_data) => setErrorState(error_data)}
          successCallback={(success_data) => setSuccessState(success_data)}
        />
      </React.Fragment>
    );
  };
}
