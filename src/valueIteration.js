class ValueIteration {
    constructor (states, transitions) {
        this.states = states
        this.transitions = transitions
    }
    calculateValues(iterations, gamma) {
        var table = createInitialTable(this.states)
        for (var it = 1; it < iterations; it++) {
            table[it] = {}
            for (var stateIndex = 0; stateIndex < this.states.length; stateIndex++) {
                var state = this.states[stateIndex]
                var stateTransitions = this.transitions.filter(trans => trans.s == state)
                var valueIterated = calculateIteration(table[it-1], state, stateTransitions, gamma)
                table[it][state.id] = valueIterated
            }
        }
        return table[iterations-1]
    }
}

function createInitialTable(states) {
    var mappedStates = {}
    states.forEach(st => mappedStates[st.id] = st.reward)
    return { "0": mappedStates }
}

function calculateIteration(previousIteration, aState, aStateTransitions, gamma) {
    var value = aState.reward
    for (var transitionIndex = 0; transitionIndex < aStateTransitions.length; transitionIndex++) {
        value += gamma * previousIteration[aStateTransitions[transitionIndex].sprime.id] / aStateTransitions.length //TODO this division is here to simulate stocahsticity
    }
    return value
}

module.exports = ValueIteration