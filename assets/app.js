var url='https://connect.datto.net/ajax/queue/status?column=default&sort=default&queueID=93'
var myObj
var status = ''
var slackToken = '';


function sendAjax() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this);
            myObj = JSON.parse(this.responseText);
            // console.log(myObj);
            //document.getElementById("demo").innerHTML = myObj.agents;
            pullStatus(myObj)
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send()
}

sendAjax()


function pullStatus (response) {
    // console.log(response);
    var agentList = response.agents
    // console.log(agentList);
    for (var agent in agentList) {
        //console.log(agentList[agent].name);
        if (agentList[agent].name == 'Jason Dale') {
            console.log(agentList[agent]);
            // console.log("its me");
            status = agentList[agent].status;
            console.log(status);
            $('#demo').html(status)
            changeSlackStatus(status)
        }
    }
}

function changeSlackStatus(status) {
    console.log(status);
    var configData = {
        method: 'POST',
        url: '/users.profile.set',
        data: {
            user: "U3CA8TSUS",
            profile: {
                status_text: status,
                status_emoji: ":mountain_railway:"
            },
        },
        success: statusSuccess,
        complete: statusComplete,
        }
        console.log(slack.status(configData))
}

const statusSuccess = function() {
    console.log("success");
}
const statusComplete = function() {
    console.log('complete');
}
