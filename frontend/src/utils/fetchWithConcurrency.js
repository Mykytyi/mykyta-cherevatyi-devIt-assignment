import { startAction } from '../api/mainApi';

// Fetch function with concurrency control
async function fetchWithConcurrency(urls, concurrency, updateResults) {
  const results = []; // Store results here
  const queue = []; // Manage active fetches

  // Function to handle single fetch and update state
  async function handleFetch(urlEntity, index) {
    try {
      results[index] = await startAction(urlEntity.data); // Store result at the correct index
    } catch (error) {
      console.error(`Error fetching:`, error);
      results[index] = null; // Handle fetch failure
    }
    console.log('reaults: ', results);
    updateResults([...results]); // Update React state
  }

  // Loop through the URLs, but limit active fetches by 'concurrency'
  for (let i = 0; i < urls.length; i += +concurrency) {
    const batch = urls.slice(i, i + +concurrency); // Create a batch based on concurrency
    const batchPromises = batch.map((url, index) => handleFetch(url, i + index)); // Handle fetches and index offset

    queue.push(Promise.all(batchPromises)); // Add batch to the queue

    // Ensure that the number of active fetches is controlled by concurrency
    if (queue.length >= concurrency) {
      await Promise.race(queue); // Wait for the fastest fetch to finish
      queue.shift(); // Remove the finished fetch from the queue
    }
  }

  // Await the rest of the requests in the queue
  await Promise.all(queue);
}

export default fetchWithConcurrency;
