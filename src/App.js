import Layout from './layout/Layout'
import Router from './Router';

function App() {
  const ver = "0.0.11"

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
