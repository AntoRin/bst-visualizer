const form = document.getElementById("simulationForm");
const start = document.getElementById("simulate");
const stop = document.getElementById("stop");

form.onsubmit = async event => {
  event.preventDefault();
  let input = document.getElementById("bstValues").value;
  let values = input.split(" ");
  let nodes = values.map(value => parseInt(value));

  // if (stop) beginSimulation(nodes);
  start.disabled = true;
  beginSimulation(nodes);
};

stop.onclick = async event => {
  let stop = await stopSimulation();
  start.disabled = false;
  console.log(stop);
};
