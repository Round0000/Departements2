let data;

fetch("data/departements.json")
  .then((response) => response.json())
  .then((res) => {
    data = res;
  });

function displayDept(num) {
  return data.find(dept => dept.numero == num);
}

console.log(displayDept(12));
