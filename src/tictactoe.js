var winCombinationPositions = [
    [0,1,2],[3,4,5],[6,7,8], //row
    [0,3,6],[1,4,7],[2,5,8], //column
    [0,4,8],[2,4,6]          //diag
]

function processStatus(board) {
    for (var i = 0; i < winCombinationPositions.length; i++) {
        var filtered = board.filter((val, ind) => winCombinationPositions[i].includes(ind))
        var uniqueItems = new Set(filtered)
        if (!uniqueItems.has('') && uniqueItems.size == 1)
            return `${uniqueItems.values().next().value} won`
    }
    return board.includes('') ? 'ongoing' : 'tie'
}

class TicTacToe {

    constructor () {
        this.turn = ['O', 'X']
        this.board = ['','','','','','','','','']
        this.status = 'ongoing'
    }
    getTurn() {
        return this.turn[0]
    }
    getBoard() {
        return this.board
    }
    getStatus() {
        return this.status
    }
    choose(pos) {
        if (this.board[pos] != '' || this.getStatus() != 'ongoing')
            return false

        var player = this.turn.shift()
        this.board[pos] = player
        this.turn.push(player)
        this.status = processStatus(this.board)
        return true
    }
}

module.exports = TicTacToe