"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = exports.nodes = void 0;
const Embedding_node_1 = require("./nodes/Embedding/Embedding.node");
const EmbeddingApi_credentials_1 = require("./credentials/EmbeddingApi.credentials");
exports.nodes = [
    Embedding_node_1.Embedding,
];
exports.credentials = [
    EmbeddingApi_credentials_1.EmbeddingApi,
];
//# sourceMappingURL=index.js.map
