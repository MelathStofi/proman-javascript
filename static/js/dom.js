// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }
        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
        dom.loadBoardTitle();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
            for (let board of boards) {
                dom.loadCards(board.id);
            }
        });
    },
    createBoardDivs: function(board){
        const columns = dom.appendColumns(board.id);
        return `
            <section class = "board">
                <div id="" class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class = "board-columns">${columns}</div>
            </section>
            `;
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = '';

        for(let board of boards) {
            boardList += dom.createBoardDivs(board);
        }
            const outerHtml = `
                <div class="board-container">
                    ${boardList}
                </div>
            `;
        const boardsDiv = document.querySelector('#boards');
        boardsDiv.innerHTML = "";
        this._appendToElement(boardsDiv, outerHtml);
    },
    appendColumns: function(boardId){
        const statusHeaders = ['New','In Progress', 'Testing', 'Done'];
        let columns = "";
            for(let i = 0; i < statusHeaders.length; i++){
                columns +=
                `<div class="board-column">
                    <div class="board-column-title">${statusHeaders[i]}</div>
                    <div class="board-column-content" data-board-id="${boardId}" data-status-id="${i}"></div>
                </div>`;
            }
        return columns
    },
    showStatusColumns: function(){
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(cards)
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        const columnContent = document.querySelectorAll('.board-column-content');
        for (let column of columnContent) {
            for (let card of cards) {
                if (card.status_id === Number(column.dataset.statusId) && card.board_id === Number(column.dataset.boardId)) {
                    console.log(card);
                    column.innerHTML += dom.createCardDivs(card);
                }
            }
        }
    },
    createCardDivs: function (card) {
        return `
            <div class="card">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.title}</div>
            </div>
            `
    },
    loadBoardTitle: function () {
        let saveTitle = document.querySelector('#save-title-btn');
        saveTitle.addEventListener('click', function(event) {
            event.preventDefault();
            let boardTitle = document.querySelector('#board-title').value;
            dataHandler.createNewBoard(boardTitle, function(){
                dom.addNewBoard(boardTitle);
            })
        })
    },
    addNewBoard: function(boardTitle){
        const textNode = dom.createBoardDivs(boardTitle);
        console.log(textNode);
        const board = document.querySelector('.board-container');
        dom._appendToElement(board, textNode,false);
    }
};
