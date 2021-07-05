require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { translateToRussian, translateToEnglish } = require('./translator');
const { keyboard } = require('./keyboard');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const actualMessage = {};

try {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    actualMessage[chatId] = msg.text;
    const { text } = msg;
    if (text) {
      await bot.sendMessage(chatId, 'Выберите действие:', {
        reply_markup: {
          inline_keyboard: keyboard,
        },
      });
    }
  });
} catch (error) {
  console.error(error);
}

bot.on('callback_query', async (query) => {
  if (query.data === 'translateRus') {
    const chaticId = query.message.chat.id;
    const sendText = await translateToRussian(actualMessage[chaticId]);
    await bot.sendMessage(chaticId, sendText);
  } if (query.data === 'translateEn') {
    const chaticId = query.message.chat.id;
    const sendText = await translateToEnglish(actualMessage[chaticId]);
    await bot.sendMessage(chaticId, sendText);
  }
});

module.exports = actualMessage;
