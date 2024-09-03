import { startAction } from '../api/mainApi';

async function fetchWithConcurrency(requests, concurrency, updateResults) {
  const results = [];
  const queue = []; // To manage active fetches


  async function handleFetch(request, index) {
    try {
      results[index] = await startAction(request.data);
    } catch (error) {
      console.error(`Error fetching:`, error);
      results[index] = null
    }
    updateResults([...results]);
  }

  // Go through the URLs, and limit active fetches by 'concurrency'
  for (let i = 0; i < requests.length; i += +concurrency) {
    const batch = requests.slice(i, i + +concurrency); // Creating a batch based on concurrency
    const batchPromises = batch.map((request, index) => handleFetch(request, i + index));

    queue.push(Promise.all(batchPromises)); // Adding batch to the queue

    // Ensure that the number of active fetches is controlled by concurrency
    if (queue.length >= concurrency) {
      await Promise.race(queue); // Wait for the fastest fetch to finish
      queue.shift(); // Remove the finished fetch from the queue
    }
  }

  await Promise.all(queue);
}

export default fetchWithConcurrency;
