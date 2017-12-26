'use strict'

var chai = require('chai')
var TicTacToe = require('../src/tictactoe.js')
chai.should()

describe('TicTacToe', function() {
  describe('Starting logic', function() {
    it('should start with O', function() {
        var instance = new TicTacToe()

        instance.getTurn().should.equal('O')
    })

    it('should start with empty board', function() {
        var instance = new TicTacToe()

        instance.getBoard().should.deep.equal(['','','','','','','','',''])
    })
  })

  describe('Basic move', function() {
    it('should alternate players', function() {
        var instance = new TicTacToe()
        instance.getTurn().should.equal('O')
        instance.choose(0)
        instance.getTurn().should.equal('X')
    })

    it('should add current player mark to selected position', function() {
        var instance = new TicTacToe()
        instance.choose(4)
        instance.getBoard().should.deep.equal(['','','','','O','','','',''])

        var ret = instance.choose(5)
        instance.getBoard().should.deep.equal(['','','','','O','X','','',''])
        ret.should.equal(true)
    })
  })

  describe('Basic restrictions', function() {
    it('should not allow override occupied position', function() {
        var instance = new TicTacToe()
        instance.choose(4)
        instance.getBoard().should.deep.equal(['','','','','O','','','',''])

        var ret = instance.choose(4)
        instance.getBoard().should.deep.equal(['','','','','O','','','',''])
        ret.should.equal(false)
        instance.getStatus().should.equal('ongoing')
    })

    it('should not allow out of bounds', function() {
        var instance = new TicTacToe()
        var ret = instance.choose(-1)
        instance.getBoard().should.deep.equal(['','','','','','','','',''])
        ret.should.equal(false)

        ret = instance.choose(9)
        instance.getBoard().should.deep.equal(['','','','','','','','',''])
        ret.should.equal(false)
        instance.getStatus().should.equal('ongoing')
    })

    it('should not allow plays after end of game', function() {
        var instance = new TicTacToe()
        instance.choose(0)
        instance.choose(3)
        instance.choose(1)
        instance.choose(4)
        instance.choose(2)
        instance.getBoard().should.deep.equal([ 'O','O','O',
                                                'X','X','',
                                                '','',''])

        var ret = instance.choose(5)
        instance.getBoard().should.deep.equal([ 'O','O','O',
                                                'X','X','',
                                                '','',''])

        ret.should.equal(false)
    })
  })

  describe('End of game', function() {
    it('Win for O on row filled', function() {
        var instance = new TicTacToe()
        instance.choose(0)
        instance.choose(3)
        instance.choose(1)
        instance.choose(4)
        instance.choose(2)
        instance.getBoard().should.deep.equal([ 'O','O','O',
                                                'X','X','',
                                                '','',''])

        instance.getStatus().should.equal('O won')
    })

    it('Win for X on column filled', function() {
        var instance = new TicTacToe()
        instance.choose(0)
        instance.choose(1)
        instance.choose(3)
        instance.choose(4)
        instance.choose(8)
        instance.choose(7)
        instance.getBoard().should.deep.equal([ 'O','X','',
                                                'O','X','',
                                                '','X','O'])

        instance.getStatus().should.equal('X won')
    })

    it('Should end on tie', function() {
        var instance = new TicTacToe()
        instance.choose(4)
        instance.choose(8)
        instance.choose(6)
        instance.choose(2)
        instance.choose(5)
        instance.choose(7)
        instance.choose(1)
        instance.choose(3)
        instance.choose(0)
        instance.getBoard().should.deep.equal([ 'O','O','X',
                                                'X','O','O',
                                                'O','X','X'])

        instance.getStatus().should.equal('tie')
    })

  })
})