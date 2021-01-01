import { useDispatch, useSelector } from 'react-redux';
import Layout from './layout/Layout'

// import { Router } from 'react-router';
import Router from './Router';

function App() {
  const ver = "0.0.10"

  console.log(ver)
  return (
    <main>
      <Layout>
        <Router />
      </Layout>
    </main>
  );
}

export default App;
