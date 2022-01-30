let data;

const uiUserInput = document.getElementById("userInput");
const uiResults = document.getElementById("results");
const uiDeptView = document.getElementById("deptView");
const uiGal = uiDeptView.querySelector(".gallery");
const uiPrevDeptBtn = document.getElementById("previousDept");
const uiNextDeptBtn = document.getElementById("nextDept");
const uiGetRandomBtn = document.getElementById("getRandomDept");
const uiBackToIndexBtn = document.getElementById("backToIndex");

fetch("./data/departements.json")
  .then((response) => response.json())
  .then((res) => {
    data = res;
    displayResults(getResults(""));
  });

function getResults(q) {
  q = q.toUpperCase();

  let results = [];

  data.forEach((item) => {
    if (
      item.numero.toString().toUpperCase().includes(q) ||
      item.departement.toUpperCase().includes(q) ||
      item.region.toUpperCase().includes(q) ||
      item.chef_lieu.toUpperCase().includes(q)
    ) {
      results.push(item);
    }
  });

  return results;
}

function displayResults(results) {
  uiResults.innerHTML = "";

  results.forEach((res) => {
    const li = document.createElement("LI");
    li.dataset.index = data.indexOf(res);
    li.tabIndex = 0;
    li.innerHTML = `
      <span class="result_numero">${res.numero}</span>
      <span class="result_departement">${res.departement}</span>
      <span class="result_region">${res.region}</span>
    `;

    uiResults.appendChild(li);

    uiDeptView.classList.add("hidden");
    uiResults.classList.remove("dnone");
    setTimeout(() => {
      uiDeptView.classList.add("dnone");
      uiResults.classList.remove("hidden");
    }, 500);
  });
}

function displayDept(dept, index) {
  uiDeptView.dataset.index = index;

  uiDeptView.classList.add("hidden");

  uiDeptView.querySelector(".departement").innerText = dept.departement;
  uiDeptView.querySelector(".numero").innerText = dept.numero;
  uiDeptView.querySelector(".region").innerText = dept.region;

  uiGal.classList.add("invisible");
  const uiVilles = uiDeptView.querySelector(".villes");
  uiVilles.innerHTML = "";
  uiGal.innerHTML = `<div class="map"><img src="./data/maps/${dept.numero}.svg" alt="Le département situé sur une carte" /></div>`;

  const chef = document.createElement("P");
  chef.classList.add("ville", "chef_lieu");
  chef.innerText = dept.chef_lieu;
  uiVilles.appendChild(chef);

  dept.villes.forEach((ville) => {
    const el = document.createElement("P");
    el.classList.add("ville");
    el.innerText = ville;
    uiVilles.appendChild(el);
  });

  dept.images.forEach((img) => {
    const fig = document.createElement("figure");
    fig.classList.add("invisible");
    fig.innerHTML = `
        <img src="./data/gallery/${dept.numero}-${img.number}.JPG" alt="${img.caption}" />
        <figcaption>${img.caption}</figcaption>
      `;
    uiDeptView.querySelector(".gallery").appendChild(fig);
    setTimeout(() => {
      fig.classList.remove("invisible");
    }, 1200 + img.number * 200);
  });

  setTimeout(() => {
    uiGal.classList.remove("invisible");
  }, 1200);

  uiResults.classList.add("hidden");
  uiDeptView.classList.remove("dnone");
  setTimeout(() => {
    uiResults.classList.add("dnone");
    uiDeptView.classList.remove("hidden");
  }, 500);

  backToTop.click();
}

uiUserInput.addEventListener("keyup", (e) => {
  displayResults(getResults(e.target.value));
});

uiResults.addEventListener("click", (e) => {
  if (e.target.closest("li")) {
    const query = e.target.closest("li").dataset.index;

    displayDept(data[query], query);
  }
});

uiPrevDeptBtn.addEventListener("click", (e) => {
  const newIndex = uiDeptView.dataset.index - 1;

  if (newIndex < 0) return;

  displayDept(data[newIndex], newIndex);
});

uiNextDeptBtn.addEventListener("click", (e) => {
  const newIndex = Number(uiDeptView.dataset.index) + 1;

  if (newIndex === data.length) return;

  displayDept(data[newIndex], newIndex);
});

// Get Random
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

uiGetRandomBtn.addEventListener("click", (e) => {
  const r = getRandom(0, data.length - 1);

  displayDept(data[r], r);
});

uiBackToIndexBtn.addEventListener('click', e => {
    displayResults(getResults(""));
})
