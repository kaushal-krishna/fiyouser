import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import authService from "./services/auth.service.js";
import userService from "./services/user.service.js";

const loadProto = (protoFile) =>
  grpc.loadPackageDefinition(
    protoLoader.loadSync(path.resolve(`src/proto/${protoFile}.proto`), {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    })
  );

const services = {
  auth: loadProto("auth").auth.AuthService,
  user: loadProto("user").user.UserService,
};

const server = new grpc.Server();

server.addService(services.auth.service, authService);
server.addService(services.user.service, userService);

const FIYOUSER_SERVICE_URL =
  process.env.FIYOUSER_SERVICE_URL || "localhost:8001";

server.bindAsync(
  FIYOUSER_SERVICE_URL,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log(`🚀 gRPC Server running at ${FIYOUSER_SERVICE_URL}`);
  }
);

export default server;
