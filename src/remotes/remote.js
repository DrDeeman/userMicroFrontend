import React, {Suspense} from 'react';

const ProductUsers = React.lazy(()=>import('app1/ProductUsers'));

export default function(props){

    return <div>
        <Suspense fallback={<div>load...</div>}>
            <ProductUsers/>
        </Suspense>
       </div>
}