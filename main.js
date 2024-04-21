// Объект с глаголами и их формами
var verbs = {
    // Пример структуры данных
    "начать": ["begin", "began", "begun"],
    "ломать": ["break", "broke", "broken"],
    "приносить": ["bring", "brought", "brought"],
    "стать": ["become", "became", "become"],
    "дуть": ["blow", "blew", "blown"],
    "строить": ["build", "built", "built"],
    "рождаться": ["born", "bornt", "bornt"],
    "прийти": ["come", "come", "come"],
    "выбирать": ["choose", "chose", "chosen"],
    "резать": ["cut", "cut", "cut"],
    "кусать": ["bite", "bit", "bitten"],
    "покупать": ["buy", "bought", "bought"],
    "ловить": ["catch", "caught", "caught"],
    "стоить": ["сost", "cost", "cost"],
    "делать": ["do", "did", "done"],
    "рисовать": ["draw", "drew", "drawn"],
    "мечтать": ["dream", "dreamed", "dreamt"],
    "пить": ["drink", "drank", "drunk"],
    "водить": ["drive", "drove", "driven"],
    "есть": ["eat", "ate", "eaten"],
    // Добавьте больше глаголов по аналогии
};

// Текущий индекс глагола
var currentVerbIndex = 0;

// Массив для хранения ответов пользователя
var userAnswers = [];

// Получить массив глаголов
var verbKeys = Object.keys(verbs);

// Функция для перемешивания массива (алгоритм Фишера-Йетса)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // Пока остаются элементы для перемешивания...
    while (0 !== currentIndex) {

        // Выбираем оставшийся элемент...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // И меняем его местами с текущим элементом.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Перемешиваем массив глаголов перед началом игры
verbKeys = shuffle(verbKeys);

// Обработчик события нажатия на кнопку "Начать"
document.getElementById('start').addEventListener('click', function() {
    // Получить количество глаголов из поля ввода
    var numVerbs = document.getElementById('numVerbs').value;

    // Убедиться, что количество глаголов не превышает общее количество глаголов
    numVerbs = Math.min(numVerbs, verbKeys.length);

    // Перемешать массив глаголов и взять первые numVerbs глаголов
    verbKeys = shuffle(verbKeys).slice(0, numVerbs);

    // Показать второй экран
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';

    // Заполнить глагол на русском языке
    document.getElementById('russianVerb').innerText = verbKeys[currentVerbIndex];
});

// При загрузке страницы отобразить общее количество глаголов
window.onload = function() {
    document.getElementById('totalVerbs').innerText = 'из ' + verbKeys.length;
};


// Обработчик события нажатия на кнопку "Показать 1 форму"
document.getElementById('showFirstForm').addEventListener('click', function() {
    // Показать 1 форму глагола
    alert(verbs[verbKeys[currentVerbIndex]][0]);
});

// Обработчик события нажатия на кнопку "Далее"
document.getElementById('next').addEventListener('click', function() {
    // Проверить ответы пользователя
    var secondForm = document.getElementById('secondForm').value;
    var thirdForm = document.getElementById('thirdForm').value;

    // Сохранить ответы пользователя
    userAnswers.push([secondForm, thirdForm]);

    if (secondForm === verbs[verbKeys[currentVerbIndex]][1] && thirdForm === verbs[verbKeys[currentVerbIndex]][2]) {
        // Если ответы правильные, перейти к следующему глаголу
        currentVerbIndex++;
        if (currentVerbIndex < verbKeys.length) {
            // Если еще есть глаголы, обновить экран
            document.getElementById('russianVerb').innerText = verbKeys[currentVerbIndex];
            document.getElementById('secondForm').value = '';
            document.getElementById('thirdForm').value = '';
        } else {
            // Если глаголы закончились, показать финальный экран
            document.getElementById('screen2').style.display = 'none';
            document.getElementById('screen4').style.display = 'flex';

            // Отобразить результаты в таблице
            var table = document.getElementById('verbTable');
            for (var i = 0; i < verbKeys.length; i++) {
                var row = table.insertRow(-1);
                row.insertCell(0).innerText = verbKeys[i];
                for (var j = 0; j < 3; j++) {
                    var cell = row.insertCell(j + 1);
                    cell.innerText = verbs[verbKeys[i]][j];
                    if (j > 0) {
                        // Выделить правильные и неправильные ответы
                        cell.style.color = userAnswers[i][j - 1] === verbs[verbKeys[i]][j] ? 'green' : 'red';
                    }
                }
            }

            // Отобразить количество полностью правильно введенных глаголов
            var correctCount = userAnswers.filter(function(answer, index) {
                return answer[0] === verbs[verbKeys[index]][1] && answer[1] === verbs[verbKeys[index]][2];
            }).length;
            document.getElementById('finalScore').innerText = 'Полностью правильно введенных глаголов: ' + correctCount + ' из ' + verbKeys.length;
        }
    } else {
        // Если ответы неправильные, показать правильные ответы
        document.getElementById('screen2').style.display = 'none';
        document.getElementById('screen3').style.display = 'flex';
        document.getElementById('correctAnswers').innerText = verbs[verbKeys[currentVerbIndex]].join(', ');
    }
});

// Обработчик события нажатия на кнопку "Следующий глагол" на третьем экране
document.getElementById('nextVerb').addEventListener('click', function() {
    // Перейти к следующему глаголу
    currentVerbIndex++;
    if (currentVerbIndex < verbKeys.length) {
        // Если еще есть глаголы, вернуться ко второму экрану
        document.getElementById('screen3').style.display = 'none';
        document.getElementById('screen2').style.display = 'flex';
        document.getElementById('russianVerb').innerText = verbKeys[currentVerbIndex];
        document.getElementById('secondForm').value = '';
        document.getElementById('thirdForm').value = '';
    } else {
        // Если глаголы закончились, показать финальный экран
        document.getElementById('screen3').style.display = 'none';
        document.getElementById('screen4').style.display = 'flex';
    }
});

// Обработчик события нажатия на кнопку "Запустить заново" на финальном экране
document.getElementById('restart').addEventListener('click', function() {
    // Сбросить все данные и вернуться к первому экрану
    currentVerbIndex = 0;
    userAnswers = [];
    document.getElementById('screen4').style.display = 'none';
    document.getElementById('screen1').style.display = 'flex';
    document.getElementById('verbTable').innerHTML = '<tr><th>Глагол</th><th>1 форма</th><th>2 форма</th><th>3 форма</th></tr>';
});
