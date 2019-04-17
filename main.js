var width =850;
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

var clickedMovie;
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
        d['imdb_score']=+d['imdb_score'];
        d['aspect_ratio']=+d['aspect_ratio'];
        d['movie_facebook_likes']=+d['movie_facebook_likes'];
        return d;
    });
    // plotData = [...csv].map(function(d,i){
    //     d["id"]=i;
    //
    //     return d.plot_keywords.split("|");
    // });
    //console.log(csvData);
    // console.log(plotData);


        // .attr("transform","translate("+200+","+20+")")

    var xExtent = d3.extent(csv, function(row) { return row.title_year; });
    var yExtent = d3.extent(csv, function(row) { return row.gross; });
    //console.log(xExtent);
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
    //console.log(xScale);

    var yAxis = d3.axisLeft().scale(yScale);
    var xAxis = d3.axisBottom().scale(xScale);
    //ordinal scales
    //var xScale = d3.scal.ordinal().domain(...).rangeRoundBands(...);

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

     //console.log(csvData[0].title_year);
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
            .text(d.imdb_score);
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
            d3.select("#detailsOnDemand").select("#budget")
            .text(d.budget);

            var clickedid= d3.select(this).attr("id");
            clickedMovie=d.id; //this is the movie to make wordcloud for
            wordCloudGen.update(newWords());
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
        //var xScale = d3.scaleLinear();
        if (featureLinOrd[xAxisSelector] == "Linear") {
            //console.log(xScale);
            if (xAxisSelector == "num_critic_for_reviews") {
                //console.log("here");
                xExtent = d3.extent(csvData, function(row) { return row.num_critic_for_reviews; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -10]);
            } else if (xAxisSelector == "gross"){  
                vxExtent = d3.extent(csv, function(row) { return row.gross; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -10]);
            } else if (xAxisSelector == "imdb_score"){  
                xExtent = d3.extent(csv, function(row) { return row.imdb_score; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,700]);
            } else if (xAxisSelector == "num_voted_users"){  
                xExtent = d3.extent(csv, function(row) { return row.num_voted_users; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -10]);
            } else if (xAxisSelector == "num_user_for_reviews"){  
                xExtent = d3.extent(csv, function(row) { return row.num_user_for_reviews; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -10]);
            } else if (xAxisSelector == "budget"){  
                xExtent = d3.extent(csv, function(row) { return row.budget; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,700]);
            }
        } else if (xAxisSelector == "title_year") {
            xScale = d3.scaleOrdinal()
            .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016"])
            .range([10, 110, 210, 310, 410, 510, 610]);
        } else if (xAxisSelector == "content_rating") {
            xScale = d3.scaleOrdinal()
            .domain(["G", "NC-17", "Not Rated", "PG", "PG-13", "R", "TV-14", "TV-G", "TV-MA", "TV-PG", "TV-Y", "TV-Y7", "Unrated"])
            .range([10, 60, 110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610]);
        }

        //console.log(xScale.domain);
        //console.log(xScale.range);
        //console.log(svgGraph.select(".xaxis"));
        svgGraph.selectAll(".xaxis")
            .call(d3.axisBottom(xScale));

        svgGraph.selectAll("circle")
            .attr('cx', function(d) { return xScale(d[xAxisSelector])});
        svgGraph
            .select(".xaxis")
            .selectAll(".tick")
            .selectAll("text")
            .attr("transform", "rotate(-45)")
    });

    d3.select("#yAxisFilter").on("change", function (d) {
        yAxisSelector = d3.select("#yAxisFilter").node().value;
        console.log(yAxisSelector);
        if (yAxisSelector == "num_critic_for_reviews") {
            yExtent = d3.extent(csv, function(row) { return row.num_critic_for_reviews; });
            yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height-30,30]);
        } else if (yAxisSelector == "gross"){  
            yExtent = d3.extent(csv, function(row) { return row.gross; });
            yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height-30,30]);
        } else if (xAxisSelector == "imdb_score"){  
            yExtent = d3.extent(csv, function(row) { return row.imdb_score; });
            yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height-30,30]);
        } else if (yAxisSelector == "num_voted_users"){  
            yExtent = d3.extent(csv, function(row) { return row.num_voted_users; });
            yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height-30,30]);
        } else if (yAxisSelector == "num_user_for_reviews"){  
            yExtent = d3.extent(csv, function(row) { return row.num_user_for_reviews; });
            yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height-30,30]);
        } else if (yAxisSelector == "budget"){  
            yExtent = d3.extent(csv, function(row) { return row.budget; });
            yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height-30,30]);
            
        } if (yAxisSelector == "title_year") {
            yScale = d3.scaleOrdinal()
            .domain(["2010", "2011", "2012", "2013", "2014", "2015", "2016"])
            .range([10, 100, 190, 280, 370, 460, 550]);
        } if (yAxisSelector == "content_rating") {
            yScale = d3.scaleOrdinal()
            .domain(["G", "NC-17", "Not Rated", "PG", "PG-13", "R", "TV-14", "TV-G", "TV-MA", "TV-PG", "TV-Y", "TV-Y7", "Unrated"])
            .range([10, 55, 100, 145, 190, 235, 280, 325, 370, 415, 460, 505, 550]);
        }
        //yScale.extent(data, function (d) {return d.yAxisSelector})
        svgGraph.selectAll(".yaxis")
            .call(d3.axisLeft(yScale));

        svgGraph.selectAll("circle")
            .attr('cy',  function(d) { return yScale(d[yAxisSelector])});


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
        .attr("class", "xaxis")
		.attr("transform", "translate(100,"+ (600 -30)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr("x", 700)
		.attr("y", -6)
		.style("text-anchor", "end")
        .style("fill","black")
		.text("XAXIS");


    svgGraph
        .select(".xaxis")
        .selectAll(".tick")
        .selectAll("text")
        .attr("transform", "rotate(-45)")
    //
    svgGraph // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
        .attr("class", "yaxis")
		.attr("transform", "translate(80, 0)")
		.call(yAxis)
		.append("text")
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

    //WORDCLOUD
    function newWords(plots) {
        //temp default wordcloud words
        var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
        .map(function(d) {
          return {text: d, size: 10 + Math.random() * 90};
        });

        var plots=words;
        if(clickedMovie!=null){ //if a movie is clicked, use that one's keywords
            plots = csvData[clickedMovie].plot_keywords.split("|");
        }
        var plotArr = [];
        plots.forEach(function(d,i) {
            //console.log(d);
            //all plots array
            // console.log(plotsAll);
            var plotsAll = csvData.map(function(p){
                // console.log(p.plot_keywords.split("|"));
                return p.plot_keywords.split("|");
            });
            var count =10;
            plotsAll.forEach(function(item){
                item.forEach(function(p) {
                    if(p.includes(d)) {
                        count++;
                    }
                })
            })
            //console.log(count);
            plotArr.push({text:d, size:count});

        })
        return plotArr;

    }

    var wordCloudGen = wordCloudGen();
    wordCloudGen.update(newWords());
    //Wordcloud generator w draw and update functions
    function wordCloudGen(){
        var fontSize = d3.scalePow().exponent(5).domain([0,1]).range([10,80]);


        var svgWord = d3.select("#wordCloud")
            .append("svg:svg")
            .attr("width",400)
            .attr("height",400)
            // .attr("transform", function(d) { return "translate(30,0)"; })
            .append("g")
                .attr("transform", function(d) { return "translate(200,200)"; })

        function draw(words) {
            //console.log("drawing wc");
            //console.log(words);

            var wordcloud = svgWord.selectAll("g text")
                .data(words,function(d) { return d.text; })

            wordcloud.enter()
                .append("text")
                .attr('class','word')
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Impact")
                .style("fill", "red")
                .attr("text-anchor", "middle")
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                // .attr("transform", function(d) { return "translate(" + [Math.abs(d.x)+(Math.random()*4), Math.abs(d.y)+(Math.random()*4)] + ")rotate(" + d.rotate + ")"; })

                .text(function(d) { return d.text; });
            wordcloud.transition()
                .duration(1000)
                .style("font-size",function(d){return d.size+"px";})
                .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
                // .attr("transform",function(d){return "translate(" + [Math.abs(d.x), Math.abs(d.y)] + ")rotate(" + d.rotate + ")"; })
                .style("fill-opacity",1);
            wordcloud.exit()
                .transition()
                .duration(1000)
                .style("fill-opacity",1e-6)
                .style("font-size",1)
                .remove();
            // wordcloud.selectAll("text")
            // .data(words)
            // .enter().append("text")
            // .attr('class','word')
            // .style("font-size", function(d) { return d.size + "px"; })
            // .style("font-family", "Impact")
            // .style("fill", "red")
            // .attr("text-anchor", "middle")
            // .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
            // .text(function(d) { return d.text; });
        }
        return {
            update:function(words) {

                d3.layout.cloud()
                    .timeInterval(10)
                    .size([600,600])
                    .padding(1)
                    .words(words)
                    //.words(newWords(csvData))
                    .rotate(function() { return ~~(Math.random() * 2) * 90; })
                    .font('Impact')
                    .fontSize(function(d,i){return d.size;})
                    // .text(function(d) {return d.password;})
                    .spiral("archimedean")
                    .on("end",draw)
                    .start();
                }
        }

    }
    // var fontSize = d3.scalePow().exponent(5).domain([0,1]).range([10,80]);
    //
    // var layout = d3.layout.cloud()
    //                         .timeInterval(10)
    //                         .size([600,600])
    //                         // .words(csvData.map(function(d) {
    //                         //       return {text: d.plot_keywords.split("|"), size: 10 + Math.random() * 90, test: "haha"};
    //                         //     }))
    //                         .words(newWords(csvData))
    //                         .rotate(function(d){return 0;})
    //                         .font('Impact')
    //                         .fontSize(function(d,i){return d.size;})
    //                         // .text(function(d) {return d.password;})
    //                         .spiral("archimedean")
    //                         .on("end",draw)
    //                         .start();
    // // newWords();
    // // var plotsAll = csvData.map(function(p){
    // //     // console.log(p.plot_keywords.split("|"));
    // //     return p.plot_keywords.split("|");
    // // });
    //
    // function newWords(plots) {
    //     //access a single movie
    //     var plots=words;
    //     if(clickedMovie!=null){
    //         plots = csvData[clickedMovie].plot_keywords.split("|");
    //     }
    //     // var plots = csvData[clickedMovie].plot_keywords.split("|");
    //     console.log(plots.length);
    //     var plotArr = [];
    //     plots.forEach(function(d,i) {
    //         console.log(d);
    //         //all plots array
    //         // console.log(plotsAll);
    //         var plotsAll = csvData.map(function(p){
    //             // console.log(p.plot_keywords.split("|"));
    //             return p.plot_keywords.split("|");
    //         });
    //         var count =10;
    //         plotsAll.forEach(function(item){
    //             item.forEach(function(p) {
    //                 if(p.includes(d)) {
    //                     count++;
    //                     // console.log("same plot"+p);
    //                 }
    //             })
    //         })
    //         console.log(count);
    //         plotArr.push({text:d, size:count});
    //         // })
    //     //
    //     //     // console.log(i);
    //     //     // d.text.forEach(function(p,i) {
    //     //     //     if(plotArr.includes(p)){
    //     //     //         d.size+=10;
    //     //     //     } else {
    //     //     //         // plotArr.push({text: p, size:d.size});
    //                 // plotArr.push(p);
    //     //     //         // console.log(p);
    //     //     //     }
    //     //     //     // plotArr.push({text: p, size:d.size});
    //     //     //     // console.log(p);
    //     //     // })
    //     })
    //     // console.log(plotArr);
    //     return plotArr;
    //
    //     // return csvData.map(function(d){return d.plot_keywords.split("|");});
    // }
    // var svgWord = d3.select("#wordCloud")
    //     .append("svg:svg")
    //     .attr("width",600)
    //     .attr("height",600)
    //     .append("g");
    // var wordcloud = svgWord.append("g")
    //     .attr('class','wordcloud')
    //     .attr('transform','translate('+300+","+300+")");
    //
    // function draw(words) {
    //     wordcloud.selectAll("text")
    //     .data(words)
    //     .enter().append("text")
    //     .attr('class','word')
    //     .style("font-size", function(d) { return d.size + "px"; })
    //     .style("font-family", "Impact")
    //     .style("fill", "red")
    //     .attr("text-anchor", "middle")
    //     .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
    //     .text(function(d) { return d.text; });
    // }

    drawMovies(csvData);

});
//CALENDAR
var colorFILTER = "";

function getColor(dataItem){

    var myColor = d3.scaleLinear()
      .range(["white", "#69b3a2"])

    if(colorFILTER=='gross'){

        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.gross;}));
        //empty was considered 0, so i removed
        var noZeroes = csvData.filter(function(d) { return d.gross !== 0; });
        var minVal = d3.min(noZeroes, function(d) {return d.gross; });
        myColor.domain([minVal,maxVal]);

        return myColor(Math.floor(dataItem.gross));
    } else if(colorFILTER=='imdb_score'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.imdb_score;}));
        var minVal = d3.min(csvData, function(d) {return d.imdb_score; });
        myColor.domain([minVal,maxVal]);

        return myColor(Math.floor(dataItem.imdb_score));
    } else if(colorFILTER =='movie_facebook_likes'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.movie_facebook_likes;}));
        var minVal = d3.min(csvData, function(d) {return d.movie_facebook_likes; });
        myColor.domain([minVal,maxVal]);
        return myColor(Math.floor(dataItem.movie_facebook_likes));
    } else if(colorFILTER =='budget'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.budget;}));
        var minVal = d3.min(csvData, function(d) {return d.budget; });
        myColor.domain([minVal,maxVal]);
        return myColor(Math.floor(dataItem.budget));
    } else if(colorFILTER =='num_critic_for_reviews'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.num_critic_for_reviews;}));
        var minVal = d3.min(csvData, function(d) {return d.num_critic_for_reviews; });
        myColor.domain([minVal,maxVal]);
        return myColor(Math.floor(dataItem.num_critic_for_reviews));
    }
}

function drawMovies(csvData){

    //filter by year selection
    yrFILTER = d3.select('#yrChoice').property('value');
    var yr = d3.select("#yrChoice")
        .on('change',onchangeY)
    function onchangeY() {
        yrFILTER = d3.select('#yrChoice').property('value');
    }

    //make it start by default on imdb score
    colorFILTER = d3.select('#colorFilter').property('value');
    var colorfill = d3.select("#colorFilter")
        .on('change',onchangeV)
    function onchangeV() {
        colorFILTER = d3.select('#colorFilter').property('value');
    }

    var cellMargin = 2;
    var cellSize = 10.5;
    var genreAll = [];

    csvData.forEach(function(d){
        var gen = d.genres.split("|");
        gen.forEach(function(g) {
            if(!genreAll.includes(g)) {
                genreAll.push(g);
            }
        })
    })
    genreAll.sort(); //alphabetically

    //note ('' untitled year is considered a key still)
    var years = d3.nest()
        .key(d=>d.title_year).sortKeys(d3.descending)
        .entries(csvData)
        // .slice(1,years.length)
        .reverse();
    // //remove '' key
    years=years.slice(1,years.length)

    var col;
    var movieCalSvg = d3.select("#calendar").selectAll("svg")
        .data(years)
        .enter().append("svg")
        .attr("class", "yearCal")
        .attr("id",function(d,i){return 'year'+d.key})
        .attr("height", ((cellSize*35) + cellMargin*4 + 20))
        .attr("transform",(d,i)=>`translate(0,40)`) //${height + cellSize * 1.5}
        .attr("width", cellSize*14*genreAll.length)

    //for each year, put the year on the side
    movieCalSvg.append("text")
        .attr("class","year")
        .attr("y", 10)
        .attr("x",30)
        .attr("text-anchor","end")
        .text(function(d){return d.key;})


    var info = d3.select("#calendar").append("div")
                .attr("class","tooltip")
                .style("opacity",0);

    //make the genre the id of the g so that we know which corresponds
    years.forEach(function(d,i){
        d3.select("#year"+d.key) //-> to draw filtered year, change all d.key to yrFILTER
        // d3.select("#year"+yrFILTER)
            .selectAll("g.genre")
            .data(genreAll)
                .enter().append("g")
                .attr("class","genre")
                .attr("id", function(g) {return 'genre-'+g+d.key;})
                .attr("transform",(d,i)=>`translate(${this.width/6*Math.floor(i%(genreAll.length/2))},${200*Math.floor(i/(genreAll.length/2))})`)
                .append("text")
                .attr("x",100)
                .attr("y",((cellSize*15) + cellMargin*4))
                .attr("text-anchor","middle")
                .text(function(g){return g;})

        genreAll.forEach(function(g,i){
            d3.select("#genre-"+g+d.key)
            .selectAll("rect.movie")
                .data(csvData.filter(function(f,l){
                       if(f.genres.includes(g) &&f.title_year==d.key){
                           return f;
                       }
                   }))
                .enter()
                .append("rect")
                    .attr("class","movie")
                    .attr("width", cellSize)
                    .attr("height", cellSize)
                    .attr("rx",3).attr("ry",3)
                    .style("fill","#eaeaea")
                    // .style("fill",function(c,i){return getColor(c);})

                    .attr("transform",(f,i)=>`translate(40,0)`)
                    //%cols
                    //if i>cols cellsize*i()
                    .attr("y", function(f,i) { return (Math.floor(i/10) * cellSize +(i/10)); }) //+ (d.id%col * cellMargin)
                    .attr("x", function(f,i) { return (i%10) + cellSize*(i%10); })
                    .on("mouseover", function(f) {
                        info.transition()
                            .duration(200)
                            .style("opacity",.8)
                        info.html(f.movie_title + "<br/>"  + f.title_year +"<br/>"+f.genres)
                            .style("opacity",.8)
                            .style("left",(d3.event.pageX)+"px")
                            .style("top",(d3.event.pageY-28)+"px");
                    })
                    .on("mouseout", function(f) {
                        info.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
        })

    });

    //change color based on filter for calendar
    d3.select("#filCol")
        .on('click',function() {

            d3.selectAll("rect.movie")
                .transition()
                .duration(function(d) {
                    return Math.random() * 10;
                })
                .delay(function(d) {
                    return 10;
                })
                .style("fill",function(c,i){;return getColor(c);})

        });

}
