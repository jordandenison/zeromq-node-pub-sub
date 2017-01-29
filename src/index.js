const { random } = require('lodash')
const zmq = require('zmq')
const publisher = zmq.socket('pub')
const subscriber = zmq.socket('sub')

const PORT = process.env.PORT
const targetPorts = process.env.TARGET_PORTS.split(',')

const startSending = pub => {
  const msg = `test ${Math.random()}`
  console.log(`publishing: ${msg}`)
  pub.send(msg)
  setTimeout(() => startSending(pub), random(50, 500))
}

publisher.bind(`tcp://*:${PORT}`, err => {
  if (err) { return console.log(err) }

  console.log(`Publisher listsening on ${PORT}…`)
  startSending(publisher)
})

const subscribers = []
targetPorts.forEach((port, i) => {
  subscriber.connect(`tcp://localhost:${port}`)
  console.log('connect', `tcp://localhost:${port}`)
  subscriber.subscribe('')

  subscriber.on('message', msg => {
    console.log('received ', msg.toString())
  })
})

process.on('SIGINT', () => {
  console.log('Shutting down...')
  publisher.close()
  subscribers.forEach(subscriber => subscriber.close())
  process.exit(0)
})
