class Game {
    constructor(game, players) {
        this.players = players
        this.game = game
    }
    tick() {
        var state = this.game.getBoard()
        var player = this.players.shift()
        var action = player.getMove(state)

        var reward = this.game.choose(action)

        if(reward)
            this.players.push(player)
        else
            this.players.unshift(player)

        player.feedback(state, this.game.getBoard(), action, reward)

        return this.game.getStatus()

    }
}

module.exports = Game

// var TTT = require('./tictactoe.js')
// var player = require('./randomPlayer.js')

// var g = new Game(new TTT(),[ new player('O'), new player('X')])

// var t = g.tick()
// while(t == 'ongoing') {
//    t = g.tick()
//    console.log(t)
// }
