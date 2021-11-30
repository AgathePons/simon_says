/**
 * 
 * Code fourni
 */
const app = {
  colors: ['red','green','blue','yellow'],
  sequence: [],
  indice: 0,
  isPlayerTurn: false,
  // HTML element needed
  messageBloc: document.getElementById('message'),
  playButton: document.getElementById('go'),
  playground: document.getElementById('playground'),
  // ------ methods ------ //
  drawCells: function () {
    const playground = document.getElementById('playground');
    for (const color of app.colors) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = color;
      playground.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // modify the syle and reset the same style after a pause (150 ms)
    document.getElementById(color).style.borderWidth = '45px';
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);
  },

  newGame: function () {
    app.indice = 0;
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get random colour and push it in sequence
      let random = Math.floor(Math.random()*4);
      app.sequence.push( app.colors[random] );
    }
    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
    console.log(app.sequence);
    //app.showDelayedMessage(1350 * app.sequence.length);
  },

  simonSays: function (sequence) {
    if (sequence && sequence.length) {
      app.isPlayerTurn = false;
      app.showMessage('Mémorisez la séquence');
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    } else {
      app.isPlayerTurn = true;
      app.showMessage('Reproduisez la séquence');
      app.timer = setTimeout(app.gameOver, 5000);
    }
  },
  showMessage: function (message) {
    app.playButton.classList.add('hidden');
    app.messageBloc.classList.remove('hidden');
    app.messageBloc.innerHTML = message;
  },
  showDelayedMessage: (timeOut) => {
    window.setTimeout(app.showMessage, timeOut, 'Reproduisez la séquence');
  },
  showButton: () => {
    app.messageBloc.classList.add('hidden');
    app.playButton.classList.remove('hidden');
  },
  nextMove: () => {
    let random = Math.floor(Math.random()*4);
    app.sequence.push( app.colors[random] );
    console.log(app.sequence);
    app.simonSays(app.sequence);
    //app.showDelayedMessage(500 + 850 * app.sequence.length);
  },
  gameOver: () => {
    alert(`Partie terminée. Votre score est ${app.sequence.length - 1}`);
    app.showButton();
    app.sequence = [];
  },
  clickPlayer: (e) => {
    if (!app.isPlayerTurn) {
      return;
    }
    clearTimeout(app.timer);
    const clickedCellId = e.target.id;
    app.bumpCell(clickedCellId);
    if (clickedCellId === app.sequence[app.indice] && app.indice + 1 < app.sequence.length) {
      console.log('bonne couleur');
      //console.log('indice:', app.indice, 'sequence:', app.sequence.length);
      app.indice++;
      app.timer = setTimeout(app.gameOver, 5000);
    } else if (clickedCellId === app.sequence[app.indice] && app.indice + 1 === app.sequence.length) {
      //console.log('indice:', app.indice, 'sequence:', app.sequence.length);
      app.indice = 0;
      console.log('indice remis à', app.indice);
      app.nextMove();
    } else {
      app.indice = 0;
      app.gameOver();
    }
  },
  countdown: () => {
    window.setTimeout(console.log, 2000, 'pouet');
    function clearAlert() {
      window.clearTimeout(window.setTimeout(console.log, 2000, 'pouet'));
    }
  },
  clearCountdown: () => {
    window.clearTimeout(window.setTimeout(console.log, 2000, 'pouet'));
  },

  init: () => {
    app.drawCells();
    app.playButton.addEventListener('click', app.newGame);
    app.playground.addEventListener('click', app.clickPlayer);
  },
};

document.addEventListener('DOMContentLoaded', app.init);