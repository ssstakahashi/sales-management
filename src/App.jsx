import { useDispatch, useSelector } from 'react-redux';
import Layout from './layout/Layout'

// import { Router } from 'react-router';
import Router from './Router';

function App() {
  const dispatch = useDispatch();
  const selecter = useSelector(state => state);
  const ver = "0.0.5"

  console.log(selecter)
  return (
    // <div className="App">
    //   <header className="App-header">
    //    <h1>Hello</h1>
    //     <button onClick={()=>{
    //       dispatch(SalesInputAction({amount: 500, proName: "ニキビ予防"}))}}>
    //       test
    //     </button>
    //   </header>
    // </div>
    <main>
      <Layout>
        <Router />
      </Layout>
    </main>
  );
}

export default App;
