// Объект с глаголами и их формами
var verbs = {
    // Пример структуры данных
    "идти": ["go", "went", "gone"],
    "идти2": ["go", "went", "gone"],
    // Добавьте больше глаголов по аналогии
};

// Текущий индекс глагола
var currentVerbIndex = 0;

// Массив для хранения ответов пользователя
var userAnswers = [];

// Получить массив глаголов
var verbKeys = Object.keys(verbs);

// Обработчик события нажатия на кнопку "Начать"
document.getElementById('start').addEventListener('click', function() {
    // Показать второй экран
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'flex';

    // Заполнить глагол на русском языке
    document.getElementById('russianVerb').innerText = verbKeys[currentVerbIndex];
});

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
