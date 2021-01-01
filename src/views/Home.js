import React,{ useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import { supplierDataGetOperation } from '../reducks/supplier/operations';
import { salesDataGetOperation } from '../reducks/sales/operations';

const Home = () => {
  const dispatch = useDispatch();
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
    　<button onClick={()=>dispatch(push('/product'))}>
      　商品登録
    　</button>
    　<button onClick={()=>dispatch(push('/sales-report'))}>
      　売上報告
    　</button>
    </div>


  )

};

export default Home;