var AWS = require('aws-sdk');
const region = process.env.AWS_REGION;
AWS.config.update({ region: region });

var snsClient = new AWS.SNS({ apiVersion: '2010-03-31' });
const CasesNotificationTopic = process.env.CasesNotificationTopic;

const snsMessage = {
    async publish(message) {

        // Create publish parameters
        var params = {
            Message: message,
            TopicArn: CasesNotificationTopic
        };

        var snsOutput = await snsClient.publish(params).promise();
        console.log(snsOutput);
    }
}
module.exports = snsMessage;