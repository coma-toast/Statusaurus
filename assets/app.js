var url='https://connect.datto.net/ajax/queue/status?column=default&sort=default&queueID=93'
var myObj
var status = ''
var slacker = ''
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
    var agentList = response.agents
    for (var agent in agentList) {
        if (agentList[agent].name == usersName) {
            slacker = agentList[agent].name
            status = agentList[agent].status;
        }
    }
    $('#phoneStatus').html(status)
    getSlackStatus(slacker)
    changeSlackStatus(status)
}

function getSlackStatus(slackUser) {
    var configData = {
        method: 'GET',
        // contentType: 'application/json',
        url: '/users.profile.get',
        data: {
            user: "U3CA8TSUS",
        },
        success: statusGetSuccess,
        complete: statusGetComplete,
    }
    slack.call(configData)

    // $('#functionName').html(slackStatus)

}
const test = function() {
  console.log("test");
  // this is calling over and over as fast as possible,
  // not respecting setTimeout. to be looked into...
  // statusGetComplete()
}

const statusGetSuccess = function(data) {
    console.log(data);
    var currentStatus = data.profile.status_text
    $('#currentStatus').html(currentStatus)
}
const statusGetComplete = function(data) {
    // setTimeout(getSlackStatus(slacker), 100000);
    setTimeout(test(), 10000)
}

function changeSlackStatus(status) {
    // console.log(status);
    var configData = {
        method: 'POST',
        contentType: 'application/json',
        url: '/users.profile.set',
        data: {
            user: "U3CA8TSUS",
            profile: {
                status_text: status,
                status_emoji: ":phone:"
            },
        },
        success: statusSuccess,
        complete: statusComplete,
    }
    slack.status(configData)
}

const statusSuccess = function(data) {
    console.log(data);
}
const statusComplete = function(data) {
    // console.log(data);
}
