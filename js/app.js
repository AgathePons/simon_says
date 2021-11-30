/**
 * 
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: ['red','green','blue','yellow'],
  // this var will contain the sequence said by Simon
  sequence: [],
  // compteur
  indice: 0,
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
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '45px';
    // and reset the same style, after a small pause (150 ms)
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);
  },

  newGame: function () {
    app.indice = 0;
    // start by reseting the sequence 
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random()*4);
      // add the corresponding color to the sequence
      app.sequence.push( app.colors[random] );
    }
    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
    console.log(app.sequence);
    app.showDelayedMessage(1350 * app.sequence.length);
  },

  simonSays: function (sequence) {
    if (sequence && sequence.length) {
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    }
    app.showMessage('Mémorisez la séquence');
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
    app.showDelayedMessage(500 + 850 * app.sequence.length);
  },
  gameOver: () => {
    alert(`Partie terminée. Votre score est ${app.sequence.length}`);
    app.showButton();
    app.sequence = [];
  },
  clickPlayer: (e) => {
    const clickedCellId = e.target.id;
    app.bumpCell(clickedCellId);
    
    console.log('clic:', clickedCellId, '/', app.sequence[app.indice]);
    if (clickedCellId === app.sequence[app.indice] && app.indice + 1 < app.sequence.length) {
      console.log('bonne couleur');
      //console.log('indice:', app.indice, 'sequence:', app.sequence.length);
      app.indice++;
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

  init: () => {
    app.drawCells();
    // listen click on the "go" button
    app.playButton.addEventListener('click', app.newGame);
    app.playground.addEventListener('click', app.clickPlayer);
  },
};

document.addEventListener('DOMContentLoaded', app.init);