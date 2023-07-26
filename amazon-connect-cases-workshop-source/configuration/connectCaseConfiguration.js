const { ConnectCasesClient, PutCaseEventConfigurationCommand,} = require("@aws-sdk/client-connectcases");
const region = process.env.AWS_REGION;
const connectCasesClient = new ConnectCasesClient({ region: region});

const connectCaseConfiguration = {
  async updateCaseConfiguration(domainId) {
    var input = {};
    input.domainId = domainId;
    var eventBridge = {};

    eventBridge.enabled = true;

    input.eventBridge = eventBridge;

    console.log('input',JSON.stringify(input));

    const command = new PutCaseEventConfigurationCommand(input);
    await connectCasesClient.send(command);

    console.log('completed');
  }
};
module.exports = connectCaseConfiguration;
