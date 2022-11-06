const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'eu-central-1',
});

export default function handler(request, response) {
  const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

  ddb.listTables({ Limit: 10 }, (err, data) => {
    if (err) {
      console.log('Error', err);
      response.status(500);
      return
    }

    console.log('Table names are ', data.TableNames);
    response.status(200).json({ tables: data.TableNames });
  });


}

