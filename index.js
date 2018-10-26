var messages = require('./service_pb');
var services = require('./service_grpc_pb');
var oldMessages = require('./service.old_pb');
var oldServices = require('./service.old_grpc_pb');

var grpc = require('grpc');


function handleExampleCall(call) {

    var counter = 0;

    var interval = setInterval(() => {

        if (call.cancelled) {
            console.log("[server] call cancelled, ending")
            call.end()
            clearInterval(interval)
            return
        }

        counter = counter + 1


        var reply = new messages.ExampleResponse();
        var answer = new messages.Answer();
        answer.setAnswer("asnwer " + counter)
        reply.setAnswer(answer)

        console.log("[server] sending: " + reply.getAnswer().getAnswer())
        call.write(reply)

    }, 1000)

}


var server = new grpc.Server();
server.addService(services.ExampleService, {exampleCall: handleExampleCall});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();

console.log("server started on 0.0.0.0:50051");


// notice client is build against 'old' incompatible version of protos
var client = new oldServices.ExampleClient('localhost:50051',
    grpc.credentials.createInsecure());

var request = new oldMessages.ExampleRequest();

var stream = client.exampleCall(request);

stream.on("data", (data, err) => {
    console.log("[client] received: " + data.getAnswer())
})

stream.on("end", () => {
    console.log("[client] ended")
})

stream.on("error", (err) => {
    console.log("[client] error: "+err)
})

setTimeout(() => stream.cancel(), 4000)