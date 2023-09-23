import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  public dataSource : any ={
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#CC0000',
                '#45818e',
                '#c90076',
                '#783f04',
                '#f6b26b'
            ],
        }
    ],
    labels: []
};

  constructor(private http: HttpClient){  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for(var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
    }
    this.createChart();
    });
  }

  createChart() {
    // var ctx = document.getElementById("myChart").getContext("2d");
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });

    // console.log("D3JS file linked properly");
    // var budgetData = [];

    //     function getBudgetAgain() {
    //         axios.get('http://localhost:3000/budget')
    //             .then(function (res) {
    //                 budgetData = res.data.myBudget;
    //                 console.log(budgetData);
    //             })
    //             .then(function () {
    //                 createD3Chart();
    //             });
    //     }
    //     window.addEventListener("DOMContentLoaded", function () {
    //         getBudgetAgain();
    //     });

    //     function createD3Chart() {
    //         console.log("D3JS chart created");

    //         var svg = d3.select("#d3DonutChart")
    //             .append("svg")
    //             .append("g");

    //         svg.append("g")
    //             .attr("class", "slices");
    //         svg.append("g")
    //             .attr("class", "labels");
    //         svg.append("g")
    //             .attr("class", "lines");

    //         var chartContainer = document.getElementById("d3DonutChart");
    //         var containerWidth = chartContainer.clientWidth;
    //         var containerHeight = chartContainer.clientHeight;

    //         var width = containerWidth,
    //             height = containerHeight,
    //             radius = (Math.min(width, height) / 2) - 65;

    //         console.log("Data before pie function" + budgetData);

    //         var pie = d3.layout.pie()
    //             .sort(null)
    //             .value(function (d) {
    //                 return d.budget;
    //             });

    //         var arc = d3.svg.arc()
    //             .outerRadius(radius * 1.2)
    //             .innerRadius(radius * 0.6);

    //         var outerArc = d3.svg.arc()
    //             .innerRadius(radius * 1.3)
    //             .outerRadius(radius * 0.9);

    //         svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    //         var key = function (d) { return d.data.title; };


    //         var color = d3.scale.category20();

    //         change(budgetData);

    //         function change(data) {
    //             console.log("Data after pie function" + data);
    //             var slice = svg.select(".slices").selectAll("path.slice")
    //                 .data(pie(data), key);

    //             slice.enter()
    //                 .insert("path")
    //                 .style("fill", function (d) { return color(d.data.title); })
    //                 .attr("class", "slice");

    //             slice
    //                 .transition().duration(1000)
    //                 .attrTween("d", function (d) {
    //                     this._current = this._current || d;
    //                     var interpolate = d3.interpolate(this._current, d);
    //                     this._current = interpolate(0);
    //                     return function (t) {
    //                         return arc(interpolate(t));
    //                 };
    //             });

    //             slice.exit()
    //                 .remove();

    //             var text = svg.select(".labels").selectAll("text")
    //                 .data(pie(data), key);

    //             text.enter()
    //                 .append("text")
    //                 .attr("dy", ".35em")
    //                 .text(function (d) {
    //                     return d.data.title;
    //                 });

    //             function midAngle(d) {
    //                 return d.startAngle + (d.endAngle - d.startAngle) / 2;
    //             }

    //             text.transition().duration(1000)
    //                 .attrTween("transform", function (d) {
    //                     this._current = this._current || d;
    //                     var interpolate = d3.interpolate(this._current, d);
    //                     this._current = interpolate(0);
    //                     return function (t) {
    //                         var d2 = interpolate(t);
    //                         var pos = outerArc.centroid(d2);
    //                         pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
    //                         return "translate(" + pos + ")";
    //                     };
    //                 })
    //                 .styleTween("text-anchor", function (d) {
    //                     this._current = this._current || d;
    //                     var interpolate = d3.interpolate(this._current, d);
    //                     this._current = interpolate(0);
    //                     return function (t) {
    //                         var d2 = interpolate(t);
    //                         return midAngle(d2) < Math.PI ? "start" : "end";
    //                     };
    //                 });

    //             text.exit()
    //                 .remove();

    //             var polyline = svg.select(".lines").selectAll("polyline")
    //             .data(pie(data), key);

    //             polyline.enter()
    //                 .append("polyline");

    //             polyline.transition().duration(1000)
    //                 .attrTween("points", function (d) {
    //                     this._current = this._current || d;
    //                     var interpolate = d3.interpolate(this._current, d);
    //                     this._current = interpolate(0);
    //                     return function (t) {
    //                         var d2 = interpolate(t);
    //                         var pos = outerArc.centroid(d2);
    //                         pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
    //                         return [arc.centroid(d2), outerArc.centroid(d2), pos];
    //                     };
    //                 });

    //             polyline.exit()
    //                 .remove();
    //         }
    //     }
  }
}

