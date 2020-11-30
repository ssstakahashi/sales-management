import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

const Sales = () => {
  const dispatch = useDispatch()
  return (
    <div>
      salse
      <button onClick={()=>dispatch(push('/')) }>
        HOME
      </button>
    </div>
  )

};

export default Sales;