import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Test from './App/test_component';
import Remote from './remotes/remote';
import './utils/WrapperFetch';

ReactDOM.createRoot(document.querySelector('#root')).render(
<div>
    <Test/>
    <Remote/>
</div>
);