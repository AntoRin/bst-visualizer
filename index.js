const btn = document.getElementById("simulate");

btn.onclick = event => {
  event.preventDefault();
  let input = document.getElementById("bstValues").value;
  let values = input.split(" ");
  let nodes = values.map(value => parseInt(value));
  beginSimulation(nodes);
};
