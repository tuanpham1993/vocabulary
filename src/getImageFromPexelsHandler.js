const http = require('http');
const Crawler = require('crawler');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

function crawImage(word) {
  return new Promise((resolve, reject) => {
    const c = new Crawler({
      jQuery: jsdom,
      maxConnections: 10,
      callback: function (error, res, done) {
        if (error) {
          reject(error);
        } else {
          const { document } = (new JSDOM(res.body)).window;
          const el = document.querySelector('.photo-item__img');
          if (el) {
            const src = el.getAttribute('srcset').split('?')[0].replace('https', 'http');
            resolve(src);
          } else {
            reject(new Error('Cant\'t find image'));
          }
        }
        done();
      }
    });
    c.queue(`https://www.pexels.com/search/${word}/`);
  })
}

async function getImageFromPexels(word) {
  const data = [];
  const link = await crawImage(word);
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

module.exports = { getImageFromPexels };
