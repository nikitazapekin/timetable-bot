module.exports = {
    againOptions: {
           reply_markup: JSON.stringify({
               inline_keyboard: [
                   [{text: 'Играть снова', callback_data: '/again'} ]
                  
               ]
           })
       }, 
       
      gameOptions: {
           reply_markup: JSON.stringify({
               inline_keyboard: [
                   [{text: 'Понедельник', callback_data: 'Понедельник'}, {text: 'Вторник', callback_data: '2'}, {text: 'Среда', callback_data: '3'} ], 
                   [{text: 'Четверг', callback_data: '4'},{text: 'Пятница', callback_data: '5'}, {text: 'Суббота', callback_data: '6'}],
                  
                  
               ]
           })
       } 
       
   }