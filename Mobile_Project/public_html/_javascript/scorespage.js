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
    var sorted = new Array(arrSize).fill(0);
    
    alert(dataSet[2]);
    
    for(var i = 0; i > arrSize; i++){
        //if(sorted[i] < dataSet)
    }
    
}