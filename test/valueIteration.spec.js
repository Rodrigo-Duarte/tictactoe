'use strict'

var chai = require('chai')
var ValueIteration = require('../src/valueIteration.js')
var RecordingPlayer = require('../src/recordingPlayer.js')
var State = RecordingPlayer.State
var Transition = RecordingPlayer.Transition
var sinon = require('sinon')
chai.should()

// examples from http://www.cs.cmu.edu/~./awm/tutorials/mdp09.pdf
describe('ValueIteration', function() {
  describe("Calculation", function() {
    it("Should initialize with state rewards", function() {
        var vi = new ValueIteration([new State('id1', 3), new State('id2', 5)], [])
        var actual = vi.calculateValues(1, 0)
        actual.should.deep.equals({id1: 3, id2: 5})
    })

    it("Should apply value iteration logic", function() {
        var sun = new State('sun', 4)
        var wind =  new State('wind', 0)
        var hail = new State('hail', -8)
        var states = [sun, wind, hail]
        var transitions = [
            new Transition(sun, 'action', sun),
            new Transition(sun, 'action', wind),
            new Transition(wind, 'action', sun),
            new Transition(wind, 'action', hail),
            new Transition(hail, 'action', wind),
            new Transition(hail, 'action', hail),
        ]
        var vi = new ValueIteration(states, transitions)
        var actual = vi.calculateValues(2, 0.5)
        actual.should.deep.equals({'hail': -10, 'wind':-1, 'sun': 5})
    })

    it("Should apply value iteration logic", function() {
        var sun = new State('sun', 4)
        var wind =  new State('wind', 0)
        var hail = new State('hail', -8)
        var states = [sun, wind, hail]
        var transitions = [
            new Transition(sun, 'action', sun),
            new Transition(sun, 'action', wind),
            new Transition(wind, 'action', sun),
            new Transition(wind, 'action', hail),
            new Transition(hail, 'action', wind),
            new Transition(hail, 'action', hail),
        ]
        var vi = new ValueIteration(states, transitions)
        var actual = vi.calculateValues(5, 0.5)
        actual.should.deep.equals({'hail': -11.109375, 'wind':-1.515625, 'sun': 4.875})
    })
  })
})