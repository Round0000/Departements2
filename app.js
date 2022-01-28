let data;

const uiUserInput = document.getElementById("userInput");
const uiResults = document.getElementById("results");
const uiDeptView = document.getElementById("deptView");

fetch("./data/departements.json")
  .then((response) => response.json())
  .then((res) => {
    data = res;
  });

function getResults(q) {
  q = q.toUpperCase();

  let results = [];

  console.clear();

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
    li.innerHTML = `
      <span class="result_numero">${res.numero}</span>
      <span class="result_departement">${res.departement}</span>
      <span class="result_region">${res.region}</span>
    `;

    uiResults.appendChild(li);

    uiDeptView.classList.add("hidden");
    uiResults.classList.remove("hidden");
  });
}

function displayDept(dept) {
  uiDeptView.querySelector(".departement").innerText = dept.departement;
  uiDeptView.querySelector(".numero").innerText = dept.numero;
  uiDeptView.querySelector(".region").innerText = dept.region;

  const uiVilles = uiDeptView.querySelector(".villes");
  uiVilles.innerHTML = "";

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

  uiResults.classList.add("hidden");
  uiDeptView.classList.remove("hidden");
}

uiUserInput.addEventListener("keyup", (e) => {
  displayResults(getResults(e.target.value));
});

uiResults.addEventListener("click", (e) => {
  if (e.target.closest("li")) {
    const query = e.target.closest("li").dataset.index;

    displayDept(data[query]);
  }
});
