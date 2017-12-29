'use strict'

var chai = require('chai')
var RecordingPlayer = require('../src/recordingPlayer.js')
var sinon = require('sinon')
chai.should()

describe('Recording Player', function() {
  describe("Observations", function() {
    it("Should keep track of state and transition", function() {
        var initialState = new RecordingPlayer.State('State0', 0)
        var rec = new RecordingPlayer('test', initialState)

        rec.feeback('State0', "State1", 'action', 0.5)

        var expectedStatePrime = new RecordingPlayer.State('State1', 0.5)

        rec.getStates().should.deep.equals([initialState, expectedStatePrime])
        rec.getTransitions().should.deep.equals([new RecordingPlayer.Transition(initialState, 'action', expectedStatePrime)])
    })

    it("Should not duplicate states", function() {
        var initialState = new RecordingPlayer.State('State0', 0)
        var rec = new RecordingPlayer('test', initialState)

        rec.feeback('State0', "State1", 'action', 0.5)
        rec.feeback('State0', "State1", 'action', 0.5)
        rec.feeback('State1', "State1", 'action', 0.5)

        var expectedStatePrime = new RecordingPlayer.State('State1', 0.5)

        rec.getStates().should.deep.equals([initialState, expectedStatePrime])
    })

    it("Should not duplicate transitions", function() {
        var initialState = new RecordingPlayer.State('State0', 0)
        var rec = new RecordingPlayer('test', initialState)

        rec.feeback('State0', "State1", 'action', 0.5)
        rec.feeback('State0', "State1", 'action', 0.5)
        rec.feeback('State1', "State1", 'action', 0.5)
        rec.feeback('State1', "State1", 'action', 0.5)

        var expectedStatePrime = new RecordingPlayer.State('State1', 0.5)

        rec.getTransitions().should.deep.equals([
            new RecordingPlayer.Transition(initialState, 'action', expectedStatePrime),
            new RecordingPlayer.Transition(expectedStatePrime, 'action', expectedStatePrime)
            ])
    })
  })
})