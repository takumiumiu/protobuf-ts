import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

const PROTO_PATH = __dirname + '/helloworld.proto'

class Server {
    private server = new grpc.Server()
   
    constructor() {
        var packageDefinition = protoLoader.loadSync(PROTO_PATH)
        var helloworld = grpc.loadPackageDefinition(packageDefinition).helloworld

        this.server.addService(helloworld.Greeter.service, { sayHello: this.sayHello })
        this.server.bind('0.0.0.0:4567', grpc.ServerCredentials.createInsecure())
    }

    public start() {
        this.server.start()
    }

    private sayHello(call, callback) {
        console.log("Call: " + call.request.name)
        callback(null, { message: 'Hello ' + call.request.name })
    }
}

const server = new Server()
server.start()
