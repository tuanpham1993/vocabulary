const http = require('http');

async function getAudioFromOxford(word) {
  const data = [];
  const link = `${process.env.OXFORD_AUDIO_API}/${word}_gb_1.mp3`;
  return new Promise((resolve, reject) => {
    http.get(link, (response) => {
      response.on('data', (chunk) => {
        data.push(chunk);
      });
      response.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve(buffer);
      });
    });
  })
}

module.exports = { getAudioFromOxford };
