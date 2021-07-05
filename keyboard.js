
const keyboard = [
  [
    {
      text: 'Перевести на русский :', // текст на кнопке
      callback_data: 'translateRus', // данные для обработчика событий
    },
  ],
  [
    {
      text: 'Перевести на английский :',
      callback_data: 'translateEn',
    },
  ],

];



module.exports = { keyboard };
