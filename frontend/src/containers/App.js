import { useCallback, useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import List from '../components/List';
import fetchWithConcurrency from '../utils/fetchWithConcurrency';

import '../styles/App.css';

function App() {
  const [index, setIndex] = useState('');
  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((event) => {
    setIndex(event.target.value);
  }, []);

  const handleStart = useCallback(async () => {
    if (serverData.length > 0) {
      setServerData([]);
    }
    const urls = Array.from({ length: 200 }, (_, i) => {
      return { data: i + 1 }
    });

    setIsLoading(true);
    fetchWithConcurrency(urls, index, setServerData)
      .then((results) => {
        setIsLoading(false);
        console.log('All fetch requests completed', results);
      });
  }, [index, serverData]);

  // const handleStart = useCallback(async () => {
  //   if (serverData.length > 0) {
  //     setServerData([]);
  //   }
  //   let promisesToSend = [];
  //
  //   for (let i = 1; i <= 1000; i++) {
  //     promisesToSend.push(startAction(i));
  //
  //     if (promisesToSend.length === +index) {
  //       const response = await Promise.all(promisesToSend);
  //       console.log(response);
  //       setServerData((prevState) => [...prevState, ...response]);
  //       promisesToSend = [];
  //     }
  //   }
  //   if (promisesToSend.length > 0) {
  //     const response = await Promise.all(promisesToSend);
  //
  //     setServerData((prevState) => [...prevState, ...response]);
  //   }
  // }, [index, serverData]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Start the process
        </p>
        <Input value={index} onChange={handleChange}/>
        <Button title="Start" onClick={handleStart}/>
        <List data={serverData} />
      </header>
    </div>
  );
}

export default App;
