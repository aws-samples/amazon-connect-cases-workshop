const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
	apiVersion: '2012-08-10',
	sslEnabled: false,
	paramValidation: false,
	convertResponseTypes: false
});
const tableName = process.env.CasesTable;

const caseInfo = {
    async createCase(caseId, templateId, createdDateTime, status) {
        var inputTextToDB = '{"caseId": "' + caseId +
            '","templateId": "' + templateId +
            '","createdDateTime": "' + createdDateTime +
            '","status" : "' + status + 
            '"}';
    
        var paramsIns = {
            TableName: tableName,
            Item: JSON.parse(inputTextToDB)
        };
        
        console.log('dynamodbEvent saveCaseUpdate paramsIns : ' , paramsIns);
        const response = await docClient.put(paramsIns).promise();
        return response;
    }
}
module.exports = caseInfo;