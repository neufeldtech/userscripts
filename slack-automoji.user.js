// ==UserScript==
// @name         Slack Automoji
// @version      0.1
// @description  Automatically react to Slack messages
// @updateURL
// @author       Jordan Neufeld <jordan@neufeldtech.com>
// @match        https://prairietech.slack.com/*
// @connect      slack.com
// @grant        none
// ==/UserScript==
var mySocket;
$.ajax(`https://slack.com/api/rtm.connect?token=${TS.boot_data.api_token}&pretty=1`)
  .error(function (err) {
    console.error(`Could not connect tampermonkey socket to slack API ${JSON.stringify(err)}`);
  })
  .done(function (res) {
    if (res && res.ok === true) {
      console.log('successfully connected tampermonkey socket!');
      mySocket = new WebSocket(res.url);
      mySocket.onmessage = function (msg) {
        var message = JSON.parse(msg.data);
        if (message.type === "message") {
          //console.log(message,TS.members.getMemberById(message.user).name, message.text);
          // REACT WITH A SMILE TO EVERYTHING
          var postData = {
            "name": "grinning",
            "channel": message.channel,
            "timestamp": message.ts,
            "token": TS.boot_data.api_token
          };


          $.ajax({
            type: "post",
            url: "https://slack.com/api/reactions.add",
            data: postData,
            contentType: "application/x-www-form-urlencoded",
            success: function (responseData, textStatus, jqXHR) {
              //                console.log("data saved");
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
            }
          });
        }
      };
    } else {
      console.error('had an error connecting to the RTM API: ' + JSON.stringify(res));
    }
  });