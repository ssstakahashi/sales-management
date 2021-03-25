import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router'
import { SupplierDataGetOperation } from '../reducks/supplier/operations';
import { Grid } from '@material-ui/core';
import { MainButton } from '../components/uikit';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch( SupplierDataGetOperation() )
  },[])

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
      <Grid item style={{margin: "2rem"}} />

      <Grid item>
        <MainButton label={"会計登録"} color="primary" onClick={()=>dispatch(push('/accounting'))} />
      </Grid>
      <Grid item>
        <MainButton label={"売上登録"} color="primary" onClick={()=>dispatch(push('/sales'))} />
      </Grid>
      <Grid item>
          <MainButton label={"取引先登録"} color="third" onClick={()=>dispatch(push('/supplier'))} />
        </Grid>
        <Grid item>
          <MainButton label={"商品登録"} color="primaryLight" onClick={()=>dispatch(push('/product'))} />
        </Grid>
        <Grid item>
          <MainButton label={"売上報告"} color="secondary" onClick={()=>dispatch(push('/sales-report'))} />
        </Grid>
    </Grid>
  )

};

export default Home;