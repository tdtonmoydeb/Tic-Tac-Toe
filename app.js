var btn = document.querySelector('.btn');
var board = document.querySelector('.board');
var cells = document.querySelectorAll('.cell');
var x = 'x';
var o = 'o';
var xPoints, oPoints;

if (localStorage.getItem('x') === null) {
    xPoints = 0;
} else {
    xPoints = localStorage.getItem('x');

    let xp = (xPoints < 10) ? '0' + xPoints : xPoints;
    document.querySelector('.one').innerText = xp;
}

if (localStorage.getItem('o') === null) {
    oPoints = 0;
} else {
    oPoints = localStorage.getItem('o');

    let op = (oPoints < 10) ? '0' + oPoints : oPoints;
    document.querySelector('.two').innerText = op;
}

var turn = true;
var turnTxt;
var condition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
  ]

btn.addEventListener('click', start);

start()

function start() {
    cells.forEach(cell => {
        cell.addEventListener('click', tictactoe, {
            once: true
        })
        cell.addEventListener('mouseover', hoverEffect);

        cell.classList.remove(x);
        cell.classList.remove(o);
    })

    turnTxt = (turn) ? x : o;
    document.querySelector('.navigate').innerHTML = turnTxt;

    document.querySelector('.message').classList.remove('show');
}

function tictactoe(e) {
    let item = e.target;
    //console.log(item);

    var current = (turn) ? x : o;
    item.classList.add(current);

    if (checkWin(current)) {
        //console.log(current + 'wins')
        if (current == x) {
            xPoints++
            let points = (xPoints < 10) ? '0' + xPoints : xPoints;
            document.querySelector('.one').innerText = points;
            localStorage.setItem('x', xPoints);
        } else if (current == o) {
            oPoints++
            let points = (oPoints < 10) ? '0' + oPoints : oPoints;
            document.querySelector('.two').innerText = points;
            localStorage.setItem('o', oPoints);
        }

        end(current + ' wins')
    } else if (itsDraw()) {
        //console.log('its draw')

        end('its Draw')
    } else {

        turn = (turn) ? false : true;

        turnTxt = (turn) ? x : o;
        document.querySelector('.navigate').innerHTML = turnTxt;
    }
}

function checkWin(current) {
    return condition.some(cond => {
        return cond.every(index => {
            return cells[index].classList.contains(current);
        })
    })
}

function itsDraw() {
    return [...cells].every(box => {
        return box.classList.contains(x) || box.classList.contains(o);
    })
}

function end(txt) {
    document.querySelector('.message-txt').innerText = txt;
    document.querySelector('.message').classList.add('show');
    turn = (turn) ? false : true;

}

function hoverEffect() {
    if (turn) {
        board.classList.remove(o);
        board.classList.add(x);
    } else if (!turn) {
        board.classList.remove(x);
        board.classList.add(o);
    }
}
