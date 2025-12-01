"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddingApi = void 0;
class EmbeddingApi {
    constructor() {
        this.name = 'embeddingApi';
        this.displayName = 'Embedding API';
        this.documentationUrl = 'https://docs.n8n.io/credentials/embeddingApi';
        this.properties = [
            {
                displayName: 'Host',
                name: 'host',
                type: 'string',
                default: 'http://10.24.10.153',
                description: 'Host address for the embeddings API (without /embeddings)',
                required: true,
            },
            {
                displayName: 'Port',
                name: 'port',
                type: 'number',
                default: 8081,
                description: 'Port for the embeddings API',
                required: true,
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                description: 'API key for the service (optional)',
                required: false,
            },
        ];
    }
}
exports.EmbeddingApi = EmbeddingApi;
//# sourceMappingURL=EmbeddingApi.credentials.js.map
