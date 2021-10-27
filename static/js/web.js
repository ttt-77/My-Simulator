var getData;
var showHidden;
var numCheck;
var inputCheck;
var changeCube;
var calculateTime;

$( document ).ready(function() {
    const plot = document.getElementById('plot');
    var simTime;
    getData =function (type,paraA,paraB){
        const St =document.getElementById("St");
        $.post("/test",{ParaA: paraA,ParaB: paraB, Type:type},
            function(data, status){
            simTime = data['time'];
            St.innerHTML = 'Simulation time: '+ simTime + ' ms';
            var barData = [
                {
                    type: 'bar',
                    x: data['x'],
                    y: data['y']
                }
            ];
            Plotly.newPlot(plot, barData);
        },'json')
    }

    numCheck = function (paraA,paraB,type){
    if (type == 'Normal'){
        if (paraB < 0){
            alert("Standard deviation must be non-negative!");
            return false;
        }
    }else if(type == 'Uniform'){
        if (paraA > paraB){
            alert("Low must be less than or equal to High!");
            return false;
        }
    }else{
        if (paraA < 0){
            if (paraB < 0){
                alert("Shape and Scale must be non-negative!");
            }else {
                alert("Shape must be non-negative!");
            }
            return false;
        }else if(paraB < 0){
            alert("Scale must be non-negative!");
            return false;
        }
    }
    return true;
}
    inputCheck = function (paraA,paraB,type){
    if(paraA == "")  {
        if(paraB == "") {
            alert("Please enter first and second parameter!");
            return false;
        }else {
            alert("Please enter first parameter!");
            return false;
        }
    }else if(paraB == ""){
        alert("Please enter second parameter!");
        return false;
    }else{
        return numCheck(paraA,paraB,type);
    }
}
    $("#run_button").click(function() {
        var type = $("#Dis_Type").val();
        var paraA = $("#ParaA").val();
        var paraB = $("#ParaB").val();
        if (inputCheck(paraA,paraB,type)){
            getData(type,paraA,paraB);
        }
    })

    showHidden = function(){
        var type = $("#Dis_Type").val();
        const normA = document.getElementById("normA");
        const normB = document.getElementById("normB");
        const uniA = document.getElementById("uniA");
        const uniB = document.getElementById("uniB");
        const gammaA = document.getElementById("gammaA");
        const gammaB = document.getElementById("gammaB");
        switch (type){
            case 'Normal':
                normA.setAttribute('class','txt_show');
                normB.setAttribute('class','txt_show');
                uniA.setAttribute('class','txt_hid');
                uniB.setAttribute('class','txt_hid');
                gammaA.setAttribute('class','txt_hid');
                gammaB.setAttribute('class','txt_hid');
                break;
            case 'Uniform':
                normA.setAttribute('class','txt_hid');
                normB.setAttribute('class','txt_hid');
                uniA.setAttribute('class','txt_show');
                uniB.setAttribute('class','txt_show');
                gammaA.setAttribute('class','txt_hid');
                gammaB.setAttribute('class','txt_hid');
                break;
            case 'Gamma':
                normA.setAttribute('class','txt_hid');
                normB.setAttribute('class','txt_hid');
                uniA.setAttribute('class','txt_hid');
                uniB.setAttribute('class','txt_hid');
                gammaA.setAttribute('class','txt_show');
                gammaB.setAttribute('class','txt_show');
                break;
            default:
                normA.setAttribute('class','txt_show');
                normB.setAttribute('class','txt_show');
                uniA.setAttribute('class','txt_hid');
                uniB.setAttribute('class','txt_hid');
                gammaA.setAttribute('class','txt_hid');
                gammaB.setAttribute('class','txt_hid');
        }

    }

    $("#Dis_Type").change(function (){
        showHidden();
    })

    changeCube = function (totalTime,netTime){
        var OR = (simTime / totalTime * 200).toFixed(0);
        var GR = (netTime / totalTime * 200).toFixed(0);
        const lCube = document.getElementById("lCube");
        const rCube= document.getElementById("rCube");
        lCube.style.width = OR+'px';
        lCube.style.background = 'orange';
        rCube.style.width = GR+'px';
        rCube.style.background = 'green';
    }
    calculateTime =function (){
        const total = document.getElementById("Tl");
        const net = document.getElementById("No");
        const po = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.initiatorType =="xmlhttprequest"){
                  var totalTime = entry.duration.toFixed(2);
                  var netTime = (totalTime - simTime).toFixed(2);
                  total.innerHTML = 'Total latency: '+ totalTime + ' ms';
                  net.innerHTML = 'Network overhead: '+ netTime + ' ms';
                  changeCube(totalTime,netTime);
              }
            }
        });
        po.observe({type: 'resource'});
    }

    calculateTime();
})




