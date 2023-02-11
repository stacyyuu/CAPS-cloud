const {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require('@aws-sdk/client-sqs');
const { sqsClient, chance, QUEUES } = require('../utils');

function delivered(orderId) {
  console.log('Driver finished delivery.', orderId);
  handlePickup();
}

async function handlePickup() {
  try {
    const received = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: QUEUES.Pickup,
      })
    );
    if (received.Messages?.length > 0) {
      await sqsClient.send(
        new DeleteMessageCommand({
          QueueUrl: QUEUES.Pickup,
          ReceiptHandle: received.Messages[0].ReceiptHandle,
        })
      );
      const payload = JSON.parse(received.Messages[0].Body);
      console.log('Driver received a pickup event!', payload);
      setTimeout(
        () => delivered(payload.orderId),
        chance.integer({ min: 4500, max: 5500 })
      );
    } else {
      console.log('No pickups ready.');
      setTimeout(handlePickup, 5000);
    }
  } catch (error) {
    console.error('Failed to handlePickup,', error);
  }
}

module.exports = { handlePickup };
