let btn = document.querySelector(".btn");
let inp = document.querySelector(".taskFirst");
let list = document.querySelector(".task-list");

let email = document.querySelector(".taskSecond");
let listmail = document.querySelector(".task-list1");

let image = document.querySelector(".taskThird");
let listimage = document.querySelector(".task-last2");

render(); 

btn.addEventListener("click", () => {
  if (inp.value === "") {
    alert("Заполните имя!");
    return; 
  }

  let obj = { task: inp.value }; 
  setItemToStorage(obj);
  render(); 
  inp.value = ""; 
});

btn.addEventListener("click", () => {
  if (email.value === "") {
    alert("Заполните Email!");
    return; 
  }

  let obj = { task: email.value }; 
  setItemToStorage(obj); 
  render(); 
  email.value = ""; 
});

btn.addEventListener("click", () => {
  if (image.value === "") {
    alert("Добавьте фото!");
    return; 
  }

  let obj = { task: image.value }; 
  setItemToStorage(obj); 
  render(); 
  image.value = ""; 
});


function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task); 
  localStorage.setItem("task-data", JSON.stringify(data));
}

function render() {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", JSON.stringify([])); 
  }

  let newData = JSON.parse(localStorage.getItem("task-data")); 
  list.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = item.task;
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    li.append(btnDelete);
    li.append(btnEdit);
    list.append(li); 
    btnDelete.addEventListener("click", () => {
      deleteElement(index); 
    });
    btnEdit.addEventListener("click", () => {
      editElement(index); 
    });
  });
}

function deleteElement(id) {
    let data = JSON.parse(localStorage.getItem("task-data"));
    data.splice(id, 1); 
    localStorage.setItem("task-data", JSON.stringify(data));
    render();
  }
  
  
  let mainModal = document.querySelector(".main-modal");
  let btnCloser = document.querySelector(".btn-closer");
  let btnSave = document.querySelector(".btn-save");
  let inpEdit = document.querySelector(".inp-edit");
  
  function editElement(id) {
    mainModal.style.display = "block"; 
    let data = JSON.parse(localStorage.getItem("task-data"));
    inpEdit.setAttribute("id", id); id
    inpEdit.value = data[id].task; 
  }
  
  btnSave.addEventListener("click", () => {
    if (inpEdit.value.trim() === "") {
      alert("Заполните поле!");
      return;
    }
    let data = JSON.parse(localStorage.getItem("task-data"));
    let editTask = {
      task: inpEdit.value,
    };
    let index = inpEdit.id; 
    data.splice(index, 1, editTask);
    console.log(data);
    localStorage.setItem("task-data", JSON.stringify(data));
    mainModal.style.display = "none"; 
    render(); 
  });
    
  btnCloser.addEventListener("click", () => {
    mainModal.style.display = "none";
  });


  