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
        dom.getBoardTitle();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    createBoardDivs: function(board){
        const columns = dom.appendColumns();
        return `
            <section id="${board.id}" class = "board">
                <div class="board-header"><span class="board-title">${board.title}</span>
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
            boardList += dom.createBoardDivs(board);}
            const outerHtml = `
                <div class="board-container">
                    ${boardList}
                </div>
            `;
        const boardsDiv = document.querySelector('#boards');
        boardsDiv.innerHTML = "";
        this._appendToElement(boardsDiv, outerHtml);
    },
    appendColumns: function(){
        const statusHeaders = ['New','In Progress', 'Testing', 'Done'];
        let columns = "";

            for(let status of statusHeaders){
                columns +=
                `<div class="board-column">
                    <div class="board-column-title">${status}</div>
                    <div class="board-column-content"></div>
                </div>`;
            }
        return columns
    },
    showStatusColumns: function(){
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    getBoardTitle: function () {
        let saveTitle = document.querySelector('#save-title-btn');
        saveTitle.addEventListener('click', function(event) {
            event.preventDefault();
            let boardTitle = document.querySelector('#board-title').value;
            dataHandler.createNewBoard(boardTitle, function(board){
                dom.addNewBoard(board);
            })
        })
    },
    addNewBoard: function(board){
        console.log(board);
        const textNode = dom.createBoardDivs(board);
        const newBoard = document.querySelector('.board-container');
        dom._appendToElement(newBoard, textNode,false);
    }
};
