var notToChange;
var originalData;
var sortedData;

fetch("https://fakestoreapi.com/products")
  .then((data) => {
    return data.json();
  })
  .then((actualdata) => {
    let data = "";
    originalData = [...actualdata];
    notToChange = [...actualdata];
    data = reCall(data, sortedData, actualdata);
    document.getElementById("cards").innerHTML = data;
    let imageElem = document.getElementById("spinner");
    imageElem.style.display = "none";
    pageCall(1);
    // console.log(actualdata);
  })
  .catch((error) => {
    console.log(error);
  });

// let loader = `hello`;
// document.getElementById('cards').innerHTML = loader;
// const imageEl = document.querySelector("#spinner")
// imageEl.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif")

function reCall(data, sortedData, actualdata) {
  let dataRender = sortedData == undefined ? actualdata : sortedData;
  dataRender.map((product) => {
    data += `<div class="card grid-item">
    <div class="card-container">
      <div class="img-container">
        <img class="card-img" src=${product.image} alt="img" />
      </div>  
      
      <div class="card-content">
        <p class="card-header title" id="title">${product.title}</p>
        <div class="desc">
          <p class="card-text description">
         ${product.description}
         </p>
        </div>       
        <p class="card-btn category">${product.category}</p>
        <p class="card-btn price">Rs.${product.price} </p>
      </div>
    </div>
  </div>`;
  });
  return data;
}
function filterForm() {
  let filter = document.getElementById("myInput").value;
  let exactValue = filter.toLowerCase();
  let container = document.getElementById("cards");
  let cards = container.getElementsByClassName("card");

  for (var i = 0; i < cards.length; i++) {
    let category = cards[i].querySelector(".category");
    let text = category.innerText || category.textContent;

    let description = cards[i].querySelector(".description");
    let catText = description.innerText || description.textContent;

    let title = cards[i].querySelector(".title");
    let titleText = title.innerText || title.textContent;
    document.getElementById("btn").style.visibility = "visible";
    if (
      text.indexOf(exactValue) > -1 ||
      titleText.indexOf(exactValue) > -1 ||
      catText.indexOf(exactValue) > -1
    ) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function Reset() {
  let data = "";
  let sortedData = undefined;
  data = reCall(data, sortedData, notToChange);
  document.getElementById("cards").innerHTML = data;
  document.getElementById("btn").style.visibility = "hidden";
}

function filterByCategory() {
  var e = document.getElementById("filterdown");
  var text = e.options[e.selectedIndex].text.toLowerCase();
  console.log(text);
  document.getElementById("btn").style.visibility = "visible";
  let container = document.getElementById("cards");
  let cards = container.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector(".category").innerText;
    if (title == text) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function Sorting() {
  sortedData = [...notToChange];
  document.getElementById("btn").style.visibility = "visible";
  var e = document.getElementById("sortdown");
  var value = e.value;
  var selected = value.toLowerCase();
  // console.log(selected);
  if (selected == "price") {
    sortedData.sort(function (a, b) {
      if (a.price < b.price) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (selected == "category") {
    sortedData.sort(function (a, b) {
      if (a.category.toLowerCase() < b.category.toLowerCase()) return -1;
      if (b.category.toLowerCase() > b.category.toLowerCase()) return 1;
      else return 0;
    });
  }
  let data = "";
  data = reCall(data, sortedData, notToChange);
  document.getElementById("cards").innerHTML = data;
}

function pageCall(e) {
  if (e == 1) start = 1;
  else if (e == 2) start = 5;
  else if (e == 3) start = 9;
  else if (e == 4) start = 13;
  else if (e == 5) start = 17;

  let container = document.getElementById("cards");
  let cards = container.getElementsByClassName("card");
  for (var i = 0; i < 20; i++) {
    cards[i].style.display = "none";
  }

  for (var i = start - 1; i < e * 4; i++) {
    cards[i].style.display = "";
  }
  let listcontainer = document.getElementById("page");
  let list = listcontainer.getElementsByClassName("page-item");
  console.log(list);
  for (var i = 0; i < list.length; i++) {
    list[i].style.color = "";
    list[i].classList.remove("active");
  }
  list[e - 1].style.color = "blue";
  list[e - 1].classList.add("active");
}
// $(document).ready(function () {
//   let name = localStorage.getItem("UserName");
//   logoutHelper(name);
// });

// function logoutHelper(name) {
//   if (name == null) {
//     document.getElementById("userIn").innerHTML = "Welcome " + "ghost";
//   } else {
//     document.getElementById("userIn").innerHTML = "Welcome " + name;
//   }
// }

function logout() {
  localStorage.removeItem("UserName");
}

function myFunction() {
  $("#myDropdown").toggleClass("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

let Username = localStorage.getItem("UserName");

if (Username == null) {
  let ui = `<a href="signup.html">Signup</a>
    <a href="login1.html">Sign In</a>`;
  document.getElementById("myDropdown").innerHTML = ui;
  console.log({ document: document.querySelectorAll(".dropdown1") });
} else if (Username) {
  let ui = `<a href="#" onclick="logout()">Log Out</a>`;
  document.getElementById("myDropdown").innerHTML = ui;
  console.log({ document: document.querySelectorAll(".dropdown1") });
  let dropdown = document.getElementById("myDropdown");
  dropdown.style.bottom = "90%";
}

// document.getElementById("page")
// .addEventListener("click", function() {
//   if (this.classList.contains("active")) {
//     this.classList.remove("active");
//   } else this.classList.add("active");
// });
// function changeClass(e) {
//   console.log(e)
//   let container = document.getElementById("page");
//   let list = container.getElementsByClassName("current-page");
//   console.log(list);
//   for (var i = 0; i < list.length; i++) {
//     list[i].style.color = "white";
//   }
//   list[e].style.color=""
// }
