const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'eu-central-1',
});

export default function handler(request, response) {
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  const params = {
    TableName: 'mk-dynamodb-explo-simple-pk',
    Item: {
      'id' : { S: request.query.id },
      'something' : { S: request.query.something },
    },
  };

  ddb.putItem(params, (err, data) => {
    if (err) {
      console.log('Error', err);
      response.status(500);
      return
    }

    console.log('Item created', data);
    response.status(201).json({ item: params.Item });
  });
}

