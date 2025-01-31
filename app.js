"use strict";
const todoContainer = document.querySelector(".todo__container");
const todoHeader = document.querySelector(".todo__header");
const todoBody = document.querySelector(".todo__body");
const todoInput = document.querySelector(".todo__input__field");
const addBtn = document.querySelector(".todo__input__btn");
const todoList = document.querySelector(".todo__list");
const todoListItem = document.querySelector(".todo__list__items");

// load content after HTML load complete
document.addEventListener("DOMContentLoaded", function () {
  // brand new array or loading previous local storage data
  let data = JSON.parse(localStorage.getItem("data")) || [];

  // render DOM FUNCTION
  function renderDom(input) {
    // create li
    let html = `<li class="todo__list__item">
                        <span class="todo__list__item__text">${input}</span>
                        <button class="todo__list__item__btn">Delete</button>
                    </li>`;

    todoListItem.insertAdjacentHTML("beforeend", html);
  }
  // render li task to  DOM
  data.forEach((el) => {
    renderDom(el);
  });
  function addTask() {
    // inputText value
    let inputText = todoInput.value.trim();
    if (!inputText) return;
    renderDom(inputText);
    // add input text to new empty array[]
    data.push(inputText);
    todoInput.value = "";
    // add task input to localStorage
    localStorage.setItem("data", JSON.stringify(data));
  }

  // add task value to Dom and local Storage
  addBtn.addEventListener("click", addTask);
  // add task on key press"Enter"
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
// linethrough task item on completed
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo__list__item__text")) {
    console.log(e.target);
    e.target.classList.toggle("completed");
  }
});

// remove from Dom and localStorage
todoListItem.addEventListener("click", (e) => {
  //tsrget the element to delete
  if (e.target.classList.contains("todo__list__item__btn")) {
    let targetLi = e.target.closest(".todo__list__item");
    let targetText = targetLi.querySelector(
      ".todo__list__item__text"
    ).textContent;

    // remove target li from DOM
    targetLi.remove();

    // updata local storage
    let data = JSON.parse(localStorage.getItem("data")) || [];

    // filtering localStorage data without current li
    data = data.filter((el) => el !== targetText);
    localStorage.setItem("data", JSON.stringify(data));
  }
});
