const area = document.getElementById('area');
let move = 0;
let result = '';
const contentWrapper = document.getElementById('content');
const modalResult = document.getElementById('modal-result-wrapper');
const overlay = document.getElementById('overlay');
const btnClose = document.getElementById('btn-close');
const historyListNode = document.querySelector('.history-list');

area.addEventListener('click', e => {
    if (e.target.className === 'box' && e.target.innerHTML === '') {
        move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = '0';
        e.target.classList.add('flip');
        move++;
        check();
    }
});

const check = () => {
    const boxes = document.getElementsByClassName('box');
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < arr.length; i++) {
        if (
            boxes[arr[i][0]].innerHTML === 'X' && boxes[arr[i][1]].innerHTML === 'X' && boxes[arr[i][2]].innerHTML === 'X'
        ) {
            result = 'крестики';
            prepareResult(result);
            return;
        } else if (
            boxes[arr[i][0]].innerHTML === '0' && boxes[arr[i][1]].innerHTML === '0' && boxes[arr[i][2]].innerHTML === '0'
        ) {
            result = 'нолики';
            prepareResult(result);
            return;
        }
    }
    if (move === 9 && result === '') {
        result = 'Ничья';
        prepareResult(result);
    }
};

const prepareResult = winner => {
    if (winner === "Ничья") {
        contentWrapper.innerHTML = 'Ничья';
    } else {
        contentWrapper.innerHTML = `Победили ${winner} !`;
    }
    saveResult(winner);
    modalResult.style.display = 'block';
};

const saveResult = winner => {
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.push({ winner: winner, move: move });
    if (results.length > 10) {
        results.shift(); // удаляем старейшую запись, чтобы сохранить только последние 10
    }
    localStorage.setItem('results', JSON.stringify(results));
    showRecords();
};

const showRecords = () => {
    historyListNode.innerHTML = ''; // Очистка списка перед обновлением
    const results = JSON.parse(localStorage.getItem('results')) || [];
    results.forEach(record => {
        historyListNode.innerHTML += `<li class="history-list-item">${record.winner} победили за ${record.move} ходов</li>`;
    });
};

const closeModal = () => {
    modalResult.style.display = 'none';
    location.reload();
};

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);

// Показать результаты при загрузке страницы
showRecords();
