const form = document.getElementById("simulationForm");

form.onsubmit = async event => {
  event.preventDefault();
  let input = document.getElementById("bstValues").value;
  let values = input.split(" ");
  let nodes = values.map(value => parseInt(value));
  let stop = await stopSimulation();
  if (stop) beginSimulation(nodes);
};
