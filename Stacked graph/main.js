const width = 960,
      height = 500;

const m = 20,
      n = 200,
      k = 10;

const svg = d3.select("svg")
    .attr("width",width)
    .attr("height",height);

const x = d3.scaleLinear()
      .domain([0, m - 1])
      .range([0, width]);

const y = d3.scaleLinear()
      .range([height, 0]);

const z = d3.interpolateCool;

const area = d3.area()
      .x((d, i) => x(i))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

const path = svg.selectAll("path")
      .data(randomize)
      .enter()
      .append("path")
      .attr("d", area)
      .attr("fill", () => z(Math.random()));


function randomize() {
    const stack = d3.stack()
      .keys(d3.range(15))
      .offset(d3.stackOffsetWiggle)
      .order(d3.stackOrderNone);
   const layers = stack(d3.transpose(Array.from({length: n}, () => bumps(m, k))));
     y.domain([
         d3.min(layers, l => d3.min(l, d => d[0])),
         d3.max(layers, l => d3.max(l, d => d[1]))
        ]);
        return layers;
      }

function bumps(n,m) {
        var a = [],i;
        for(i = 0; i < n; ++i){
              a[i] = 0;
        }
        for(i = 0; i < m; ++i){
            bump(a,n);
        }
        return a ;
     }
     
function bump(a,n) {
        var x = 1 / (0.1 + Math.random()),
            y = 2 * Math.random() - 0.5,
            z = 10 / (0.1 + Math.random());
        for(var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
        }
     }

const interval = d3.interval(() => {
   path
     .data(randomize)
     .transition()
       .duration(1500)
       .attr("d", area);
 }, 2500);

window.onload = function load(){
   invalidation.then(() => interval.stop());
   return svg.node();
}



