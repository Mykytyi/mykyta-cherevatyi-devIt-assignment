const apiUrl = process.env.REACT_APP_API_URL;

export const startAction = (index) => {
  return fetch(`${apiUrl}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
    },
    body: JSON.stringify({
      index,
    })
  })
    .then(res => res.json())
    .then(res => res);
}
