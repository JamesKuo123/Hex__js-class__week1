// storage
var items = [];
// input
var itemTextbox = document.querySelector("#itemTextbox");
var addItem = document.querySelector("#addItem");
// list
var itemList = document.querySelector("#itemList");
// footer
var itemNum__number = document.querySelector("#itemNum__number");
var itemNum__plural = document.querySelector("#itemNum__plural");
var clearAll = document.querySelector("#clearAll");

function addNewItem(e) {
    if (e.target.id === "addItem" || e.keyCode == "13") {
        e.preventDefault();
        if (itemTextbox.value != "") {
            items.push({
                index: items.length + 1,
                completeOrNot: false,
                content: document.querySelector("#itemTextbox").value
            });
            renderItem();
            itemTextbox.value = "";
        }
    }
}
function toggleCheck(e) {
    if (e.target.classList.contains("body__list__item__label") || e.target.classList.contains("body__list__item__checkbox")) {
        if(e.target.dataset.checked == "false"){
            items[e.target.dataset.index - 1].completeOrNot = true;
        }else{
            items[e.target.dataset.index - 1].completeOrNot = false;
        }
        renderItem();
    }
}
function deleteItem(e){
    if (e.target.classList.contains("body__list__item__closeBtn")) {
        items.splice(items[e.target.dataset.index - 1],1);
        renderItem();
    }
}
function clearAllItem(e) {
    e.preventDefault();
    items = [];
    renderItem();
}
function renderItem() {
    var newItems = "";
    items.forEach(
        function (item, i) {
            newItems += `
            <li class="body__list__item">
                <input type="checkbox" class="body__list__item__checkbox" ${item.completeOrNot ? "checked" : ""} data-checked=${item.completeOrNot ? true : false} data-index="${i + 1}">
                <label class="body__list__item__label ${item.completeOrNot ? "checked" : ""}" data-checked=${item.completeOrNot ? true : false} data-index="${i + 1}">${item.content}</label>
                <a href="#" class="body__list__item__closeBtn material-icons" data-checked=${item.completeOrNot ? true : false} data-index="${i + 1}">close</a>
            </li>`;
        }
    );
    itemList.innerHTML = newItems;
    itemNum__number.innerHTML = items.length;
    itemNum__plural.innerHTML = items.length > 1 ? "s" : "";
}

// add
itemTextbox.addEventListener("keypress", addNewItem);
addItem.addEventListener("click", addNewItem);
// checked
itemList.addEventListener("click", toggleCheck);
// delete
itemList.addEventListener("click", deleteItem);
// delete all
clearAll.addEventListener("click", clearAllItem);

