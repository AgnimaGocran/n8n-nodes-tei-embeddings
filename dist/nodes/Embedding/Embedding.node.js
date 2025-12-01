"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embedding = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class CustomEmbeddingsImplementation {
    constructor(options) {
        this.apiUrl = options.apiUrl;
        this.apiKey = options.apiKey;
        this.helpers = options.helpers;
        this.logger = options.logger;
        this.node = options.node;
    }
    async embedQuery(text) {
        this.logger.info(`Embedding query: ${text.substring(0, 50)}...`);
        const embeddings = await this.embedDocuments([text]);
        return embeddings[0];
    }
    async embedDocuments(texts) {
        this.logger.info(`Embedding ${texts.length} documents via Tei`);
        if (!Array.isArray(texts) || texts.length === 0) {
            throw new n8n_workflow_1.NodeApiError(this.node, {
                message: 'At least one text input is required for embeddings',
            });
        }
        try {
            const payloadInput = texts.length === 1 ? texts[0] : texts;
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${this.apiUrl}/embeddings`,
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
                },
                body: {
                    input: payloadInput,
                },
            });
            const collectEmbeddings = (payload) => {
                const vectors = [];
                const visit = (entry) => {
                    if (!entry) {
                        return;
                    }
                    if (Array.isArray(entry)) {
                        if (entry.length > 0 && typeof entry[0] === 'number') {
                            vectors.push(entry);
                            return;
                        }
                        for (const item of entry) {
                            visit(item);
                        }
                        return;
                    }
                    if (typeof entry === 'object') {
                        if (Array.isArray(entry.embedding)) {
                            vectors.push(entry.embedding);
                        }
                        if (Array.isArray(entry.data)) {
                            for (const item of entry.data) {
                                visit(item);
                            }
                        }
                    }
                };
                visit(payload);
                return vectors;
            };
            const embeddings = collectEmbeddings(response);
            if (embeddings.length === 0) {
                throw new n8n_workflow_1.NodeApiError(this.node, {
                    message: 'Tei embeddings response did not include any vectors',
                });
            }
            this.logger.info(`Successfully generated ${embeddings.length} embedding vectors`);
            return embeddings;
        }
        catch (error) {
            this.logger.error(`Failed to generate embeddings: ${error.message}`);
            throw new n8n_workflow_1.NodeApiError(this.node, {
                message: `Failed to generate embeddings: ${error.message}`,
            });
        }
    }
}
class Embedding {
    constructor() {
        this.description = {
            displayName: 'Tei Embeddings Node',
            name: 'teiEmbedding',
            icon: 'file:embedding.svg',
            group: ['transform'],
            version: 1,
            codex: {
                categories: ['AI', 'Language Models'],
                subcategories: {
                    AI: ['Embeddings'],
                },
                resources: {
                    primaryDocumentation: [
                        {
                            url: 'https://github.com/AgnimaGocran/n8n-nodes-tei-embeddings/blob/main/README.md',
                        },
                    ],
                },
            },
            description: 'Generate text embeddings via Tei embeddings API (embedding sub-node)',
            defaults: {
                name: 'Tei Embeddings',
            },
            inputs: [],
            outputs: ["ai_embedding"],
            outputNames: ['Embeddings'],
            credentials: [
                {
                    name: 'embeddingApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Node Type',
                    name: 'nodeType',
                    type: 'hidden',
                    default: 'embedding',
                    required: true,
                },
            ],
        };
    }
    get type() {
        return 'embedding';
    }
    async supplyData(itemIndex) {
        this.logger.info('Supplying Tei Embeddings implementation');
        const credentials = await this.getCredentials('embeddingApi');
        const host = credentials.host;
        const port = credentials.port;
        const apiKey = credentials.apiKey;
        if (!host || !port) {
            throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                message: 'Host and port are required',
            });
        }
        const apiUrl = `${host}:${port}`;
        const embeddings = new CustomEmbeddingsImplementation({
            apiUrl,
            apiKey,
            helpers: this.helpers,
            logger: this.logger,
            node: this.getNode(),
        });
        return {
            response: embeddings,
        };
    }
    async execute() {
        return [[]];
    }
}
exports.Embedding = Embedding;
//# sourceMappingURL=Embedding.node.js.map
