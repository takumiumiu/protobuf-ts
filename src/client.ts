import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'
const PROTO_PATH = __dirname + '/helloworld.proto'

class Client {
    private client

    constructor() {
        var packageDefinition = protoLoader.loadSync(PROTO_PATH)
        var helloworld = grpc.loadPackageDefinition(packageDefinition).helloworld
        this.client = new helloworld.Greeter('0.0.0.0:4567', grpc.credentials.createInsecure())
    }

    public sayHello(s:String) {
        this.client.sayHello({ name: s}, (err, res) => {
            console.log("Response: "+res['message'])
        })
    }
}

const client = new Client()
client.sayHello("Hoge")