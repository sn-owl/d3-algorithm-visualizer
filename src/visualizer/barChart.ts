import * as d3 from 'd3';

const width = 928, height = 500;
const marginTop = 30, marginRight = 0, marginBottom = 30, marginLeft = 40;

let svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
let g: d3.Selection<SVGGElement, unknown, null, undefined>;

export function initChart(container: HTMLElement) {
    container.innerHTML = '';
    svg = d3.select(container).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto;");

    g = svg.append("g");
}

export function drawBars(data: number[], comparing?: [number, number]) {
    const x = d3.scaleBand()
        .domain(data.map((_, i) => String(i)))
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data)!])
        .range([height - marginBottom, marginTop]);

    g.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (_, i) => x(String(i))!)
        .attr("y", (d) => y(d))
        .attr("height", (d) => y(0) - y(d))
        .attr("width", x.bandwidth())
        .attr("fill", (_, i) => comparing && (i === comparing[0] || i === comparing[1]) ? "orange" : "steelblue");

    g.selectAll("text")
        .data(data)
        .join("text")
        .attr("x", (_, i) => x(String(i))! + x.bandwidth() / 2)
        .attr("y", height - marginBottom - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "42px")
        .style("fill", "white")
        .text((d) => d);
}