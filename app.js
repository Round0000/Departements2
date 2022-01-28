let data;

fetch("data/departements.json")
  .then((response) => response.json())
  .then((res) => {
    data = res;
  });

function displayDept(num) {
  return data.find((dept) => dept.numero == num);
}

userInput.addEventListener("change", (e) => {
  console.log(displayDept(e.target.value));
});
