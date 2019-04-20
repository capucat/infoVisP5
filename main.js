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

    var xExtent = d3.extent(csv, function(row) { return row.title_year; });
    var yExtent = d3.extent(csv, function(row) { return row.gross; });

    // Axis setup
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
                .range([10,width -150]);
            } else if (xAxisSelector == "gross"){
                vxExtent = d3.extent(csv, function(row) { return row.gross; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -10]);
            } else if (xAxisSelector == "imdb_score"){
                xExtent = d3.extent(csv, function(row) { return row.imdb_score; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width-150]); //700
            } else if (xAxisSelector == "num_voted_users"){
                // console.log(width);
                xExtent = d3.extent(csv, function(row) { return row.num_voted_users; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -150]);
            } else if (xAxisSelector == "num_user_for_reviews"){

                xExtent = d3.extent(csv, function(row) { return row.num_user_for_reviews; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width -150]);
            } else if (xAxisSelector == "budget"){
                xExtent = d3.extent(csv, function(row) { return row.budget; });
                xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([10,width-150]);
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

        svgGraph.selectAll(".xaxis")
            .call(d3.axisBottom(xScale));

        svgGraph.selectAll("circle")
            .attr('cx', function(d) { return xScale(d[xAxisSelector])});
        svgGraph
            .select(".xaxis")
            .selectAll(".tick")
            .selectAll("text")
            .style("font-family", "'Share Tech', sans-serif");
            // .attr("transform", "rotate(-45)")
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
        } else if (yAxisSelector == "imdb_score"){
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
            // .transition()
            //  .ease('linear')
            //  .duration(1000)
            .attr('cy',  function(d) { return yScale(d[yAxisSelector])});

        svgGraph
            .select(".yaxis")
            .selectAll(".tick")
            .selectAll("text")
            .style("font-family", "'Share Tech', sans-serif");
    });

    svgGraph // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
        .attr("class", "xaxis")
		.attr("transform", "translate(100,"+ (height -20)+ ")")
		.call(xAxis) // call the axis generator
		.append("text")
		.attr("x", width-110)
		.attr("y", 0)
		.style("text-anchor", "end")
        .style("fill","black")
		.text("XAXIS")
        .style("font-family", "'Share Tech', sans-serif")
        .style("font-size", "14px");


    svgGraph
        .select(".xaxis")
        .selectAll(".tick")
        .selectAll("text")
        .style("font-family", "'Share Tech', sans-serif");

        // .attr("transform", "translate(0,2)rotate(-45)")
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
		.text("YAXIS")
        .style("font-family", "'Share Tech', sans-serif")
        .style("font-size", "14px");

    svgGraph
        .select(".yaxis")
        .selectAll(".tick")
        .selectAll("text")
        .style("font-family", "'Share Tech', sans-serif");
    //WORDCLOUD
    function newWords(plots) {
        //temp default wordcloud words
        // var words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
        // .map(function(d) {
        //   return {text: d, size: 10 + Math.random() * 90};
        // });
        var words=[""];
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
                .style("fill", "#75B9BE")
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

    drawMovies(csvData);

});
//CALENDAR
var colorFILTER = "";
var minCol;
var maxCol;
function getColor(dataItem){

    // var myColor = d3.scaleLinear()
    //   .range(["#dee2ff", "#666a86"])
    var myColor = d3.scaleQuantize()
      .range(["#dee2ff","#c5c9e6","acb0cd","9498b5","7d819d" ,"#666a86"])

    if(colorFILTER=='gross'){

        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.gross;}));
        //empty was considered 0, so i removed
        var noZeroes = csvData.filter(function(d) { return d.gross !== 0; });
        var minVal = d3.min(noZeroes, function(d) {return d.gross; });
        minCol=minVal;
        maxCol=maxVal;
        myColor.domain([minVal,maxVal]);

        return myColor(Math.floor(dataItem.gross));
    } else if(colorFILTER=='imdb_score'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.imdb_score;}));
        var minVal = d3.min(csvData, function(d) {return d.imdb_score; });
        minCol=minVal;
        maxCol=maxVal;
        myColor.domain([minVal,maxVal]);

        return myColor(Math.floor(dataItem.imdb_score));
    } else if(colorFILTER =='movie_facebook_likes'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.movie_facebook_likes;}));
        var minVal = d3.min(csvData, function(d) {return d.movie_facebook_likes; });
        myColor.domain([minVal,maxVal]);
        minCol=minVal;
        maxCol=maxVal;
            return myColor(Math.floor(dataItem.movie_facebook_likes));
    } else if(colorFILTER =='budget'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.budget;}));
        var minVal = d3.min(csvData, function(d) {return d.budget; });
        myColor.domain([minVal,maxVal]);
        minCol=minVal;
        maxCol=maxVal;
        return myColor(Math.floor(dataItem.budget));
    } else if(colorFILTER =='num_critic_for_reviews'){
        var maxVal = Math.max.apply(Math, csvData.map(function(d){return d.num_critic_for_reviews;}));
        var minVal = d3.min(csvData, function(d) {return d.num_critic_for_reviews; });
        myColor.domain([minVal,maxVal]);
        minCol=minVal;
        maxCol=maxVal;
        return myColor(Math.floor(dataItem.num_critic_for_reviews));
    }
}

function drawMovies(csvData){

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
        .attr("transform",(d,i)=>`translate(0,20)`) //${height + cellSize * 1.5}
        .attr("width", cellSize*7.2*genreAll.length)

    //for each year, put the year on the side
    movieCalSvg.append("text")
        .attr("class","year")
        .attr("y", 10)
        .attr("x",30)
        .attr("text-anchor","end")
        .style("font-size", "14px")
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
                        info.html(f.movie_title + "<br/>"  + f.title_year +"<br/>"+f.genres
                                    +"<br/>"  + "IMDB: "+f.imdb_score +"<br/>"  + "Revenue: $"+f.gross +"<br/>"  + "FB likes: "+f.movie_facebook_likes
                                +"<br/>"  + "Budget: $"+f.budget+ "<br/>"  + "Num Critics: "+f.num_critic_for_reviews)
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
                console.log("minis"+minCol);
            d3.select("#xVal")
                .text(minCol)
            d3.select("#yVal")
                .text(maxCol)
        });

        // handleClick();
}
// function handleClick(){
//
//     d3.select("#myVal").on("input", function() {
//       update(+this.value);
//     });
//     function update(nValue) {
//         //var input = d3.select("#myVal").property('value');
//         var input = document.getElementById("myVal").value;
//         d3.selectAll("rect.movie")
//             .filter(function(d){
//                 if(d.movie_title=="From Paris with Love"){console.log("this vmies");}
//                 if(d.movie_title==input){
//                     console.log("Same");
//                     // console.log(d.movie_title+ d.movie_title==input.toString());
//                 }
//                 return d.movie_title==input;
//             })
//             .transition()
//             .duration(function(d) {
//                 return Math.random() * 10;
//             })
//             .delay(function(d) {
//                 return 10;
//             })
//             .style("fill","red");
//       // adjust the value
//       // holder.select("text")
//       //   .attr("transform", "translate(300,150) rotate("+nValue+")");
//     }
//
// }
