const amqp = require("amqplib");
const { uri, workQueueDefault } = require("../config");

class rabbitQueue {
  async connect() {
    try {
      const conn = await amqp.connect(uri);
      this.channel = await conn.createChannel();
    } catch (e) {
      console.log(e);
    }
  }

  async sendToQueue(msg, workQueue) {
    await this.connect();

    setInterval(async () => {
      let rand = Math.floor(Math.random() * ( 5 - 1 + 1 ) + 1);
      let work = `${workQueue}${rand}`;

      const result = await this.channel.assertQueue(work, { durable: true });

      const send = JSON.stringify({ msg: `${msg} :${rand}` });
      await this.channel.sendToQueue(work, Buffer.from(send), { persistent: true });

      console.log(`##### Job sent successfully #####`);
    }, 2500);
  }

  async consume(workQueue) {
    await this.connect();

    [1, 2, 3, 4, 5].map(async v => {
      let work = `${workQueue}${v}`;
      const result = await this.channel.assertQueue(work);

      await this.channel.consume(work, message => {
        let rand = Math.floor(Math.random() * ( 8000 - 1 + 1 ) + 1);
        console.log('\x1b[36m%s\x1b[0m',`SLEEP INIT: ${rand}`);
        this.sleep(rand, function() {
          console.log('\x1b[31m%s\x1b[0m',`***** SLEEP FINISH: ${rand}`);
        });

        const input = JSON.parse(message.content.toString());
        this.channel.ack(message);
        console.log(`Recieved job(${v}): ${input.msg}`);
      });
    });
  }

  sleep(time, callback) {
    let stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
      ;
    }
    callback();
  }
}

module.exports = new rabbitQueue();
