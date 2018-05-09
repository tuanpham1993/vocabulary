const { getEnFromOxford } = require('./getEnFromOxfordHandler');
const { getAudioFromOxford } = require('./getAudioFromOxfordHandler');
const { getImageFromPexels } = require('./getImageFromPexelsHandler');
const { getViFromCoViet } = require('./getViFromCoVietHandler');
const { upload } = require('./uploadHandler');

async function addWord(word) {
  // todo check if this word already exist

  // get raw object from oxford
  const wordObject = await getEnFromOxford(word);
  // todo save word object to db
  
  // get audio from oxford
  const audioData = await getAudioFromOxford(word);
  const autioUrl = await upload(`${word}.mp3`, audioData);
  // todo save audio url to db
  
  // craw vi from coviet|sohoa
  const viObject = await getViFromCoViet(word);
  // todo save vi object to db

  // get image from pexels
  const imageData = await getImageFromPexels(word);
  const imageUrl = await upload(`${word}.jpeg`, imageData);
  // todo save image url to db
}

module.exports = { addWord };
