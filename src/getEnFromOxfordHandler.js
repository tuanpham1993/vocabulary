const fetch = require('node-fetch');

async function getEnFromOxford(word) {
  const response = await fetch(`${process.env.OXFORD_API}/${word}`, {
    headers: {
      'Accept': 'application/json',
      'app_id': process.env.OXFORD_APP_ID,
      "app_key": process.env.OXFORD_APP_KEY,
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return null;
}

module.exports = { getEnFromOxford };
