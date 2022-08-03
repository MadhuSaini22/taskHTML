fetch("https://fakestoreapi.com/products")
  .then((data) => {
    // console.log(data);
    return data.json();
  })
  .then((actualdata) => {
    let data = "";
    originalData = [...actualdata];
    notToChange = [...actualdata];
    // console.log(sortedData);
    data = reCall(data, sortedData, actualdata);
    document.getElementById("cards").innerHTML = data;
    // console.log(actualdata);
  })
  .catch((error) => {
    console.log(error);
  });
var notToChange;
var originalData;
var sortedData;
// console.log(notToChange);

function reCall(data, sortedData, actualdata) {
  let dataRender = sortedData == undefined ? actualdata : sortedData;
  dataRender.map((product) => {
    data += `<div class="card">
      <h3 class="title" id="title"> ${product.title}</h3>
      <img src=${product.image} alt="img">
      <p class="description">${product.description}</p>
      <p class="category">${product.category}</p>
      <p class="price">Rs.${product.price}</p>
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

    if (
      text.indexOf(filter) > -1 ||
      titleText.indexOf(filter) > -1 ||
      catText.indexOf(filter) > -1
    ) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

function Reset() {
  let data = "";
  sortedData = undefined;
  data = reCall(data, sortedData, notToChange);
  document.getElementById("cards").innerHTML = data;
  // let container = document.getElementById("cards");
  // let cards = container.getElementsByClassName("card");
  // for (var i = 0; i < cards.length; i++) {
  //   cards[i].style.display = "";
  // }
}

function myFunction() {
  var e = document.getElementById("filterdown");
  var text = e.options[e.selectedIndex].text.toLowerCase();
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

  var e = document.getElementById("sortdown");
  var value = e.value;
  var selected = value.toLowerCase();
  console.log(selected);
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
    console.log(sortedData);
  }

  let data = "";
  data = reCall(data, sortedData, originalData);
  document.getElementById("cards").innerHTML = data;
}

function getPageList(totalPages, page, maxLength) {
  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  }
  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

  if (totalPages <= maxLength) {
    return range(1, totalPages);
  }

  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  if (page >= maxLength - sideWidth - 1 - rightWidth) {
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }

  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
}


document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
});



$(function () {
      var numberOfItems = $(".cards .card").length;
      var limitPerPage = 3;
      var totalPages = Math.ceil(numberOfItems / limitPerPage);
      var paginationSize = 7;
      var currentPage;
    
      function showPage(whichPage) {
        if (whichPage < 1 || whichPage > totalPages) return false;
        currentPage = whichPage;
        $(".cards .card")
          .hide()
          .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
          .show();
    
        $(".pagination li").slice(1, -1).remove();
    
        getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
          $("<li>")
            .addClass("page-item")
            .addClass(item ? "cards" : "dots")
            .toggleClass("active", item === currentPage)
            .append(
              $("<a>")
                .addClass("page-link")
                .attr({ href: "javascript:void(0)" })
                .text(item || "...")
            )
            .insertBefore(".next-page");
        });
    
        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
      }
      $(".pagination").append(
        $("<li>")
          .addClass("page-item")
          .addClass("previous-page")
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({ href: "javascript:void(0)" })
              .text("Prev")
          ),
        $("<li>")
          .addClass("page-item")
          .addClass("next-page")
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({ href: "javascript:void(0)" })
              .text("Next")
          )
      );
    
      $(".cards").show();
      showPage(2);
    });  

