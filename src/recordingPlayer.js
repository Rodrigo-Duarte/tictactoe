var RandomPlayer = require('./randomPlayer.js')

class RecordingPlayer extends RandomPlayer {
    constructor(id, initialState) {
        super(id)
        this.states = [initialState]
        this.transitions = []
    }

    getStates() { return this.states }
    getTransitions() { return this.transitions }

    feeback(oldState, newState, action, reward) {
        //TODO can we use Sets instead of arrays to get rid of the check prior push?
        var sPrime = this.states.find(state => state.id == newState)
        if (!sPrime) {
            sPrime = new State(newState, reward)
            this.states.push(sPrime)
        }

        var s = this.states.find(state => state.id == oldState)
        if (!this.transitions.find(transition => transition.s == s && transition.action == action && transition.sprime == sPrime))
            this.transitions.push(new Transition(s, action, sPrime))
    }
}

class Transition {
    constructor(s, action, sprime) {
        this.s = s
        this.action = action
        this.sprime = sprime
    }
}

class State {
    constructor(s, reward) {
        this.id = s
        this.reward = reward
    }
}

module.exports = RecordingPlayer
module.exports.State = State
module.exports.Transition = Transition