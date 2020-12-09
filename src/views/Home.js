import React,{ useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector( state => state);
  const [ state, setState ] = useState({...selector});
  return (
    <div>
      MHome
      <p>proName: {state.sales.proName}</p>
      <p>proName: {state.sales.amount}</p>
      {/* <p>proName: {state.supplier.supplierName}</p>
      <p>proName: {state.supplier.supplierId}</p> */}
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