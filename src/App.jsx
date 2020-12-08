import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { SalesInputAction } from './reduxs/sales/actions';
// import { Router } from 'react-router';
import Router from './Router';

function App() {
  const dispatch = useDispatch();
  const selecter = useSelector(state => state);
  const ver = "0.0.3"

  console.log(selecter.sales)
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
      <Router />
    </main>
  );
}

export default App;
