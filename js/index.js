var siteName = document.getElementById("SiteName");
var siteUrl = document.getElementById("SiteURL");
var siteList = [];
var addButton = document.getElementById("addButton");
var updateButton = document.getElementById("updateButton");
var currentIndex;

if (localStorage.getItem("siteList") != null) {
  siteList = JSON.parse(localStorage.getItem("siteList"));
  displaySite(siteList);
}

function addSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };
  siteList.push(site);
  updateLocalStorage();
  displaySite(siteList);
  clearForm();
}

function displaySite(list) {
  var data = ``;
  for (var i = 0; i < list.length; i++) {
    data += `  <div class="bg-light row text-center py-2 mb-3 rounded-4">
            <p class="col-2 m-0">${i + 1}</p>
            <p class="col-7 m-0">${list[i].name}</p>
            <div
              class="col-3 m-0 d-flex justify-content-center align-items-center gap-2"
            >
              <a
                class="text-decoration-none text-black"
                target="_blank"
                href="${list[i].url}"
              >
                <span class="bg-success rounded-circle">
                  <i class="fa-regular fa-eye"></i
                ></span>
              </a>
              <span onclick="getSiteToUpdate(${i})" class="bg-warning rounded-circle">
                <i class="fa-regular fa-pen-to-square"></i>
              </span>
              <span onclick="deleteSite(${i})" class="bg-danger rounded-circle">
                <i class="fa-regular fa-trash-can"></i
              ></span>
            </div>
          </div>
    `;
  }
  document.getElementById("sitesData").innerHTML = data;
}

function clearForm() {
  siteName.value = null;
  siteUrl.value = null;
}
function deleteSite(index) {
  siteList.splice(index, 1);
  updateLocalStorage();
  displaySite(siteList);
}

function getSiteToUpdate(index) {
  siteName.value = siteList[index].name;
  siteUrl.value = siteList[index].url;
  addButton.classList.add("d-none");
  updateButton.classList.remove("d-none");
  currentIndex = index;
}

function updateSite() {
  siteList[currentIndex].name = siteName.value;
  siteList[currentIndex].url = siteUrl.value;
  displaySite(siteList);
  updateLocalStorage();
  addButton.classList.remove("d-none");
  updateButton.classList.add("d-none");
  clearForm();
}

function updateLocalStorage() {
  localStorage.setItem("siteList", JSON.stringify(siteList));
}

function search(searchValue) {
  var searchItem = [];
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      searchItem.push(siteList[i]);
    }
    displaySite(searchItem);
  }
}
