import React, { useEffect, useState } from 'react';
import Router from './router';

  const App = () => {

    const [data, setData] = useState([]);

    const getAdms = async () => {
        fetch("http://localhost/api_p2/index.php")
        .then((res) => res.json())
        .then((resJson) => (
          //console.log(resJson),
          setData(resJson)
        ));
    }

    useEffect(() => {
      getAdms();
    },[])
    return (
      <div className='App'>
        <Router />
      </div>
      
    );
  };
  
  export default App;
  