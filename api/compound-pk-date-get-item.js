const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'eu-central-1',
});

export default function handler(request, response) {
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  const params = {
    TableName: 'mk-dynamodb-explo-compound-pk-date',
    Key: {
      'id' : { S: request.query.id },
      'occurred_at' : { S: request.query.date }, // remove this to trigger validation error
    },
    ProjectionExpression: 'something',
  };

  ddb.getItem(params, (err, data) => {
    if (err) {
      console.log('Error', err);
      response.status(500);
      return
    }

    console.log('Item received', data);
    response.status(200).json({ item: data.Item });
  });
}

