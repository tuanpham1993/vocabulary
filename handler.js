const { addWord } = require('./src/addWordHandler');
const { getAudioFromOxford } = require('./src/getAudioFromOxfordHandler');
const { getEnFromOxford } = require('./src/getEnFromOxfordHandler');
const { getImageFromPexels } = require('./src/getImageFromPexelsHandler');
const { getViFromCoViet } = require('./src/getViFromCoVietHandler');
const { upload } = require('./src/uploadHandler');

module.exports = { addWord, getAudioFromOxford, getEnFromOxford, getImageFromPexels, getViFromCoViet, upload };
