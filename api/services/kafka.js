import { Kafka } from 'kafkajs';
import { reassembleVideo } from './reassemble.js';
import { errorHandler  } from '../utils/error.js'
// Import dotenv as the default export
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import transcodeVideo from './transcode.js';
// Initialize __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../../client/public/transcode');

const kafka = new Kafka({
  clientId: 'video-transcode-service',
  brokers: [process.env.KAFKA_SECRET],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
  },
  sasl: {
    username: process.env.KAFKA_USER,
    password: process.env.KAFKA_PASS,
    mechanism: "plain",
  },
});

let producer = null;

export async function createProducer() {
  if (producer) return producer;
  const _producer = kafka.producer();
  await _producer.connect();
  producer = _producer;
  return producer;
}

export async function produceMessage(message) {
  const producer = await createProducer();
  await producer.send({
    topic: 'video-chunks-uploaded',
    messages: [{ key: message.uniqueId, value: JSON.stringify(message) }],
  });
  return true;
}

let consumer;

// Initialize Kafka consumer and keep it running
export async function initializeKafkaConsumer() {
  consumer = kafka.consumer({ groupId: 'video-transcode-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'video-chunks-uploaded', fromBeginning: true });

  console.log('Kafka consumer connected and listening for messages...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const messageValue = message.value.toString();
      const parsedMessage = JSON.parse(messageValue);

      const { uniqueId, chunkPaths } = parsedMessage;

      // Call the video reassembly function here
      const file_name=await reassembleVideo(uniqueId, chunkPaths);
      console.log(uniqueId, chunkPaths);
      let inputFilePath = path.join(__dirname, `../output/${file_name}`); 
      if (fs.existsSync(inputFilePath)) {
        console.log('File exists:', inputFilePath);
        // Proceed with processing the file
       await transcodeVideo(inputFilePath, outputDir);
    } else {
        console.log('File does not exist:', inputFilePath);
        next(errorHandler(404,"File not found"));
    }
      console.log(`Processed message with uniqueId: ${file_name}`);

    },
  });
}

initializeKafkaConsumer().catch(console.error);
