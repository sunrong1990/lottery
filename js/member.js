var member =[]
// var member = [
//     {
//         "id": "s00346574",
//         "name": "孙荣"
//     },
//     {
//         "id": "s00346574",
//         "name": "王倩"
//     },
//     {
//         "id": "m",
//         "name": "马林海"
//     }
// ]

function GetMemberList() {
    $.ajaxSettings.async = false;
    $.getJSON("member/member.json", function(json) {
        console.log(json); // this will show the info it in firebug console
        member = json;
    });
    // readTextFile("../member/member.csv");
    // readTextFile("file:///D:/test.txt");
    // readTextFile("file:///D:/member.csv");
    var input = document.querySelector('#input');
    input.addEventListener('change', function (e) {
        handFile(e.target.files[0]);
    });
}

// function readTextFile(file) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function () {
//         if (rawFile.readyState === 4) {
//             if (rawFile.status === 200 || rawFile.status == 0) {
//                 var allText = rawFile.responseText;
//                 console.log(allText);
//                 alert(allText);
//             }
//         }
//     }
//     // rawFile.send(null);
// }
// function readTextFile1(file) {
//     var xhr = new XMLHttpRequest(),
//         okStatus = document.location.protocol === "file:" ? 0 : 200;
//     xhr.open('GET', file, false);
//     xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
//     // xhr.send(null);
//     console.log(xhr.responseText);
//     return xhr.status === okStatus ? xhr.responseText : null;
// }

function handFile(file) {
    console.log('hand');
    var newMember = [];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
        var data = e.target.result;
        console.log(data);
        splitdate = data.split(/\s+/);
        console.log(splitdate.length);
        var arr1 = new Array();
        var arr2 = new Array();
        var id = new Array();
        var name = new Array();
        for (var i = 0; i < splitdate.length; i++) {
            var data = splitdate[i].split(",");
            arr1.push(data[0]);
            arr2.push(data[1]);
        }
        for (var i = 1; i < arr1.length - 1; i++) {
            id.push(arr1[i]);
        }
        for (var i = 1; i < arr2.length - 1; i++) {
            name.push(arr2[i]);
        }
        for (var i = 0; i < name.length; i++) {
            var json = {};
            json.id = id[i];
            json.name = name[i];
            console.log(json);
            newMember.push(json);
        }
        console.log(newMember);

        var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newMember));
        var downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href", datastr);
        downloadAnchorNode.setAttribute("download", 'member.json')
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
}




