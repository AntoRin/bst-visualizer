const form = document.getElementById("simulationForm");
const start = document.getElementById("simulate");
const stop = document.getElementById("stop");
const transition = document.querySelector(".transition");

form.onsubmit = async event => {
   event.preventDefault();
   let input = document.getElementById("bstValues").value.trim();
   let values = input.split(" ");
   let nodes = values.map(value => parseInt(value));
   start.disabled = true;
   start.style.background = "darkgray";
   stop.disabled = false;
   beginSimulation(nodes);
};

stop.onclick = async () => {
   transition.style.display = "block";
   try {
      await stopSimulation();
      endSimulation();
   } catch (error) {
      console.log(error);
   }
   transition.style.display = "none";
};

function endSimulation() {
   start.disabled = false;
   start.style.background = "blue";
   stop.disabled = true;
}

//Help Modal
const helpIcon = document.getElementById("helpIcon");
const modal = document.querySelector(".help-modal");
const closeIcon = document.getElementById("modalClose");

helpIcon.onclick = () => {
   modal.style.display = "block";
};

closeIcon.onclick = () => {
   modal.style.display = "none";
};
