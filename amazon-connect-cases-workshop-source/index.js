const queueUrl = process.env.QueueUrl;
const deleteSQS = require('./sqs/deleteSQS.js') 
const sendSNS = require('./sns/sendSNS.js')
const caseInfo = require('./dynamodb/caseInfo.js')

exports.handler = async (event) => {
    // TODO implement
    console.info('received:', JSON.stringify(event) );
    
    for (let i = 0; i < event.Records.length; i++) {
        const eventJson = JSON.parse(event.Records[i].body)
        await deleteSQS.delete(queueUrl, event.Records[i].receiptHandle);
        await processRecords(eventJson);
    }
};

async function processRecords(eventJson){
    const eventId = eventJson.id;
    const eventType = eventJson.detail.eventType;

    if(eventType.includes('CASE.')){
        console.log('eventType', eventType);

        // Case Created Event
        if(eventType.includes('CASE.CREATED')){
            const caseId = eventJson.detail.case.caseId ? eventJson.detail.case.caseId : ''
            const templateId = eventJson.detail.case.templateId ? eventJson.detail.case.templateId : ''
            var createdDateTime = eventJson.detail.case.createdDateTime;

            console.log('Send SNS - CASE CREATED EVENT');
            var message = 'Case created with details - Case Id : ' + caseId;
    
            console.log('Send SNS MESSAGE - ' , message);
            await sendSNS.publish(message);
            console.log('After Send SNS  ');

            console.log('Adding row in Dynamodb Table ');
            await caseInfo.createCase(
                caseId, 
                templateId, 
                createdDateTime, 
                'open'
            );
            
        }

        // Case Update Event
        else if (eventType.includes('CASE.UPDATED')){

        }

        // Case Deleted
        else if (eventType.includes('CASE.DELETED')){

        }

    }
}
