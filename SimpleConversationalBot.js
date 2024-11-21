var botId = "st-5ce0721c-5c5e-56b0-a0ba-cac19303c9a5";
var botName = "OrderManage";
var sdk = require("./lib/sdk");
const xlsx = require('node-xlsx').default;
const fs = require('fs');

/*
 * This is the most basic example of BotKit.
 *
 * It showcases how the BotKit can intercept the message being sent to the bot or the user.
 *
 * We can either update the message, or chose to call one of 'sendBotMessage' or 'sendUserMessage'
 */
module.exports = {
    botId   : botId,
    botName : botName,

    on_user_message : function(requestId, data, callback) {
        console.log("user",data.message)
        if (data.message === "Hi") {
            data.message = "Hello";
            console.log("user message",data.message);
            //Sends back 'Hello' to user.
            return sdk.sendUserMessage(data, callback);
        } else if(!data.agent_transfer){
            //Forward the message to bot
            return sdk.sendBotMessage(data, callback);
        } else {
            data.message = "Agent Message";
            return sdk.sendUserMessage(data, callback);
        }
    },
    on_bot_message  : function(requestId, data, callback) {
        if (data.message === 'hi') {
            data.message = 'The Bot says hello!';
            console.log("bot message",data.message)
        }

        //Sends back the message to user
       
        console.log("bot message",data.message)
        return sdk.sendUserMessage(data, callback);
    },
    on_agent_transfer : function(requestId, data, callback){
        return callback(null, data);
    },
    on_event : function (requestId, data, callback) {
        console.log("on_event -->  Event : ", JSON.stringify(data));
        if(data.event.completedTaskName === "welcome task"){
             console.log("completedTaskName --> ");
            data.context.session.BotUserSession.put("noOfconsecutiveFailedAttempts", 0);
            data.context.session.BotUserSession.put("errorValidation", false);
// data.context.session.BotUserSession.noOfconsecutiveFailedAttempts = 0;
// data.context.session.BotUserSession.errorValidation = false;
        }else{
        console.log("else -->")
        }
        return callback(null, data);
    },
    on_alert : function (requestId, data, callback) {
        console.log("on_alert -->  : ", data, data.message);
        return sdk.sendAlertMessage(data, callback);
    }

};


