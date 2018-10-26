// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_old_pb = require('./service.old_pb.js');

function serialize_ExampleRequest(arg) {
  if (!(arg instanceof service_old_pb.ExampleRequest)) {
    throw new Error('Expected argument of type ExampleRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ExampleRequest(buffer_arg) {
  return service_old_pb.ExampleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ExampleResponse(arg) {
  if (!(arg instanceof service_old_pb.ExampleResponse)) {
    throw new Error('Expected argument of type ExampleResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_ExampleResponse(buffer_arg) {
  return service_old_pb.ExampleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ExampleService = exports.ExampleService = {
  exampleCall: {
    path: '/Example/ExampleCall',
    requestStream: false,
    responseStream: true,
    requestType: service_old_pb.ExampleRequest,
    responseType: service_old_pb.ExampleResponse,
    requestSerialize: serialize_ExampleRequest,
    requestDeserialize: deserialize_ExampleRequest,
    responseSerialize: serialize_ExampleResponse,
    responseDeserialize: deserialize_ExampleResponse,
  },
};

exports.ExampleClient = grpc.makeGenericClientConstructor(ExampleService);
