//This is the accessor function 
var lineFunction = d3.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; });

// var events = [
//         ['Doug cut the recipes from the magazine with a sharp knife', 'Instrument Remove', 'incremental accomplishment', 'Sbj V Obj PathP with Obl', "cut('Doug', 'knife', 'recipes', 'magazine')", 'Theme-of(z,e) & Component-of(a,Doug) & Component-of(b,knife) & Component-of(c,recipes) & Component-of(d,magazine) & UndAct(a,i,j,q1) & UndAct(b,i,k,q2) & IncrAcc(c,i,l,q3) & InhStPh(d,i,m,q4) & VOL(q1) & -MER(q3) & FRC(a,b) & FRC(b,c) & PTH(c,d)'],

//         ['Doug cleaned the table of books', 'Volitional Uncover', 'incremental accomplishment', 'Sbj V Obj of Obl', "cleaned('Doug', 'books', 'table')", 'Theme-of(z,e) & Component-of(a,Doug) & Component-of(b,books) & Component-of(c,table) & UndAct(a,i,j,q1) & UndAct(b,i,k,q2) & IncrAcc(c,i,l,q3) & VOL(q1) & -MER(q3) & FRC(a,b) & PTH(b,c)'],

//         ['The books slid from the table to the floor', 'Autonomous Motion', 'incremental accomplishment', 'Sbj V PathP', "slid('books', 'floor')", 'Theme-of(x,e) & Component-of(a,books) & Component-of(b,floor) & IncrAcc(a,i,j,q1) & InhStPh(b,i,k,q2) & MOT(q1) & EXIST(q2) & PTH(a,b)']
// ];

var events = [
        
    ['and another guy picks up the rock,', 'get-13.5.1', 'Sbj V Obj DNI-1', 'Volitional Motion', 'directed achievement', 'Sbj V Obj DNI', "picks('guy', 'rock', 'DNI-1')", 'Theme-of(y,e) & Component-of(a,guy) & Component-of(b,rock) & Component-of(c,DNI-1) & CycAch(a,i,j,q1) & DirAch(b,i,k,q2) & InhStPh(c,i,l,q3) & VOL(q1) & MOT(q2) & EXIST(q3) & FRC(a,b) & PTH(b,c)'],

    ['and he throws it out of the road,', 'throw-17.1', 'Sbj V Obj PathP', 'Volitional Remove', 'directed achievement', 'Sbj V Obj PathP', "throws('guy', 'rock', 'road')", 'Theme-of(y,e) & Component-of(a,guy) & Component-of(b,rock) & Component-of(c,road) & CycAch(a,i,j,q1) & DirAch(b,i,k,q2) & InhStPh(c,i,l,q3) & VOL(q1) & -MER(q2) & EXIST(q3) & FRC(a,b) & PTH(b,c)'],

    ['and he gets all situated again,', 'become-109.1', 'Sbj V', 'Self-volitional Internal', 'incremental accomplishment', 'Sbj V', "gets('he')", 'Theme-of(x,e) & Component-of(a,he) & IncrAcc(a,i,j,q1) & VOL(q1) & INT(q1)'],

    ['and he . . takes off', 'escape-51.1', 'Sbj V DNI-2', 'Self-volitional Motion', 'directed achievement', 'Sbj V DNI', "takes off('he', 'DNI-2')", 'Theme-of(x,e) & Component-of(a,he) & Component-of(b,DNI-2) & DirAch(a,i,j,q1) & InhStPh(b,i,k,q2) & VOL(q1) & MOT(q1) & EXIST(q2) & PTH(a,b)']

];

var svgHeight = 400;

// don't confuse this with recordObjects (which is for FD lines); historySubevents is to link coreferring events
var historySubevents = [];
var allParticipantsList = [];

//The SVG Container
var svgContainer = d3.select(".diagram").append("svg")
                                    .attr("width", 800)
                                    .attr("height", svgHeight);

var selected = [];

for (var j=0; j<4; j++){
	var event = events[j];
	draw(event);
	x1 += 200;
};

// this might be a good spot for drawing the coreferential links

var points4coreference = [];

var drawCoref = drawCoreferenceLinks(historySubevents, allParticipantsList);


// the aspect objects
function getObjects (height, x1) {

    var IncrementalAccomplishment = {   "solid": [  { "x": 20+x1,  "y": height-20},
                                                    { "x": 20+x1,  "y": height-40}, 
                                                    { "x": 100+x1,  "y": height-80},
                                                    { "x": 100+x1,  "y": height-100} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-20},
                                                    {"x":20+x1, "y":height-20} ], 

                                    "dotted-end": [ {"x":100+x1, "y":height-100},
                                                    {"x":120+x1, "y":height-100} ],

                                    "bcr-labels" : {"b" : [{"x":0+x1, "y":height-20}, {"x":-5+x1, "y":height-20}], 
                                                    "c" : [{"x":-1+x1, "y":height-40}, {"x":-1+x1, "y": height-80}],
                                                    "r" : [{"x":0+x1,  "y": height-100}, {"x":-5+x1,  "y": height-100}]},

                                    "fd1" : {"when-first": {"x":20+x1, "y":height-40}, "when-second": {"x":20+x1, "y":height-20}},

                                    "fd2" : {"when-first": {"x":100+x1, "y":height-100}, "when-second": {"x":100+x1, "y":height-80}},

                                    "name" : "IncrAcc" 
                                };


    var NonincrementalAccomplishment = {  "solid": [    { "x": 20+x1,  "y": height-20},
                                                        { "x": 20+x1,  "y": height-40},
                                                        { "x": 40+x1,  "y": height-80}, 
                                                        { "x": 60+x1,  "y": height-40},
                                                        { "x": 80+x1,  "y": height-80},  
                                                        { "x": 100+x1, "y": height-40},
                                                        { "x": 100+x1,  "y": height-100} ],

                                            "dotted-beg": [ {"x":0+x1, "y":height-20},
                                                            {"x":20+x1, "y":height-20} ], 

                                            "dotted-end": [ {"x":100+x1, "y":height-100},
                                                            {"x":120+x1, "y":height-100} ],

                                            "bcr-labels" : {"b" : [{"x":0+x1, "y":height-20}, {"x":-5+x1, "y":height-20}], 
                                                            "c" : [{"x":-1+x1, "y":height-40}, {"x":-1+x1, "y": height-80}],
                                                            "r" : [{"x":0+x1,  "y": height-100}, {"x":-5+x1,  "y": height-100}]},

                                            "fd1" : {"when-first": {"x":20+x1, "y":height-40}, "when-second": {"x":20+x1, "y":height-20}},

                                            "fd2" : {"when-first": {"x":100+x1, "y":height-100}, "when-second": {"x":100+x1, "y":height-40}},

                                            "name" : "NonIncrAcc"

                                        }; 


    var UndirectedActivity = {  "solid": [  { "x": 20+x1,  "y": height-20},
                                            { "x": 40+x1,  "y": height-60}, 
                                            { "x": 60+x1,  "y": height-20},
                                            { "x": 80+x1,  "y": height-60},  
                                            { "x": 100+x1, "y": height-20} ],

                                "dotted-beg": [ {"x":0+x1, "y":height-10},
                                                {"x":20+x1, "y":height-10},
                                                {"x":20+x1, "y":height-20} ], 

                                "dotted-end": [ {"x":100+x1, "y":height-20},
                                                {"x":100+x1, "y":height-10},
                                                {"x":120+x1, "y":height-10} ],

                                "bcr-labels" : {"b" : [{"x":0+x1, "y":height-10}, {"x":-5+x1, "y":height-10}], 
                                                "c" : [{"x":-1+x1, "y":height-20}, {"x":-1+x1, "y": height-60}],
                                                "r" : ["None"]},

                                "fd1" : {"when-first": {"x":20+x1, "y":height-20}, "when-second": {"x":20+x1, "y":height-10}},

                                "fd2" : {"when-first": {"x":100+x1, "y":height-20}, "when-second": {"x":100+x1, "y":height-10}},

                                "name" : "UndAct"

                            }; 


    var DirectedActivity = {   		"solid": [		{ "x": 20+x1,  "y": height-40}, 
                                                    { "x": 100+x1,  "y": height-80} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-20},
                                                    {"x":20+x1, "y":height-20},
                                                    { "x": 20+x1,  "y": height-40} ], 

                                    "dotted-end": [ {"x":100+x1, "y":height-80} ],

                                    "bcr-labels" : {"b" : [{"x":0+x1, "y":height-20}, {"x":-5+x1, "y":height-20}], 
                                                    "c" : [{"x":-1+x1, "y":height-40}, {"x":-1+x1, "y": height-80}],
                                                    "r" : ["None"]},

                                    "fd1" : {"when-first": {"x":20+x1, "y":height-40}, "when-second": {"x":20+x1, "y":height-20}},

                                    "fd2" : {"when-first": {"x":100+x1, "y":height-80}, "when-second": {"x":100+x1, "y":height-80}},

                                    "name" : "DirAct"
                            };


    var CyclicAchievement = {   	"solid": 	[	{ "x": 47+x1,  "y": height-20}, 
                                                    { "x": 47+x1,  "y": height-60},
                                                    { "x": 50+x1,  "y": height-60},
                                                    { "x": 50+x1,  "y": height-20} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-20},
                                                    {"x":47+x1, "y":height-20} ], 

                                    "dotted-end": [ { "x": 50+x1,  "y": height-20},
                                    				{ "x": 100+x1,  "y": height-20} ],

                                    "bcr-labels" : {"b" : [{"x":0+x1, "y":height-20}, {"x":-5+x1, "y":height-20}], 
                                                    "c" : [{"x":-1+x1, "y":height-20}, {"x":-1+x1, "y": height-60}],
                                                    "r" : [{"x":0+x1,  "y": height-60}, {"x":-5+x1,  "y": height-60}]},

                                    "fd1" : {"when-first": {"x":47+x1, "y":height-60}, "when-second": {"x":47+x1, "y":height-20}},

                                    "fd2" : {"when-first": {"x":47+x1, "y":height-60}, "when-second": {"x":47+x1, "y":height-20}},

                                    "name" : "CycAch"
                            };


    var DirectedAchievement = {   	"solid": 	[	{ "x": 47+x1,  "y": height-20}, 
                                                    { "x": 47+x1,  "y": height-60} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-20},
                                                    {"x":47+x1, "y":height-20} ], 

                                    "dotted-end": [ { "x": 47+x1,  "y": height-60},
                                    				{ "x": 100+x1,  "y": height-60} ],

                                    "bcr-labels" : {"b" : [{"x":0+x1, "y":height-20}, {"x":-5+x1, "y":height-20}], 
                                                    "c" : [{"x":-1+x1, "y":height-20}, {"x":-1+x1, "y": height-60}],
                                                    "r" : [{"x":0+x1,  "y": height-60}, {"x":-5+x1,  "y": height-60}]},

                                    "fd1" : {"when-first": {"x":47+x1, "y":height-60}, "when-second": {"x":47+x1, "y":height-20}},

                                    "fd2" : {"when-first": {"x":47+x1, "y":height-60}, "when-second": {"x":47+x1, "y":height-20}},

                                    "name" : "DirAch" 
                            };

    //InherentState is a little trickier: it takes into account the preceding event (where profiled and points of FDs)
    //so, has two values: "extended" and "punctual"
    var InherentStateExtended = {        

                                    "solid":    [   { "x": 20+x1,  "y": height-60}, 
                                                    { "x": 100+x1,  "y": height-60} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-60},
                                                    {"x":20+x1, "y":height-60} ], 

                                    "dotted-end": [ { "x": 100+x1,  "y": height-60},
                                                    { "x": 120+x1,  "y": height-60} ],

                                    "bcr-labels" : {"b" : ["None"], 
                                                    "c" : ["None"],
                                                    "r" : [{"x":0+x1,  "y": height-60}, {"x":-5+x1,  "y": height-60}]},

                                    "fd1" : {"when-first": {"x":20+x1, "y":height-20}, "when-second": {"x":20+x1, "y":height-60}},

                                    "fd2" : {"when-first": {"x":100+x1, "y":height-20}, "when-second": {"x":100+x1, "y":height-60}},

                                    "name" : "InhStPhExt" 

                    
                                };

    var InherentStatePunctual =  {        

                                    "solid":    [   { "x": 46+x1,  "y": height-60}, 
                                                    { "x": 48+x1,  "y": height-60} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-60},
                                                    {"x":46+x1, "y":height-60} ], 

                                    "dotted-end": [ { "x": 48+x1,  "y": height-60},
                                                    { "x": 120+x1,  "y": height-60} ],

                                    "bcr-labels" : {"b" : ["None"], 
                                                    "c" : ["None"],
                                                    "r" : [{"x":0+x1,  "y": height-60}, {"x":-5+x1,  "y": height-60}]},

                                    "fd1" : {"when-first": {"x":47+x1, "y":height-20}, "when-second": {"x":47+x1, "y":height-60}},

                                    "fd2" : {"when-first": {"x":47+x1, "y":height-20}, "when-second": {"x":47+x1, "y":height-60}},

                                    "name" : "InhStPhPunct"

                                };


    var TransitoryState =   {       "solid":    [   { "x": 47+x1,  "y": height-60}, 
                                                    { "x": 100+x1,  "y": height-60} ],

                                    "dotted-beg": [ {"x":0+x1, "y":height-20},
                                                    {"x":47+x1, "y":height-20},
                                                    {"x":47+x1, "y":height-60} ], 

                                    "dotted-end": [ { "x": 47+x1,  "y": height-60} ],

                                    "bcr-labels" : {"b" : [{"x":0+x1, "y":height-20}, {"x":-5+x1, "y":height-20}], 
                                                    "c" : ["None"],
                                                    "r" : [{"x":0+x1,  "y": height-60}, {"x":-5+x1,  "y": height-60}]},

                                    "fd1" : {"when-first": {"x":47+x1, "y":height-60}, "when-second": {"x":47+x1, "y":height-20}},

                                    "fd2" : {"when-first": {"x":47+x1, "y":height-60}, "when-second": {"x":47+x1, "y":height-20}},

                                    "name" : "TranSt" 
                            };


    return  {   IncrAcc: IncrementalAccomplishment, 
                NonIncrAcc: NonincrementalAccomplishment, 
                UndAct: UndirectedActivity ,
                DirAct: DirectedActivity,
                CycAch: CyclicAchievement,
                DirAch: DirectedAchievement,
                TranSt: TransitoryState,
                InhStPhExt: InherentStateExtended,
                InhStPhPunct: InherentStatePunctual
            };

}


function createDiagram (svgContainer, myAspectObject) {

    var solidLine = myAspectObject["solid"];
    var dottedBeg = myAspectObject["dotted-beg"];
    var dottedEnd = myAspectObject["dotted-end"];
    var b = myAspectObject["bcr-labels"]["b"];
    var c = myAspectObject["bcr-labels"]["c"];
    var r = myAspectObject["bcr-labels"]["r"];

    var aspectName = myAspectObject["name"];

    var lineGraph = svgContainer.append("path")
                                .attr("d", lineFunction(solidLine))
                                .attr("stroke", "blue")
                                .attr("stroke-width", 2)
                                .attr("fill", "none");

    var dLinesBeg = svgContainer.append("path")
                                .attr("d", lineFunction(dottedBeg))
                                .attr("stroke", "black")
                                .style("stroke-dasharray", ("2, 2"))
                                .attr("fill", "none");

    var dLinesEnd = svgContainer.append("path")
                                .attr("d", lineFunction(dottedEnd))
                                .attr("stroke", "black")
                                .style("stroke-dasharray", ("2, 2"))
                                .attr("fill", "none");

    if (b[0]!='None') {

        var addB = svgContainer.append("path")
                            .attr("d", lineFunction(b))
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("fill", "none");

        var addBText = svgContainer.append("text")
                            .attr("x", b[1]["x"]-11)
                            .attr("y", b[1]["y"]+3)
                            .text('b');

        }

    if (c[0]!='None' && aspectName.indexOf("Ach")==-1) {

        var addC = svgContainer.append("path")
                            .attr("d", lineFunction(c))
                            .attr("stroke", "black")
                            .attr("stroke-width", 4)
                            .attr("fill", "none");

        var addCText = svgContainer.append("text")
                            .attr("x", c[1]["x"]-15)
                            .attr("y", (1/2)*(c[0]["y"]+c[1]["y"])+3)
                            .text('c');

        }

    if (r[0]!="None") {

        var addR = svgContainer.append("path")
                    .attr("d", lineFunction(r))
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("fill", "none");

        var addRText = svgContainer.append("text")
                            .attr("x", r[1]["x"]-11)
                            .attr("y", r[1]["y"]+3)
                            .text('r');
        }

}


function drawFDlines (svgContainer, myEventObject1, myEventObject2) {

    var fd1 = [myEventObject1["fd1"]["when-first"]];

    fd1.push(myEventObject2["fd1"]["when-second"]);

    var fdline1 = svgContainer.append("path")
                        .attr("d", lineFunction(fd1))
                        .attr("stroke", "red")
                        .attr("stroke-width", 1)
                        .attr("fill", "none");        


    var fd2 = [myEventObject1["fd2"]["when-first"]];

    fd2.push(myEventObject2["fd2"]["when-second"]);

    var fdline2 = svgContainer.append("path")
                        .attr("d", lineFunction(fd2))
                        .attr("stroke", "red")
                        .attr("stroke-width", 1)
                        .attr("fill", "none"); 
}


function drawPathArrows (svgContainer, myObject) {

	// here pass the second object in the causal chain to align the triangle(s)

	var x1 = myObject["fd1"]["when-second"].x;
	var y1 = myObject["fd1"]["when-second"].y;

	svgContainer.append('path')
	      .attr('d', function(d) { 
	        return 'M ' + x1 +' '+ y1 + ' l 5 5 l -10 0 z';
	      })
	      .attr("fill", "red");


	var x2 = myObject["fd2"]["when-second"].x;
	var y2 = myObject["fd2"]["when-second"].y;

	svgContainer.append('path')
	      .attr('d', function(d) { 
	        return 'M ' + x2 +' '+ y2 + ' l 5 5 l -10 0 z';
	      })
	      .attr("fill", "red");
}


function addPathForceLabels(svgContainer, subEvent1, subEvent2, prevSubEvent) {

    var x = subEvent1["fd2"]["when-first"]["x"];
    var y = (subEvent1["fd2"]["when-first"]["y"] + subEvent2["fd2"]["when-second"]["y"]) / 2;

    if (prevSubEvent[2] == 'PTH' || prevSubEvent[2] == 'FRC') {

        var thisText = prevSubEvent[2];

        var addPthFrcText = svgContainer.append("text")
                                .attr("x", x+5)
                                .attr("y", y+5)
                                .text(thisText);

    } else if (prevSubEvent[3] == 'PTH' || prevSubEvent[3] == 'FRC') {

        var thisText = prevSubEvent[3];

        var addPthFrcText = svgContainer.append("text")
                                .attr("x", x+5)
                                .attr("y", y+5)
                                .text(thisText);
    }

}

// x1 is the x-translation factor
function drawAxes (svgContainer, height, aspectHeight, includeXaxis, x1) {

    if (includeXaxis) {

        var xAxis = [   {"x": 0+x1, "y":height},
                        {"x": 120+x1, "y":height}];

        var xline = svgContainer.append("path")
                .attr("d", lineFunction(xAxis))
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("fill", "none");
    };

    //hacky height is the upper part of the y-axis, while height adjusts the bottom part
    if (aspectHeight == 80) {

        var hackyHeight = height-aspectHeight+10;
        height = height;

    } else if (aspectHeight == 100) {

        var hackyHeight = height-aspectHeight-10;
        height = height-10;

    } else if (aspectHeight == 60) {

        var hackyHeight = height-aspectHeight-20;
        height = height-20;
        
    }


    var yAxis = [   {"x": 0+x1, "y":hackyHeight},
                    {"x": 0+x1, "y":height}];

    var yline = svgContainer.append("path")
                        .attr("d", lineFunction(yAxis))
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("fill", "none");
}


function addText (svgContainer, myAspectObject, subeventArray) {

    var participant = subeventArray[0];

    var strLen = participant.length*2;

    var theme = subeventArray[2];

    if (theme){
        var themeLen = theme.length*1.5;
    }
    

    var c = myAspectObject["bcr-labels"]["c"];

    var r = myAspectObject["bcr-labels"]["r"];


    if (c[0]!='None') {

        var addParticipantText = svgContainer.append("text")
                                    .attr("x", c[1]["x"]-55-strLen)
                                    .attr("y", (1/2)*(c[0]["y"]+c[1]["y"])+3)
                                    .text(participant);

    } else if (r[0]!="None") {

        var addParticipantText = svgContainer.append("text")
                                    .attr("x", r[1]["x"]-60-strLen/5)
                                    .attr("y", r[1]["y"]+3)
                                    .text(participant);
    }

    if (theme!==undefined && theme != 'FRC' && theme != 'PTH') {

        if (r[0]!="None") {

            var addTheme = svgContainer.append("text")
                                        .attr("x", r[1]["x"]-35-themeLen)
                                        .attr("y", r[1]["y"]-10)
                                        .text(theme);
        } else {

            var addTheme = svgContainer.append("text")
                                        .attr("x", c[1]["x"]-35-themeLen)
                                        .attr("y", (1/2)*(c[0]["y"]+c[1]["y"])-10)
                                        .text(theme);
        }

    }

}


function addDashedPath(dottedLines1, dottedLines2, inner=true, sendToTop=false) {

    // adding lines between participants


    pathinfo = [{x:dottedLines1[0]["x"], y:dottedLines1[0]["y"]},
                {x:dottedLines2[0]["x"], y:dottedLines2[0]["y"]}];

    // pathinfo = [[dottedLines1[0]["x"], dottedLines1[0]["y"]],
    //             [dottedLines2[0]["x"], dottedLines2[0]["y"]]];

    if (inner == true && sendToTop == false) {
        pathinfo.splice(1,0,{x:(dottedLines1[0]["x"]+dottedLines2[0]["x"])/2, y:(dottedLines1[0]["y"]+dottedLines2[0]["y"]-15)/2 });
        pathinfo.splice(1,0,{x:((dottedLines1[0]["x"]+dottedLines2[0]["x"])-35)/2, y:(dottedLines1[0]["y"]+dottedLines2[0]["y"]+15)/2 });

    } else if (inner == false && sendToTop == false ){


    } 
    // else {

    //     // for participants that do not corefer
    //     // pathinfo.splice(1,0,{x:(dottedLines1[0]["x"]+dottedLines2[0]["x"])/2, y:(dottedLines1[0]["y"]+dottedLines2[0]["y"]-100)/2 });
    //     // pathinfo.splice(1,0,{x:((dottedLines1[0]["x"]+dottedLines2[0]["x"])-100)/2, y:(dottedLines1[0]["y"]+dottedLines2[0]["y"]-100)/2 });

    //     pathinfo.push( [ (dottedLines1[0]["x"]+dottedLines2[0]["x"])/2, (dottedLines1[0]["y"]+dottedLines2[0]["y"]-100)/2 ] );
    //     pathinfo.push( [ ((dottedLines1[0]["x"]+dottedLines2[0]["x"])-100)/2, (dottedLines1[0]["y"]+dottedLines2[0]["y"]-100)/2 ] );

    //     //points = {x:((dottedLines1[0]["x"]+dottedLines2[0]["x"])-100)/2, y:(dottedLines1[0]["y"]+dottedLines2[0]["y"]-100)/2 }

    // }

    points4coreference.push(pathinfo);

}


function addPoints4Coreference (arr) {

    // Creating path using data in pathinfo and path data generator d3line.
        
    // svgContainer.append("svg:path")
    //     .attr("d", d3line(arr[i]))
    //     .attr("class", "line")
    //     .style("stroke-dasharray", ("8, 5"))
    //     .style("stroke-width", 1)
    //     .style("stroke", "#FFBBCC")
    //     .style("fill", "none");

    var lineGenerator = d3.line().curve(d3.curveCatmullRom.alpha(1.0))
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; }); 

    svgContainer.selectAll("spath")
        .data(arr)
        .enter().append("path")
        .attr("class", "line")
        .attr("d", lineGenerator); 

    // Define the div for the tooltip
    var tooldiv = d3.select("body").append("tooldiv")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

    // Determine points for tooltip (all coordinates where x=0)
    var points4Text = [];

    for (i=0; i<arr.length; i++) {
        var thisArr = arr[i];
        if (thisArr[0]["x"]==0) {
            points4Text.push(thisArr[0]);
        }
    }

    svgContainer.selectAll("dot")    
        .data(points4Text)         
    .enter().append("circle")                               
        .attr("r", 10)       
        .attr("cx", function(d) { return d.x; })       
        .attr("cy", function(d) { return d.y; })     
        .on("mouseover", function(d) {      
            tooldiv.transition()        
                .duration(200)      
                .style("opacity", .9);  
            tooldiv .html('<p>'+d.x + '<br/>'  + 'Mine'+'</p>')
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");         
            }) 
        .on("mouseout", function(d) {       
            tooldiv.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });


}



function getHeight(allAspects) {

    // determines the height of each subevent: 60, 80, 100

    var subeventHeights = [];

    for (i in allAspects) {
        if (allAspects[i]==='IncrAcc' || allAspects[i]==='NonIncrAcc') {
            subeventHeights.push(100);
        } else if (allAspects[i]==='InhStPh') {
            subeventHeights.push(60);
        } else {
            subeventHeights.push(80);
        }
    }

    return subeventHeights;
}


function parsePredCalc (myPredCalc) {

    // form ("None" if none): [[q1PartAspectThemeFD], [q2PartAspectThemeFD], [q3PartAspectThemeFD], [q4PartAspectThemeFD], [aspectSummary]]
    var eventInfo = []

    var string_split = myPredCalc.split('&');
    var string_trim = [];

    //string_trim is the main array to iterate over
    for (i in string_split) {
        string_trim.push(string_split[i].trim());
    }

    //push q1Aspect
    var q1AspectTheme = [];
    for (i in string_trim) {

        if (string_trim[i].indexOf('Component-of(a,') !== -1) {
            var part1 = string_trim[i].split(',')[1].slice(0, -1);
            q1AspectTheme.push(part1);
        } else if (string_trim[i].indexOf('q1') !== -1) {
            var q1Instance = string_trim[i].split('(')[0];
            q1AspectTheme.push(q1Instance)
        } else if (string_trim[i].indexOf('(a,b)') !== -1) {
            var fd1Instance = string_trim[i].split('(')[0];
            q1AspectTheme.push(fd1Instance)
        }
    }
    eventInfo.push(q1AspectTheme);

    //push q2Aspect
    var q2Exists = false;
    var q2AspectTheme = [];
    for (i in string_trim) {

        if (string_trim[i].indexOf('Component-of(b,') !== -1) {
            var part2 = string_trim[i].split(',')[1].slice(0, -1);
            q2AspectTheme.push(part2);
        } else if (string_trim[i].indexOf('q2') !== -1) {
            var q2Instance = string_trim[i].split('(')[0];
            q2Exists = true;
            q2AspectTheme.push(q2Instance)
        } else if (string_trim[i].indexOf('(b,c)') !== -1) {
            var fd2Instance = string_trim[i].split('(')[0];
            q2AspectTheme.push(fd2Instance)
        }
    }
    
    if (q2Exists===false) {
        eventInfo.push("None");
    } else {
        eventInfo.push(q2AspectTheme);
    }

    //push q3aspect
    var q3Exists = false;
    var q3AspectTheme = [];
    for (i in string_trim) {

        if (string_trim[i].indexOf('Component-of(c,') !== -1) {
            var part3 = string_trim[i].split(',')[1].slice(0, -1);
            q3AspectTheme.push(part3);
        } else if (string_trim[i].indexOf('q3') !== -1) {
            var q3Instance = string_trim[i].split('(')[0];
            q3Exists = true;
            q3AspectTheme.push(q3Instance)
        } else if (string_trim[i].indexOf('(c,d)') !== -1) {
            var fd3Instance = string_trim[i].split('(')[0];
            q3AspectTheme.push(fd3Instance)
        }
    }
    
    if (q3Exists===false) {
        eventInfo.push("None");
    } else {
        eventInfo.push(q3AspectTheme);
    }


    //push q4Aspect
    var q4Exists = false;
    var q4AspectTheme = [];
    for (i in string_trim) {

        if (string_trim[i].indexOf('Component-of(d,') !== -1) {
            var part4 = string_trim[i].split(',')[1].slice(0, -1);
            q4AspectTheme.push(part4);
        } else if (string_trim[i].indexOf('q4') !== -1) {
            var q4Instance = string_trim[i].split('(')[0];
            q4Exists = true;
            q4AspectTheme.push(q4Instance)
        }
    }
    
    if (q4Exists===false) {
        eventInfo.push("None");
    } else {
        eventInfo.push(q4AspectTheme);
    }

    // form: [all aspectual types]
    // will be used to determine height of svg
    // length: number of subevents
    var aspectSummary = [];

    for (i in eventInfo) {
        if (eventInfo[i]!="None") {
            aspectSummary.push(eventInfo[i][1]);
        }
    }

    eventInfo.push(aspectSummary);

    return eventInfo;

}


function draw (event) {

    var predcalc = event[7];
   
    var eventComponents = parsePredCalc(predcalc);

    // returns an array of all subevent aspect types, ex: ["UndAct", "UndAct", "IncrAcc"]
    var allAspects = eventComponents[4];

    // this returns a 1xN array when N=number of subevents and each element is the height of the subevent, ex: [80,80,100]
    var allHeights = getHeight(allAspects);

    var svgHeight = allHeights.reduce(function(acc, val) {
        return acc + val;
    }, 0);

    // GRABBING COREFERENCE LINKS
    // declared globally
    // events[4] has form: cut('Susan', 'knife', 'recipes', 'magazine')

    var a = event[6];
    str = a.substring(a.indexOf("(") + 1);
    str = str.replace(")", "");
    str = str.replace(/'/g, "");
    strList = str.split(",");

    // allParticipantsList is global
    for (p in strList) {
        allParticipantsList.push(strList[p].trim())
    }
    // ENDOF COREFERENCE LINKS SUBROUTINE
  

    // recordObjects keeps a history of the objects for drawing of FD lines
    var recordObjects = []

    //Start composing subevents
    for (i in allAspects) {

        var thisAspect = allAspects[i];

        // checking for extended or punctual Inherent State
        if (thisAspect === 'InhStPh') {
            if (allAspects[i-1] === 'CycAch' || allAspects[i-1] === 'DirAch') {
                thisAspect = 'InhStPhPunct';
            } else {
                thisAspect = 'InhStPhExt';
            }
        }

        // svgHeight is updated at end of for loop
        var thisHeight = svgHeight+40;

        var thisAspectHeight = allHeights[i];

        var objects = getObjects(thisHeight, x1);

        recordObjects.push(objects);

        var thisSubevent = objects[thisAspect];

        // global
        historySubevents.push(thisSubevent);

        if (i == 0) {
            var thisAxis = drawAxes(svgContainer, thisHeight, thisAspectHeight, true, x1);
        } else {
            var secondAxis = drawAxes(svgContainer, thisHeight, thisAspectHeight, false, x1);
        }

        var drawThisSubevent = createDiagram(svgContainer, thisSubevent);

        var subeventArray = eventComponents[i];

        var addingText = addText(svgContainer, thisSubevent, subeventArray);

        // only draw FD lines after the second subevent has been drawn
        if (i > 0) {

            var subEvent1 = recordObjects[i-1][allAspects[i-1]];


            if (allAspects[i] === 'InhStPh') {
                if (allAspects[i-1] === 'CycAch' || allAspects[i-1] === 'DirAch') {
                    var subEvent2 = objects['InhStPhPunct'];
                } else {
                    var subEvent2 = objects['InhStPhExt'];
                }
            } else {
                var subEvent2 = objects[allAspects[i]];
            }

            
            var drawForceDynamicLines = drawFDlines(svgContainer, subEvent1, subEvent2);

            // checking for PTH and drawing arrows
            var prevSubEvent = eventComponents[i-1];
            for (i in prevSubEvent) {
                if (prevSubEvent[i]==='FRC') {
                    var drawArrows = drawPathArrows(svgContainer, subEvent2);
                }
            }

            var addPthFrcLabels = addPathForceLabels(svgContainer, subEvent1, subEvent2, prevSubEvent);
            
        }

        svgHeight = svgHeight - thisAspectHeight;
    }

}


function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}



function prepareLinks4Coreference (historySubevents, indexCorefLinks, inner=true, sendToTop=false) {


    if (inner == true) {

        for (j in indexCorefLinks) {

            var dashedLines1 = [];
            var dashedLines2 = [];

            var e1 = historySubevents[indexCorefLinks[j][0]];
            var e2 = historySubevents[indexCorefLinks[j][1]];
            
            dashedLines1.push(e1["dotted-end"].slice(-1)[0]);

            // notice here that slice is not used-->the first set of coordinates of dotted-beg is used
            dashedLines2.push(e2["dotted-beg"][0]);

            var addLinesBetweenParticipants = addDashedPath(dashedLines1, dashedLines2, true, false);

        }
    } else {

        // these are for the outer links of the event that have coreferences
        for (k in indexCorefLinks) {
            //first the left hand side of the link
            var dashedLines1 = [];
            var dashedLines2 = [];

            // recall that index0 is the first subevent of the coreferring pair, i.e. index 0 of [0, 4]
            var e1 = historySubevents[indexCorefLinks[k][0]];

            // the left margin starting point is different for each event, determined by its own first y-coordinate
            var leftMarginPts = { "x": 0,  "y": e1["dotted-beg"][0]["y"]-x1/40};
            
            dashedLines1.push(leftMarginPts);
            dashedLines2.push(e1["dotted-beg"][0]);

            if (sendToTop == false) {
                var addLeftLines2Participants = addDashedPath(dashedLines1, dashedLines2, false, false);
            } else {
                var addLeftLines2Participants = addDashedPath(dashedLines1, dashedLines2, false, false);
            }

            // now the right hand side of the link

            var e2 = historySubevents[indexCorefLinks[k][1]];
            var rightMarginPts = { "x": 1000-x1/10,  "y": e2["dotted-end"].slice(-1)[0]["y"]/1.2};
            dashedLines1 = [];
            dashedLines2 = [];

            dashedLines1.push(e2["dotted-end"].slice(-1)[0])
            dashedLines2.push(rightMarginPts);

            if (sendToTop == false) {
                var addRightLines2Participants = addDashedPath(dashedLines1, dashedLines2, false, false);
            } else {
                var addRightLines2Participants = addDashedPath(dashedLines1, dashedLines2, false, true);
            }

        }
    }
}


function uniq(a) {
    // input: array with possible duplicates; output: array with no duplicates
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}


function drawCoreferenceLinks (historySubevents, allParticipantsList) {

    // console.log(historySubevents);
    //console.log(allParticipantsList);

    // an array of arrays for all items that have coreferences
    var indexCorefLinks = [];

    for (i in allParticipantsList) {

        var indexes = getAllIndexes(allParticipantsList, allParticipantsList[i]);

        // JSON.stringify is needed to check if an array exists within an array to eliminate duplicates
        if (indexes.length > 1 && JSON.stringify(indexCorefLinks).indexOf(JSON.stringify(indexes))==-1) {
            indexCorefLinks.push(indexes);
        }
    }

    // an array for those items that do not corefer with anything
    var indexesNotCoref = [];

    // first step: flatten array of indices that do corefer
    var merged = [].concat.apply([], indexCorefLinks);
    // second step: remove duplicates
    var unique = uniq(merged);

    var tempUnique = [];

    for (j=0; j<allParticipantsList.length; j++) {
        if (unique.indexOf(j)==-1) {
            tempUnique.push(j);
        }
    }

    // third step: making array of arrays so that each event is its own begin and end point
    for (k in tempUnique) {
        num = tempUnique[k];
        indexesNotCoref.push([num, num]);
    }

    var addCoreferOuterLinks = prepareLinks4Coreference(historySubevents, indexCorefLinks, false, false);
    var addInnerLinks = prepareLinks4Coreference(historySubevents, indexCorefLinks, true, false);
    

    //var addLinksNotCoref = prepareLinks4Coreference(historySubevents, indexesNotCoref, false, true);

    console.log(points4coreference);
    var addPoints = addPoints4Coreference(points4coreference);

}



