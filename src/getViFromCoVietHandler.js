const Crawler = require('crawler');
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

function getViFromCoViet(word) {
  return new Promise((resolve, reject) => {
    const c = new Crawler({
      jQuery: jsdom,
      maxConnections: 10,
      callback: function (error, res, done) {
        if (error) {
          reject(error);
        } else {
          const { document } = (new JSDOM(res.body)).window;
          const rootEls = document.querySelectorAll('.p10');
          if (rootEls) {
            const rootEl = rootEls[rootEls.length - 1];
            const childEls = rootEl.querySelectorAll('div');
            const directChildEls = [];
            childEls.forEach((el) => {
              if (el.getAttribute('id') && el.getAttribute('id').indexOf('partofspeech_') >= 0 && el.getAttribute('id') !== 'partofspeech_100') {
                directChildEls.push(el);
              }
            });

            if (directChildEls.length > 0) {
              const results = [];
              directChildEls.forEach((el) => {
                const result = {
                  type: '',
                  meanings: [],
                };
                const typeEl = el.querySelector('.ub');
                if (typeEl) {
                  result.type = typeEl.querySelector('span').innerHTML;
                }

                const meaningEls = el.querySelectorAll('.m');
                meaningEls.forEach((meaningEl) => {
                  result.meanings.push(meaningEl.querySelector('span').innerHTML);
                });

                if (result.type) {
                  results.push(result);
                }
              });
              resolve(results);
            } else {
              reject(new Error('Can\'t find data'));
            }
          } else {
            reject(new Error('Can\'t find data'));
          }
        }
        done();
      }
    });
    c.queue(`http://tratu.coviet.vn/hoc-tieng-anh/tu-dien/lac-viet/A-V/${word}.html`);
  })
}

module.exports = { getViFromCoViet };
