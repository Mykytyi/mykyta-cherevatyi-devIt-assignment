import { useCallback, useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import List from '../components/List';
import { startAction } from '../api/mainApi';

import '../styles/App.css';

function App() {
  const [index, setIndex] = useState('');
  const [serverData, setServerData] = useState([]);
  console.log('serverData: ', serverData);
  const handleChange = useCallback((event) => {
    setIndex(event.target.value);
  }, []);

  const handleStart = useCallback(async () => {
    if (serverData.length > 0) {
      setServerData([]);
    }
    let promisesToSend = [];
    for (let i = 1; i <= 1000; i++) {
      promisesToSend.push(startAction(i));

      if (promisesToSend.length === +index) {
        const response = await Promise.all(promisesToSend);
        console.log(response);
        setServerData((prevState) => [...prevState, ...response]);
        promisesToSend = [];
      }
    }
    if (promisesToSend.length > 0) {
      const response = await Promise.all(promisesToSend);

      setServerData((prevState) => [...prevState, ...response]);
    }
  }, [index, serverData]);

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
