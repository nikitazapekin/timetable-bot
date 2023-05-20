
const TelegramApi =require('node-telegram-bot-api')
const token= "6174292466:AAGCaNxhc3CTVSbQMKESWLi2HeAtiZlf6IQ"
const {gameOptions, againOptions} = require('./options')
const bot=new TelegramApi(token, {polling: true})
const chats={}
let url ="https://fsc.bsu.by/ru/raspisanie-zanyatij/"
const startGame = async (chatId, timetable) => {
  await bot.sendMessage(chatId, `Расписание занятий на текущую неделю`, gameOptions);
}
const start =()=> {
    bot.setMyCommands([{command: "/start", description: "Начальное приветствие"},
    {command: "/info", description: "получить инфу на неделю"},
])
}
const fs = require("fs");
const axios = require("axios");
const cheerio = require('cheerio');
let date=new Date()
let month=date.getMonth()+1
let year=date.getFullYear()
let arrayOfGettedLinks=[]
if(month<10){
  month="0"+month
}
axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a').each((index, element) => {
      const href = $(element).attr('href');
    if (href && href.startsWith(`https://fsc.bsu.by/wp-content/uploads/${year}/${month}/inform`)) {
        console.log(href);
        arrayOfGettedLinks.push(href)
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
let globalObjectOfDays; 
setTimeout(()=>{
function parsePdf() {
  return new Promise((resolve, reject) => {
    axios 
  .get(arrayOfGettedLinks[0], { 
   responseType: "arraybuffer",
      })
      .then((response) => {
        const pdfBuffer = Buffer.from(response.data);
        let lessons = [];
        let arrayOfSubjects = [];
        const objectOfDays = {};
        const objectOfAuditory={}
        let arrayOfAuditories=[]
        let countOfSubjects = -1;
        let count = 0;
        let countOfSubjectsAtWeek=0
        const arrayOfTime = [
          "9.00-10.20",
          "10.30-11.50",
          "12.00-13.20",
          "13.50-15.10",
          "15.20-16.40",
          "16.50-18.10",
        ];

        import("pdfreader").then(({ PdfReader }) => {
          new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
            if (err) {
              console.error("Error parsing PDF:", err);
              reject(err);
              return;
            }

            if (!item) {
              console.warn("End of buffer");
              let ind = arrayOfSubjects.indexOf("Суббота");
              let saturd = [];
              for (let i = ind; i < arrayOfSubjects.length; i += 2) {
                saturd.push(arrayOfSubjects[i]);
              }

              saturd.shift();
              objectOfDays.saturday = saturd;
              console.log(objectOfDays);
              console.log(arrayOfSubjects)
              console.log(countOfSubjectsAtWeek)
              resolve(objectOfDays);
              return;
            } else if (item.text) {
              //console.log(item.text)
              if (item.text.includes("Пон")) {
                countOfSubjects = 0;
                arrayOfSubjects.push("Понедельник");
                count = 0;
              }
if(Number(item.text)>50){
 arrayOfAuditories.push(item.text)
}
              if (item.text.includes("Вт")) {
                countOfSubjects = 1;
                count = 0;
                arrayOfSubjects.push("Вторник");
                objectOfDays.monday = lessons;

                lessons = [];
              }
              if (item.text.includes("Ср")) {
                countOfSubjects = 2;
                count = 0;
                arrayOfSubjects.push("Среда");
                objectOfDays.tuesday = lessons;
                lessons = [];
              }
              if (item.text.includes("Чет")) {
                countOfSubjects = 3;
                count = 0;
                arrayOfSubjects.push("Четверг");
                objectOfDays.wednesday = lessons;
                lessons = [];
              }
              if (item.text.includes("Пя")) {
                countOfSubjects = 4;
                count = 0;
                arrayOfSubjects.push("Пятница");
                objectOfDays.thursday = lessons;
                lessons = [];
              }
              if (item.text.includes("Су")) {
                countOfSubjects = 5;
                count = 0;
                arrayOfSubjects.push("Суббота");
                objectOfDays.friday = lessons;
                lessons = [];
              }

              if (item.text.includes("Во")) {
                countOfSubjects = 6;
                count = 0;
                arrayOfSubjects.push("Воскресенье");
                objectOfDays.saturday = lessons;
                lessons = [];
              }

              if (item.text.includes("тео")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                countOfSubjectsAtWeek++
                count++;
                arrayOfSubjects.push("Алгебра и теория чисел");
                lessons.push("Алгебра и теория чисел");
              }
              if (item.text.includes("Мат")) {
                countOfSubjectsAtWeek++
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                arrayOfSubjects.push("Математический анализ");
                lessons.push("Математический анализ");
              }
              if (item.text.includes("Физ")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Физра");
                lessons.push("Физра");
              }
              if (item.text.includes("Белорусский язык")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Белорусский язык");
                lessons.push("Белорусский язык");
              }
              if (item.text.includes("Алго")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Алгоритмы и структуры данных");
                lessons.push("Алгоритмы и структуры данных");
              }
              if (item.text.includes("мето")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Основы и методологии программирования");
                lessons.push("Основы и методологии программирования");
              }
              if (item.text.includes("Цве")) {
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push(arrayOfTime[count]);
                arrayOfSubjects.push("Цветоведение и колористика");
                lessons.push("Цветоведение и колористика");
              }
              if (item.text.includes("Инф")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Информационный час");
                lessons.push("Информационный час");
              }
              if (item.text.includes("Ино")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Иностранный язык");
                lessons.push("Иностранный язык");
              }
              if (item.text.includes("Сов")) {
                arrayOfSubjects.push(arrayOfTime[count]);
                count++;
                countOfSubjectsAtWeek++
                arrayOfSubjects.push("Современная политэкономия");
                lessons.push("Современная политэкономия");
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error("Failed to fetch PDF:", error);
        reject(error);
      });
  });
}

parsePdf()
  .then((objectOfDays) => {
    globalObjectOfDays = objectOfDays;
    console.log(globalObjectOfDays);
    
  })
  .catch((error) => {
    console.error("Error:", error);
  });



//setTimeout(()=> {
bot.on('message', async msg => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const name = msg.chat.first_name;
  const nameLast = msg.chat.last_name;
  console.log(msg);

  if (text === "/start") {
    await bot.sendMessage(chatId, `Привет мое ты солнышко! Я тебя давно уже заждался) ${name} ${nameLast}!`);
    await bot.sendSticker(chatId, "https://chpic.su/_data/stickers/s/ShrekMadeByNeuralNetwork/ShrekMadeByNeuralNetwork_014.webp");
    return "ну вот как это понимать";
  }

  if (text === "/info") {
    const infoOptions = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Понедельник', callback_data: 'button1' }],
          [{ text: 'Вторник', callback_data: 'button2' }],
          [{ text: 'Среда', callback_data: 'button3' }],
          [{ text: 'Четверг', callback_data: 'button4' }],
          [{ text: 'Пятница', callback_data: 'button5' }],
          [{ text: 'Суббота', callback_data: 'button6' }]
        ]
      })
    };

    await bot.sendMessage(chatId, 'Расписание на неделю:', infoOptions);
  }
});
function generateTimetable(day, array){
 return `Расписание на ${day}: \n`+ array.map((item, index)=> {
    return " "+(index+1)+":"+item+"\n"
        })
}
bot.on('callback_query', async msg => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  console.log(data);
  console.log(globalObjectOfDays)
  const infoOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'Понедельник', callback_data: 'button1' }],
        [{ text: 'Вторник', callback_data: 'button2' }],
        [{ text: 'Среда', callback_data: 'button3' }],
        [{ text: 'Четверг', callback_data: 'button4' }],
        [{ text: 'Пятница', callback_data: 'button5' }],
        [{ text: 'Суббота', callback_data: 'button6' }]
      ]
    })
  };

  if (data === 'button1') {
  await bot.sendMessage(chatId, generateTimetable("понедельник", globalObjectOfDays.monday ))
    await bot.sendMessage(chatId, 'Расписание на неделю:' , infoOptions);
  }
  if (data === 'button2') {
    await bot.sendMessage(chatId, generateTimetable("вторник", globalObjectOfDays.tuesday))
    await bot.sendMessage(chatId, 'Расписание на неделю:' , infoOptions);
  }
  if (data === 'button3') {
    await bot.sendMessage(chatId, generateTimetable("среду", globalObjectOfDays.wednesday ))
    await bot.sendMessage(chatId, 'Расписание на неделю:' , infoOptions);
  }
  if (data === 'button4') {
    await bot.sendMessage(chatId, generateTimetable("четверг", globalObjectOfDays.thursday ))
    await bot.sendMessage(chatId, 'Расписание на неделю:' , infoOptions);
  }
  if (data === 'button5') {
    await bot.sendMessage(chatId, generateTimetable("пятницу", globalObjectOfDays.friday ))
    await bot.sendMessage(chatId, 'Расписание на неделю:' , infoOptions);
  }
  if (data === 'button6') {
    await bot.sendMessage(chatId, generateTimetable("субботу", globalObjectOfDays.saturday ))
    await bot.sendMessage(chatId, 'Расписание на неделю:' , infoOptions);
  }
});
  start() 
}, 3000)


//npm install pdfreader
//npm install axios pdfreader
//npm init -y
//npm i node-telegram-bot-api nodemon
//npm run dev 
//npm i cheerio


