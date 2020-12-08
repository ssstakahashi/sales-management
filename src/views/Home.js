import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const selector = useSelector( state => state)
  return (
    <div>
      Home
      userId: {selector.sales.username}
    </div>
  )

};

export default Home;