import { bubbleSort } from "./algorithms/bubbleSort";
import { drawBars } from "./visualizer/barChart";
import { Player } from "./state/player";
var data = [7, 4, 8, 1, 5];
var steps = bubbleSort(data);
const player = new Player();
player.load(steps);
player.onStepChange = (step) => {
    const s = step;
    drawBars(s.data, s.comparing);
    stepsInfo.textContent = "Steps: " + (player.index + 1) + "/" + player.steps.length;
};
player.setIndex(0);
const stepsInfo = document.createElement("div");
const inputElem = document.createElement("input");
inputElem.setAttribute("type", "number");
document.body.appendChild(inputElem);
inputElem.addEventListener("change", () => {
    const value = parseInt(inputElem.value);
    data = Array.from({ length: value }, () => Math.floor(Math.random() * 100));
    steps = bubbleSort(data);
    player.load(steps);
    player.setIndex(0);
});
document.body.appendChild(document.createElement("button")).textContent = "reroll";
document.body.lastChild.addEventListener("click", () => {
    const value = parseInt(inputElem.value) || data.length;
    data = Array.from({ length: value }, () => Math.floor(Math.random() * 100));
    steps = bubbleSort(data);
    player.load(steps);
    player.setIndex(0);
});
document.body.appendChild(document.createElement("button")).textContent = "reset";
document.body.lastChild.addEventListener("click", () => player.setIndex(0));
document.body.appendChild(document.createElement("button")).textContent = "play";
document.body.lastChild.addEventListener("click", () => player.play());
document.body.appendChild(document.createElement("button")).textContent = "stop";
document.body.lastChild.addEventListener("click", () => player.stop());
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("button")).textContent = "<";
document.body.lastChild.addEventListener("click", () => player.back());
document.body.appendChild(document.createElement("button")).textContent = ">";
document.body.lastChild.addEventListener("click", () => player.next());
document.body.appendChild(stepsInfo);
//# sourceMappingURL=main.js.map