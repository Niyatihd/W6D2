class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $('li').on('click', (e) => {
      this.makeMove($(e.currentTarget));
    })
  }
  
  makeMove($square) {
    const mark = this.game.currentPlayer;

    try {
      this.game.playMove($square.data('pos'));
    } catch(err) {
      alert(err.msg)
      return;
    }
   
    let view = this;
    if (this.game.isOver()) {
        setTimeout(function() {alert(`${view.game.winner()} won!`)},0);
    }

    $square.text(mark);
    $square.css('background', 'lightgreen');
    if (mark === "x") {
      $square.css('color', 'pink');
    } else {
      $square.css('color', 'blue');
    }

  }
  
  setupBoard() {
    const $ul = $('<ul>');
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const $li = $('<li>');
        $li.data('pos', [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
