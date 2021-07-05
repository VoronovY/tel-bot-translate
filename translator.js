require('dotenv').config();
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const tokenLang = process.env.TKOENIBM;

// end point Frankfurt: https://api.eu-de.language-translator.watson.cloud.ibm.com
// Set the correct service URL by specifying the serviceUrl parameter when you create the service instance

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: tokenLang,
  }),
  serviceUrl: 'https://api.eu-de.language-translator.watson.cloud.ibm.com/instances/3e517eee-fbde-4bc6-b2cc-365a16ec199a',
});

const translateToRussian = (phrase) => languageTranslator.translate(
  {
    text: phrase,
    source: 'en',
    target: 'ru',
  },
)
  .then((response) => {
    const respText = JSON.stringify(response.result.translations[0].translation);
    return respText;
  })
  .catch((err) => {
    console.log('error: ', err);
  });

const translateToEnglish = (phrase) => languageTranslator.translate(
  {
    text: phrase,
    source: 'ru',
    target: 'en',
  },
)
  .then((response) => {
    const respText = JSON.stringify(response.result.translations[0].translation);
    return respText;
  })
  .catch((err) => {
    console.log('error: ', err);
  });

module.exports = { translateToRussian, translateToEnglish };
