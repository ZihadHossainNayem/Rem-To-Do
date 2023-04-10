window.addEventListener("load", () => {
  toDo = JSON.parse(localStorage.getItem("toDo")) || [];
  const inputName = document.querySelector("#name");
  const toDoForm = document.querySelector("#todo-form");
  const username = localStorage.getItem("username") || "";

  inputName.value = username;

  inputName.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  toDoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const singleToDo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    toDo.push(singleToDo);

    localStorage.setItem("toDo", JSON.stringify(toDo));

    e.target.reset();

    displayToDo();
  });

  displayToDo();
});

function displayToDo() {
  const todoList = document.querySelector("#todo-list");

  if (!todoList) {
    return;
  }
  todoList.innerHTML = "";

  toDo.forEach((singleToDo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const action = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = singleToDo.done;
    span.classList.add("bubble");

    if (singleToDo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    action.classList.add("action");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${singleToDo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    action.appendChild(edit);
    action.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(action);

    todoList.appendChild(todoItem);

    if (singleToDo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      singleToDo.done = e.target.checked;
      localStorage.setItem("toDo", JSON.stringify(toDo));

      if (singleToDo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
      displayToDo();
    });

    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        singleToDo.content = e.target.value;
        localStorage.setItem("toDo", JSON.stringify(toDo));
        displayToDo();
      });
    });

    deleteBtn.addEventListener("click", (e) => {
      toDo = toDo.filter((t) => t != singleToDo);
      localStorage.setItem("toDo", JSON.stringify(toDo));
      displayToDo();
    });
  });
}
