import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import { supplierDataGetOperation } from '../reducks/supplier/operations';
import { Grid } from '@material-ui/core';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch( supplierDataGetOperation() )
  },[])

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
      <Grid item style={{margin: "2rem"}}>
        Home
      </Grid>
      <Grid item>
        <button onClick={()=>dispatch(push('/sales'))}>
          売上登録
        </button>
      </Grid>
      <Grid item>
          <button onClick={()=>dispatch(push('/supplier'))}>
            取引先登録
          </button>
        </Grid>
        <Grid item>
          <button onClick={()=>dispatch(push('/product'))}>
            商品登録
          </button>
        </Grid>
        <Grid item>
          <button onClick={()=>dispatch(push('/sales-report'))}>
            売上報告
          </button>
        </Grid>
    </Grid>
  )

};

export default Home;