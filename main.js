var width =800;
var height = 600;
var usingX;
var usingY;
var featureLinOrd = {};
var xScale = d3.scaleLinear();
var yScale = d3.scaleLinear();

var xAxisSelector;
var yAxisSelector;

featureLinOrd["num_critic_for_reviews"] = "Linear"
featureLinOrd["gross"] = "Linear"
featureLinOrd["imdb_score"] = "Linear"
featureLinOrd["title_year"] = "Ordinal"
featureLinOrd["num_voted_users"] = "Linear"
featureLinOrd["num_user_for_reviews"] = "Linear"
featureLinOrd["budget"] = "Linear"
featureLinOrd["content_rating"] = "Ordinal"
featureLinOrd["genres"] = "Ordinal"


//create SVGS for graph
d3.csv("movies.csv", function(csv) {

    var svgGraph = d3.select("#mainScatter")
        .append("svg:svg")
        .attr("width",width)
        .attr("height",height)

    csvData = [...csv].map(function(d,i) {
        d["id"]=i;
        d['color']=d['color'];
        d['director_name']=d['director_name'];
        d['num_critic_for_reviews']=+d['num_critic_for_reviews'];
        d['duration']=+d['duration'];
        d['director_facebook_likes']=+d['director_facebook_likes'];
        d['actor_1_facebook_likes']=+d['actor_1_facebook_likes'];
        d['actor_2_facebook_likes']=+d['actor_2_facebook_likes'];
        d['actor_3_facebook_likes']=+d['actor_3_facebook_likes'];
        d['actor_1_name']=d['actor_1_name'];
        d['actor_2_name']=d['actor_2_name'];
        d['actor_3_name']=d['actor_3_name'];
        d['gross']=+d['gross'];
        d['genres']=d['genres'];
        d['movie_title']=d['movie_title'];
        d['num_voted_users']=+d['num_voted_users'];
        d['cast_total_facebook_likes']=+d['cast_total_facebook_likes'];
        d['facenumber_in_poster']=+d['facenumber_in_poster'];
        d['plot_keywords']=d['plot_keywords'];
        // d['movie_imdb_link']=d['facenumber_in_poster'];
        d['num_user_for_reviews']=+d['num_user_for_reviews'];
        d['language']=d['language'];
        d['country']=d['country'];
        d['content_rating']=d['content_rating'];
        d['budget']=+d['budget'];
        d['title_year']=d['title_year'];
        d['imbd_score']=+d['imbd_score'];
        d['aspect_ratio']=+d['aspect_ratio'];
        d['movie_facebook_likes']=+d['movie_facebook_likes'];
        return d;
    })
    console.log(csvData);



    
        // .attr("transform","translate("+200+","+20+")")

    var xExtent = d3.extent(csv, function(row) { return row.title_year; });
    var yExtent = d3.extent(csv, function(row) { return row.gross; });
    console.log(xExtent);
    // var actExtent = d3.extent(csv,  function(row) { return row.ACT;  });
    // var gpaExtent = d3.extent(csv,  function(row) {return row.GPA;   });


    // var satExtents = {
	// "SATM": satmExtent,
	// "SATV": satvExtent
    // };


    // Axis setup
    // var xScale = d3.scaleLinear().domain(satmExtent).range([50, 470]);
    // var yScale = d3.scaleLinear().domain(satvExtent).range([470, 30]);
    // var xScale = d3.scaleLinear().domain([2010,2016]).range([0, width]);
    // var xScale = d3.scaleBand().rangeRound([0,width]);
    xScale = d3.scaleLinear().domain([2010,2016]).range([0,600]); //domain([2010,2016])
    xScale = d3.scaleOrdinal()
        .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016"])
        .range([10, 110, 210, 310, 410, 510, 610]);
    // d3.scaleOrdinal().domain([2010,2016]).
    //.tickFormat(d3.timeFormat("%Y"))
    var yScale = d3.scaleLinear().domain(yExtent).range([height-30,30]);
    console.log(xScale);
    //ordinal scales
    //var xScale = d3.scal.ordinal().domain(...).rangeRoundBands(...);

    var xAxis = d3.axisBottom().scale(xScale).ticks(7);
    var yAxis = d3.axisLeft().scale(yScale);

    // var axisXGroup = svgGraph.append("g")
    //     .attr("class","x axis")
    //     .attr("transform","translate(0,"+ height+")")
    //     .call(xAxis);
    //
    //     var axisYGroup = svgGraph.append("g")
    //         .attr("class","y axis")
    //         .call(yAxis);

    // function redraw(){
    //     //redefine y scale,axis, redraw axis
    //     //var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
    //     if(usingX === "") {
    //         var newXAxisScale = d3.scaleLinear()
    //             .domain([d3.extent(csvData,function(row){return row.})])
    //             .range([])
    //     } else if(usingX==="") {
    //         var newXAxisScale = d3.scaleLinear()
    //             .domain([])
    //             .range([])
    //     }
    //
    //     xAxis.scale(newXAxisScale);
    //     d3.select(".x")
    //         .transition()
    //         .duration(1000)
    //         .call(xAxis);
    //
    //     //do the selectAll thing
    //     //.transition().duration(1000)
    // }
    //Create SVGs for charts

    // var chart1 = d3.select("#mainScatter")
	//                 .append("svg:svg")
	//                 .attr("width",width)
	//                 .attr("height",height)
    //                 .on("mouseenter", function(d){
    //                     console.log("in");
    //                     currentVis="chart1";
    //                 })

    // var brushContainer1 = chart1.append('g')
    //                 .attr('id','brush-container');

    // var chart2 = d3.select("#chart2")
	//                 .append("svg:svg")
	//                 .attr("width",width)
	//                 .attr("height",height)
    //                 .on("mouseenter", function(d){
    //                     // console.log(currentVis);
    //                     currentVis="chart2";
    //                 });
    //
    // var brushContainer2 = chart2.append('g')
    //                 .attr('id','brush-container');

	 /******************************************

		ADD BRUSHING CODE HERE

	 ******************************************/

	 //add scatterplot points

     console.log(csvData[0].title_year);
     var temp1= svgGraph.selectAll("circle")
	   .data(csvData)
	   .enter()
	   .append("circle")
       .classed("sat",true)
	   // .attr("id",function(d) {return 'sat'+d.id;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale(d.title_year); })
	   .attr("cy", function(d) { return yScale(d.gross); })
	   .attr("r", 5)
       .attr("transform", "translate(100,0)")
	   .on("click", function(d){
            d3.select("#detailsOnDemand").select("#mvt")
            .text(d.movie_title);
            d3.select("#detailsOnDemand").select("#dn")
            .text(d.director_name);
            d3.select("#detailsOnDemand").select("#dur")
            .text(d.duration);
            d3.select("#detailsOnDemand").select("#genr")
            .text(d.genres);
            d3.select("#detailsOnDemand").select("#imsc")
            .text(d.imbd_score);
            d3.select("#detailsOnDemand").select("#imlk")
            .text(d.movie_imdb_link);
            d3.select("#detailsOnDemand").select("#ctrng")
            .text(d.content_rating);
            d3.select("#detailsOnDemand").select("#yr")
            .text(d.title_year);
            d3.select("#detailsOnDemand").select("#plkw")
            .text(d.plot_keywords);
            d3.select("#detailsOnDemand").select("#lang")
            .text(d.language);
            d3.select("#detailsOnDemand").select("#asrt")
            .text(d.aspect_ratio);
            d3.select("#detailsOnDemand").select("#mfbl")
            .text(d.movie_facebook_likes);
            d3.select("#detailsOnDemand").select("#col")
            .text(d.color);
            d3.select("#detailsOnDemand").select("#country")
            .text(d.country);

            var clickedid= d3.select(this).attr("id");

            //mainScatter.selectAll('circle').classed("clicked", false);
            svgGraph.selectAll('circle').filter(function(e) {
                return e.id==d.id;
            })
            .classed("clicked",true);

            svgGraph.selectAll('circle').filter(function(e) {
                return e.id!=d.id;
            })
            .classed("clicked",false);
        });

       d3.select("#xAxisFilter").on("change", function (d) {
        xAxisSelector = d3.select("#xAxisFilter").node().value;
        console.log(xAxisSelector);
        if (featureLinOrd[xAxisSelector] == "Linear") {
            //console.log(xScale);
            var tempExtent = d3.extent(csvData, function(d) {return d.xAxisSelector})
            console.log(tempExtent)
            xScale.domain(tempExtent);
        } else if (xAxisSelector == "title_year") {
            xScale = d3.scaleOrdinal()
            .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016"])
            .range([10, 110, 210, 310, 410, 510, 610]);
        } else if (xAxisSelector == "content_rating") {
            xScale = d3.scaleOrdinal()
            .domain(["G", "NC-17", "Not Rated", "PG", "PG-13", "R", "TV-14", "TV-G", "TV-MA", "TV-PG", "TV-Y", "TV-Y7", "Unrated"])
            .range([10, 60, 110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610]);
        }

        svgGraph.selectAll("circle")
            .attr('cx', function(d) { return xScale(d.xAxisSelector)});
    });

    d3.select("#yAxisFilter").on("change", function (d) {
        yAxisSelector = d3.select("yAxisFilter").node().value;
        if (featureLinOrd[yAxisSelector] == "Linear") {
            var tempExtent = d3.extent(csvData, function(d) {return d.yAxisSelector})
            console.log(tempExtent)
            yScale.domain(tempExtent);
        } else if (yAxisSelector == "title_year") {
            yScale = d3.scaleOrdinal()
            .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016"])
            .range([10, 110, 210, 310, 410, 510, 610]);
        } else if (yAxisSelector == "content_rating") {
            xScale = d3.scaleOrdinal()
            .domain(["G", "NC-17", "Not Rated", "PG", "PG-13", "R", "TV-14", "TV-G", "TV-MA", "TV-PG", "TV-Y", "TV-Y7", "Unrated"])
            .range([10, 60, 110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610]);
        }
        yScale.extent(data, function (d) {return d.yAxisSelector})
        svgGraph.selectAll("circle")
            .attr('cy',  function(d) { return yScale(d.yAxisSelector)});
    });

       //     d3.select("#satm")
       //     .text(d.SATM);
       //     d3.select("#satv")
       //     .text(d.SATV);
       //     d3.select("#act")
       //     .text(d.ACT);
       //     d3.select("#gpa")
       //     .text(d.GPA);
       //     d3.selectAll('.act')
       //     .classed('selected',false);
       //     d3.select("#act"+d.id)
       //     .classed('selected',true);
       // })
    //
    // var temp2= chart2.selectAll("circle")
	//    .data(csvData)
	//    .enter()
	//    .append("circle")
    //    .classed("act",true)
	//    .attr("id",function(d) {return 'act'+d.id;} )
	//    .attr("stroke", "black")
	//    .attr("cx", function(d) { return xScale2(d.ACT); })
	//    .attr("cy", function(d) { return yScale2(d.GPA); })
	//    .attr("r", 5)
	//    .on("click", function(d){
    //        d3.select("#satm")
    //        .text(d.SATM);
    //        d3.select("#satv")
    //        .text(d.SATV);
    //        d3.select("#act")
    //        .text(d.ACT);
    //        d3.select("#gpa")
    //        .text(d.GPA);
    //        d3.selectAll('.sat')
    //        .classed('selected',false);
    //        d3.select("#sat"+d.id)
    //        .classed('selected',true);
    //    });
    //
    //
    //
    svgGraph // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(100,"+ (600 -30)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr("class", "label")
		.attr("x", 700)
		.attr("y", -6)
		.style("text-anchor", "end")
        .style("fill","black")
		.text("XAXIS");
    //
    svgGraph // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(80, 0)")
		.call(yAxis)
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
        .style("fill","black")
		.text("YAXIS");
    //
    // chart2 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(0,"+ (width -30)+ ")")
	// 	.call(xAxis2)
	// 	.append("text")
	// 	.attr("class", "label")
	// 	.attr("x", width-16)
	// 	.attr("y", -6)
	// 	.style("text-anchor", "end")
    //     .style("fill","black")
	// 	.text("ACT");
    //
    // chart2 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(50, 0)")
	// 	.call(yAxis2)
	// 	.append("text")
	// 	.attr("class", "label")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", ".71em")
	// 	.style("text-anchor", "end")
    //     .style("fill","black")
	// 	.text("GPA");
    //
    // //BRUSHING AND LINKING
    // var brush = d3.brush().extent([[-10,10],[width+10,height+10]]);
    //
    // //handler functions
    // brush.on('start', handleBrushStart)
    //         .on('brush', handleBrushMove)
    //         // .on('end', handleBrushEnd);
    //
    // brushContainer2.call(brush);
    // brushContainer1.call(brush);
    //
    // function handleBrushStart(){
    //     //clear existing brush in other chart(you want dots to appear in other chart that the one you're currently in)
    //     if(currentVis=="chart1"){
    //         //clear highlighted orange dots
    //         d3.selectAll('.sat').classed('selected2',false);
    //         //clear brush in other chart
    //         brushContainer2.call(brush.move,null);
    //     } else if(currentVis=="chart2"){
    //         //clear highlighted orange dots
    //         d3.selectAll('.act').classed('selected2',false);
    //         //clear brush in other chart
    //         brushContainer1.call(brush.move,null);
    //     }
    //
    // }
    // function handleBrushMove(){
    //     var selection = d3.event.selection;
    //     if(!selection){
    //         return;
    //     }
    //
    //     var [[left,top],[right,bottom]]=selection;
    //     console.log(selection);
    //     //check other vis
    //     if(currentVis=="chart2") {
    //         d3.selectAll('.sat')
    //         .classed("selected2", function(d){
    //             //if in the box of the other vis
    //             var cx=xScale2(d['ACT']);
    //             var cy=yScale2(d['GPA']);
    //             if(left<=cx && cx<=right && top<=cy && cy<=bottom){
    //                 return true;
    //             }
    //         });
    //     } else if(currentVis=="chart1") {
    //         d3.selectAll('.act')
    //         .classed('selected2', function(d){
    //             var cx=xScale(d['SATM']);
    //             var cy=yScale(d['SATV']);
    //             return left<=cx && cx<=right && top<=cy && cy<=bottom;
    //         })
    //     }
    // }

    // function handleBrushEnd() {
    //
    // }

    //Word Cloud

    //setup wordcloud layout
    // var layout = d3.layout.cloud()
    //                         .timeInterval(10)
    //                         .size([600,600])
    //                         .words(data)
    //                         .rotate(function(d){return 0;})
    //                         .font('monospace')
    //                         .fontSize(function(d,i){return fontSize(Math.random();)})
    //                         .text(function(d) {return d.password;})
    //                         .spiral("archimedean")
    //                         .on("end",draw)
    //                         .start();
    // var svgWord = d3.select("#wordCloud")
    //     .append("svg:svg")
    //     .attr("width",600)
    //     .attr("height",600)
    //     .append("g")

});
//calendar
function drawMovies(csvData){
    console.log(csvData);
    console.log("movie");
    //category corresponds to the grouping
    // var category = function(aGroup){
    //
    // }
    var cellMargin = 2;
    var cellSize = 20;
    // var catArray =
    var genreAll = [];
    csvData.forEach(function(d){
        var gen = d.genres.split("|");
        gen.forEach(function(g) {
            if(!genreAll.includes(g)) {
                genreAll.push(g);
            }
        })
    })
    // var genreAll = csvData.map(function(p){
    //     // console.log(p.plot_keywords.split("|"));
    //     return p.genres;
    // });
    console.log(genreAll);
    // function catName(){
    //
    //     // var genreAll = csvData.map(function(p){
    //     //     // console.log(p.plot_keywords.split("|"));
    //     //     return p.genre;
    //     // });
    //
    // }
    var years = [2010,2011,2012,2013,2014,2015,2016];
    var movieCalSvg = d3.select("#calendar").selectAll("svg")
        .data(genreAll)
        .enter().append("svg")
        .attr("class", "year")
        .attr("height", ((cellSize*7) + cellMargin*8 + 20))
        .attr("width", function(d){
            var columns = 4;
            return((cellSize*columns) + (cellMargin*(columns+1)));
        })
        .append("g")

    movieCalSvg.append("text")
        .attr("class","catName")
        .attr("y", (cellSize*7)+(cellMargin*8)+15)
        .attr("x", function(d){
            var columns = 4;
            return(((cellSize*columns) + (cellMargin*(columns+1)))/2);
        })
        .attr("text-anchor","middle")
        .text(function(d){return d;})

    var info = d3.select("#calendar").append("div")
                .attr("class","tooltip")
                .style("opacity",0);

    console.log(csvData.movie_title);
    var rect = movieCalSvg.selectAll("rect.movie")
        .data(csvData)
        .enter().append("rect")
        .attr("class","movie")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("rx",3).attr("ry",3)
        .attr("fill","#eaeaea")
        .attr("y", function(d) { return (d.id * cellSize) + (d.id * cellMargin) + cellMargin; })
        .attr("x", function(d) { return (d.id * cellSize) + (d.id * cellMargin) + cellMargin ; })
        .on("mouseover", function(d) {
            info.transition()
                .duration(200)
                .style("opacity",.9)
            info.html(d.movie_title + "<br/>"  + "other info")
                .style("opacity",.9)
                .style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY-28)+"px");
        })
        .on("mouseout", function(d) {
            info.transition()
                .duration(500)
                .style("opacity", 0);
        })
        // .datum(format);

    //rect.append("title")
        // .text(function(d){return;})
    // rect.filter()

}
