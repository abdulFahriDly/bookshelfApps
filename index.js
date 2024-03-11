const submit = document.getElementById("bookSubmit")
const isComplete = document.getElementById("inputBookIsComplete")
const text = document.getElementById("text")

isComplete.addEventListener("change", ()=>{
  isComplete.checked ? text.innerHTML = "Sudah selesai dibaca" : text.innerHTML = "Belum selesai dibaca"
  isComplete.checked ? isComplete.value = 1 : isComplete.value = 0
})

function checkForStorage() {
  return typeof (Storage) !== 'undefined';
}

function putUserList(data) {
  if (checkForStorage()) {
    let userData = [];
    if (localStorage.getItem(storageKey) !== null) {
      userData = JSON.parse(localStorage.getItem("book"));
    }
    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }
    localStorage.setItem(storageKey, JSON.stringify(userData));
  }
}

function putUserList(data) {
  if (checkForStorage()) {
    let userData = [];
    if (localStorage.getItem("book") !== null) {
      userData = JSON.parse(localStorage.getItem("book"));
    }
    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }
    localStorage.setItem("book", JSON.stringify(userData));
  }
}

const data = JSON.parse(localStorage.getItem("book"))
function renderUserList() {
  let inComplete = document.getElementById("incompleteBookshelfList")
  let complete = document.getElementById("completeBookshelfList")
  // console.log(data[0].isComplete ? )
  Object.keys(data).forEach((key, i) =>{
    // console.log(typeof(data[key].isComplete))
    if(data[key] !== null){
    if(data[key].isComplete == false){
      // console.log(i,"hhhh")
      inComplete.innerHTML += `<article class="book_item">
       <h3>${data[key].title}</h3>
       <p>id: <span class="id">${data[key].id}</span></p>
       <p>Penulis: ${data[key].author}</p>
       <p>Tahun: ${data[key].year}</p>
  
       <div class="action">
         <button class="green">Selesai dibaca</button>
         <button class="red">Hapus buku</button>
       </div>
     </article>`
    }else{
      complete.innerHTML += `<article class="book_item">
       <h3>${data[key].title}</h3>
       <p>id: <span class="id">${data[key].id}</span></p>
       <p>Penulis: ${data[key].author}</p>
       <p>Tahun: ${data[key].year}</p>
  
       <div class="action">
         <button class="green">Belum selesai dibaca</button>
         <button class="red">Hapus buku</button>
       </div>
     </article>`
    }}
  })

} 

submit.addEventListener("click", (e)=>{
  const judul = document.getElementById("inputBookTitle")
  const penulis = document.getElementById("inputBookAuthor")
  const tahun = document.getElementById("inputBookYear")
  const isComplete = document.getElementById("inputBookIsComplete")
  const newData = {
    id: Date.now(),
    title: judul.value,
    author: penulis.value,
    year: parseInt(tahun.value),
    isComplete: Boolean(parseInt(isComplete.value))
  }
  putUserList(newData);
})
renderUserList();

let red = document.querySelectorAll(".red")
const green = document.querySelectorAll(".green")
let id = document.querySelectorAll(".id")
let v = []
Object.keys(data).forEach(key=>{
  if(data[key] !== null){
    v.push(data[key])
  }
})
for(let i = 0; i < red.length; i++){
  red[i].addEventListener("click", ()=>{
    console.log(id[i].textContent)
    Object.keys(v).forEach(key=>{
      if(data[key] == null){
        delete(data[key])
      }
      if(id[i].textContent == data[key].id){
        // alert(id[i].textContent)
        Object.keys(v).forEach(key=>{
          if(v[key] == null){
            delete(v[key])
          }
          if(id[i].textContent == v[key].id && v[key] !== null){
            delete(v[key])
          }
        })
        window.location.reload()
        delete(data[key])
        localStorage.removeItem("book")
      }
      localStorage.setItem("book", JSON.stringify(v))
    })
  })
  
  green[i].addEventListener("click", ()=>{
    Object.keys(v).forEach(key=>{
      if(id[i].textContent == v[key].id){
        v[key].isComplete == false ? v[key].isComplete = true : v[key].isComplete = false
        window.location.reload()
        // delete(data[key])
        localStorage.removeItem("book")
      }
      localStorage.setItem("book", JSON.stringify(v))
    })
  })
}