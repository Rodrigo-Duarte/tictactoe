'use strict'

var chai = require('chai')
var Game = require('../src/game.js')
var sinon = require('sinon')
chai.should()

describe('Game', function() {
  describe("Tick", function() {
    it("Should input player's input to game", function() {
        var playerApi = { getMove: () => {}, feedback: () => {} }
        var gameApi = { getBoard: () => {}, choose: () => {}, getStatus: () => {} }

        playerApi.getMove = sinon.stub().withArgs("state").returns("move")

        gameApi.choose = sinon.stub().withArgs("move").returns("result")
        gameApi.getBoard = sinon.stub().onFirstCall().returns("state")
                                        .onSecondCall().returns("state_prime")


        var p1 = sinon.mock(playerApi);
        p1.expects("feedback").once().withExactArgs("state", "state_prime", "move", "result")

        var game = sinon.mock(gameApi)
        game.expects("getStatus").once()

        var instance = new Game(gameApi, [playerApi])
        instance.tick()

        game.verify()
        p1.verify()
    })

    it("Should alternate player's inputs to game", function() {
        var playerApi = { getMove: () => {}, feedback: () => {} }
        var playerApi2 = { getMove: () => {}, feedback: () => {} }
        var gameApi = { getBoard: () => {}, choose: () => {}, getStatus: () => {} }

        playerApi.getMove  = sinon.stub().withArgs("state" ).returns("move")
        playerApi2.getMove = sinon.stub().withArgs("state2").returns("move2")

        var stub = sinon.stub()
        stub.withArgs("move" ).returns("result")
        stub.withArgs("move2").returns("result2")

        gameApi.choose = stub
        gameApi.getBoard = sinon.stub().onFirstCall().returns("state")
                                        .onSecondCall().returns("state_prime")
                                        .onThirdCall().returns("state2")
                                        .onCall(3).returns("state_prime2")


        var p1 = sinon.mock(playerApi);
        var p2 = sinon.mock(playerApi2);
        var game = sinon.mock(gameApi)

        game.expects("getStatus").twice()

        p1.expects("feedback").once().withExactArgs("state", "state_prime", "move", "result")
        p2.expects("feedback").once().withExactArgs("state2", "state_prime2", "move2", "result2")

        var instance = new Game(gameApi, [playerApi, playerApi2])

        instance.tick()
        instance.tick()

        game.verify()
        p1.verify()
        p2.verify()
    })
  })
})