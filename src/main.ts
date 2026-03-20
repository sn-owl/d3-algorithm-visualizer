import { bubbleSort } from "./algorithms/bubbleSort";
import type { BubbleSortStep } from "./algorithms/bubbleSort";
import { initChart, drawBars } from "./visualizer/barChart";
import { Player } from "./state/player";

const app = document.getElementById("app")!;

function renderHome() {
    app.innerHTML = `<a href="#" id="bubble">Bubble Sort</a>`;
    document.getElementById("bubble")!.addEventListener("click", () => renderBubbleSort());
}

function renderBubbleSort() {
    app.innerHTML = `
        <button id="back">← back</button>
        <br>
        <div id="chart"></div>

        <input id="input" type="number" placeholder="개수">
        <button id="reroll">reroll</button>
        <button id="reset">reset</button>
        <br>
        
        <input id="speed" type="number" placeholder="속도 (ms) 기본값: 100ms">
        <button id="play">play</button>
        <button id="stop">stop</button>
        <button id="prev"><</button>
        <button id="next">></button>
        <div id="stepsInfo"></div>

    `;

    const container = document.getElementById("chart")!;
    const stepsInfo = document.getElementById("stepsInfo")!;
    initChart(container);

    let data: number[] = [7, 4, 8, 1, 5];
    let steps: BubbleSortStep[] = bubbleSort(data);
    const player = new Player<BubbleSortStep>();

    function load() {
        steps = bubbleSort(data);
        player.load(steps);
        player.onStepChange = (step) => {
            const s = step as BubbleSortStep;
            drawBars(s.data, s.comparing);
            stepsInfo.textContent = "Steps: " + (player.index + 1) + "/" + player.steps.length;
        };
        player.setIndex(0);
    }

    load();

    document.getElementById("back")!.addEventListener("click", () => { player.stop(); renderHome(); });
    document.getElementById("input")!.addEventListener("change", (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        data = Array.from({ length: value }, () => Math.floor(Math.random() * 100));
        load();
    });
    document.getElementById("reroll")!.addEventListener("click", () => {
        data = Array.from({ length: data.length }, () => Math.floor(Math.random() * 100));
        load();
    });    
    document.getElementById("speed")!.addEventListener("change", (e) => {
        const value = parseInt((e.target as HTMLInputElement).value);
        player.playSpeed = value;
    });
    document.getElementById("reset")!.addEventListener("click", () => player.setIndex(0));
    document.getElementById("play")!.addEventListener("click", () => player.play());
    document.getElementById("stop")!.addEventListener("click", () => player.stop());
    document.getElementById("prev")!.addEventListener("click", () => player.back());
    document.getElementById("next")!.addEventListener("click", () => player.next());
}

renderHome();