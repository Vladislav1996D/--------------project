window.onload = function () {
  let alphabet = [
    "а", "б", "в", "г", "д",
    "е", "ё", "ж", "з", "и",
    "й", "к", "л", "м", "н",
    "о", "п", "р", "с", "т",
    "у", "ф", "х", "ц", "ч",
    "ш", "щ", "ъ", "ы", "ь",
    "э", "ю", "я",
  ];

  let categories; // Массив тем
  let chosenCategory; // Выбранная категория
  let word; // Выбранное слово
  let guess; 
  let geusses = []; // Сохраненные догадки
  let lives; // Жизни
  let counter; // Подсчет правильных догадок
  let space; // Количество пробелов в слове '-'


  // Получаем элементы
  let showLives = document.getElementById("mylives");
  let getHint = document.getElementById("hint");
  let showClue = document.getElementById("clue");

  // Создаем алфавит ul
  const buttons = function () {

    let myButtons = document.getElementById("buttons");
    let letters = document.createElement("ul");

    for (let i = 0; i < alphabet.length; i++) {
      letters.id = "alphabet";
      list = document.createElement("li");
      list.id = "letter";
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  };

  // Показ категории
  const selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML =
        "Категория - футбольные команды Премьер-лиги (Украина).";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "Категория - Украинская еда.";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "Категория - города (Украина).";
    }
  };

  // Создаем элементы подчеркивания "_"
  result = function () {

    const correct = document.createElement("ul");
    let wordHolder = document.getElementById("hold");
  
    for (let i = 0; i < word.length; i++) {
      correct.setAttribute("id", "my-word");
      guess = document.createElement("li");
      guess.setAttribute("class", "guess");
      guess.innerHTML = "_";
      
      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  };

  // Подсчет жизней
  comments = function () {
    showLives.innerHTML = "У вас осталось " + lives + " жизней";
    if (lives < 1) {
      showLives.innerHTML = "У вас осталось 0 жизней.. Игра окончена";
    }
    for (let i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "Поздравляем! Вы выиграли!" 
      }
    }
  };
  
  // OnClick Function
  check = function () {
    list.addEventListener('click', function () {
      let character = this.innerHTML;
      this.setAttribute("class", "active");
      this.onclick = null;
      for (let i = 0; i < word.length; i++) {
        if (word[i] === character) {
          geusses[i].innerHTML = character;
          counter += 1;
        }
      }
      let j = word.indexOf(character);
      if (j === -1) {
        lives -= 1;
        comments();
      } else {
        comments();
      }
    });
  };

  // Игра
  play = function () {
    categories = [
      ["динамо", "шахтёр", "ворскла", "кривбасс", "металист", "львов", "черноморец"],
      ["сало", "борщ", "вареники", "голубцы", "кулеш"],
      ["киев", "чернигов", "одесса", "львов", "харьков"],
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);

    geusses = [];
    lives = 9;
    counter = 0;
    space = 0;
    buttons();
    result();
    comments();
    selectCat();
  };

  play();

  // Намек(подсказка)
  getHint.addEventListener('click', () => {
    showClue.style.display = 'block';
  })

  hint.addEventListener('click', function () {
    hints = [
      [
        "Киевское...",
        "Донецкий...",
        "Команда из Полтавы",
        "Команда из Кривого Рога",
        "Харьковский...",
        "Команда из Львова",
        "Одесский...",
      ],
      [
        "Главное национальное... ",
        "Красный...",
        "Начинка в тесте...",
        "В капустных листьях...",
        "Пшенная каша с салом...",
      ],
      [
        "Столица...",
        "Город на севере...",
        "... мама",
        "столица Западной Украины...",
        "Первая столица...",
      ],
    ];   
    
    let catagoryIndex = categories.indexOf(chosenCategory);
    let hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Подсказка: " + hints[catagoryIndex][hintIndex];
  });

//  Сброс (играть снова)
  const resetElement = document.getElementById('reset');
  
  resetElement.addEventListener('click', function() {
    location.reload();
  })
}


