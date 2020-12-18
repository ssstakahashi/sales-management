import React,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import { supplierDataGetOperation } from '../reducks/supplier/operations';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const [ state, setState ] = useState({...selector});
  console.log(selector)
  
  useEffect(()=>{
    dispatch( supplierDataGetOperation() )
  },[])

  return (
    <div>
      Home

      <button onClick={()=>dispatch(push('/sales'))}>
      　売上登録
    　</button>
    　<button onClick={()=>dispatch(push('/supplier'))}>
      　取引先登録
    　</button>
    </div>


  )

};

export default Home;