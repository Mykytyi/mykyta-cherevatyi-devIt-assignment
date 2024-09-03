import { useCallback, useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import List from '../components/List';
import fetchWithConcurrency from '../utils/fetchWithConcurrency';
import { REQUESTS_TO_SERVER } from '../constants';

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

    const requests = Array.from({ length: REQUESTS_TO_SERVER }, (_, i) => {
      return { data: i + 1 }
    });

    setIsLoading(true);
    fetchWithConcurrency(requests, index, setServerData)
      .then((results) => {
        setIsLoading(false);
      });
  }, [index, serverData]);

  return (
    <div className="App">
      <main className="AppMain">
        <p>
          Start the process
        </p>
        <Input value={index} onChange={handleChange}/>
        <Button title="Start" onClick={handleStart} disabled={isLoading} />
        <List data={serverData} />
      </main>
    </div>
  );
}

export default App;
