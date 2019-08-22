const text = `Задача организации, в особенности же укрепление и развитие структуры играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Значимость этих проблем настолько очевидна, что новая модель организационной деятельности в значительной степени обуславливает создание систем массового участия. Повседневная практика показывает, что новая модель организационной деятельности позволяет выполнять важные задания по разработке модели развития. Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации. Не следует, однако забывать, что постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обуславливает создание направлений прогрессивного развития.` ;

const inputElement = document.querySelector('#input');
const  textExampleElement =  document.querySelector('#textExample');


const lines = getLines(text);

let letterId = 1;

update();

inputElement.addEventListener('keydown', function(event) {
  const currentLetter = getCurrentLetter();
  if (event.key === currentLetter.label) {
      letterId++;
      update();
  }
})

// Принимает длинную строку, возвращает массив строк со служебной информацией
function getLines(text) {
    const lines = [];

    let line = [];
    let idCounter = 0;
    for(const letter of text) {
        idCounter++;

        line.push({
           id: idCounter,
           label: letter,
           success: true
        })
        
        if (line.length >= 70 || letter === '\n' ) {
            lines.push(line);
           
            line = []; 
        }    
    }

    if (line.length > 0) {
        lines.push(line)
    }
    return lines;
}
// Принимает строку с объектами со служебной информацией и возвращает html - структуру
function lineToHtml(line) {
    const divElement = document.createElement('div');
    divElement.classList.add('line');

    for ( const letter of line ) {
        const spanElement = document.createElement('span');
        spanElement.textContent = letter.label;

        divElement.append(spanElement);

        if (letterId > letter.id ){
            spanElement.classList.add('done');
        }
    }
    return divElement;
}




// Возвращает актуальный номер строки
function getCurrentLineNumber() {
   for (let i = 0; i < lines.length; i++){
    for (const letter of lines[i]) {
        if (letter.id === letterId) {
            return i;
        }
    }
   }
}

// Функция обновления 3-х отображаемых актуальных строк textExample
function update () {
    const currentLineNumber = getCurrentLineNumber();
    textExampleElement.innerHTML = '';

    for (let i = 0; i < lines.length; i++) {
        const html = lineToHtml(lines[i]);
        textExampleElement.append(html);

        if (i < currentLineNumber || i > currentLineNumber + 2 ) {
            html.classList.add('hidden');
        }
    }
   
} 

// Возвращает Объект символа ожидаемый программой
 function getCurrentLetter () {
     for (const line of lines) {
         for (const letter of line) {
             if (letterId === letter.id) {
                 return letter;
             }
         }
     }
 }

