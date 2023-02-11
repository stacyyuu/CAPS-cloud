const Chance = require('chance');
const clientSQS = require('@aws-sdk/client-sqs');

const { SQSClient } = clientSQS;
const REGION = 'us-west-2';
const sqsClient = new SQSClient({ region: REGION });

const chance = new Chance();

const QUEUES = {
  Pickup: 'https://sqs.us-west-2.amazonaws.com/639185967817/CAPS-Pickup.fifo',
};

module.exports = {
  sqsClient,
  chance,
  QUEUES,
};
