class RandomPlayer {

    constructor(id) { this.id = id}

    getMove(state) {
        var choice = Math.floor(Math.random() * (8 - 0 + 1)) + 0
        // console.log(`${this.id} looking at ${state}, choosing ${choice}`)
        return choice
    }

    feedback(oldState, newState, action, reward) {
        //console.log(`feedback for ${this.id}: ${reward}`)
    }
}

module.exports = RandomPlayer