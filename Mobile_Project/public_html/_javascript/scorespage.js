google.charts.load('current', {packages:['corechart', 'bar']});
google.charts.setOnLoadCallback(init);

var dataSet = new Array();

function init(){
    //[Grab Data]
    $.ajax({
        type:'GET',
        url:'_xml/players.xml',
        dataType: 'xml',
        success: parseXML,
        error: function(){
            $('#chart_scores').text('XML File not Loaded!');
        }
    });
}

function parseXML(xml){
    //[Variables]
    var arrPos = 0;
    var arrSize = $(xml).find('player').size();
    var arrName = new Array(arrSize).fill("");
    var arrScore = new Array(arrScore).fill(0);
    
    //[Load into DataSet]
    $(xml).find('player').each(function(){
        arrName[arrPos] = $(this).attr('name');
        arrScore[arrPos] = parseInt($(this).attr('score'));
        arrPos++;
    });
    for(var i = 0; i < arrName.length; i++){
        dataSet.push([arrName[i], arrScore[i]]);
    }
    
    drawChart();
    listScores();
}

$(window).resize(function(){
    drawChart();
});

function drawChart(){
    //[Options]
    var options = {
        colors: ['#00FFF7','#F7FF00','#EB0000'],
        title: "Top Players"
    };
    
    //[Draw]
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Score');
    data.addRows(dataSet);
    data.sort({column: 1, desc: false});
    
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_scores'));
    chart.draw(data, options);
    listScores();
}

function listScores(){
    //Array to sort players from XML
    var arrSize = dataSet.length;
    var li = "";
    dataSet.sort(sortArray);
    
    //Make List
    for(var i = 0; i < arrSize; i++){
        li += "<li class='pItem'>" + dataSet[i] + "</li>"; 
    };
    var ul = "<ol class='pList'>" + li + "</ol>";
    
    //Append to Div
    $('#sNamesBlock').remove(".pList").append(ul);
}

function sortArray(a, b) {
    if (b[1] === a[1]) {
        return 1;
    }
    else {
        return (b[1] < a[1]) ? -1 : 1;
    }
}