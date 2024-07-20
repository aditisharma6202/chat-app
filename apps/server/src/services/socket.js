"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var SocketService = /** @class */ (function () {
    function SocketService() {
        console.log("Init socket server");
        this._io = new socket_io_1.Server();
    }
    Object.defineProperty(SocketService.prototype, "io", {
        get: function () {
            return this._io;
        },
        enumerable: false,
        configurable: true
    });
    return SocketService;
}());
exports.default = SocketService;
