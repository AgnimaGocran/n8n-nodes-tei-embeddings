# n8n Tei Embeddings Node

[![Version](https://img.shields.io/npm/v/n8n-nodes-custom-embedding.svg)](https://www.npmjs.com/package/n8n-nodes-custom-embedding)
[![Downloads](https://img.shields.io/npm/dm/n8n-nodes-custom-embedding.svg)](https://www.npmjs.com/package/n8n-nodes-custom-embedding)

**n8n Tei Embeddings Node** - embedding provider for n8n AI nodes that proxies requests to your Tei embeddings service.

## ✨ Features

- 💠 **Tei Embeddings sub-node** - provides embeddings for AI models and Vector Store nodes
- 🔌 **Custom API Integration** - point the node to your Tei instance
- 📡 **Single `/embeddings` POST endpoint** - send one string or an array of strings via the `input` field
- 📊 **Streaming-friendly output parsing** - handles Tei list responses automatically
- ⚙️ **Configurable Host and Port** through Credentials
- 📝 **Logging and Error Handling**
- 🎨 **Modern UI** with conditional parameter display

## 🎯 Node Type

### Tei Embeddings Node (Sub-node)
- **Purpose**: Embedding provider for AI models and Vector Store nodes
- **Type**: `embedding` (special type for n8n AI integration)
- **Inputs**: None (sub-node)
- **Outputs**: `ai_embedding` (for AI integration)
- **Method**: `supplyData()` - provides embedding functionality to parent nodes

## 🚀 Installation

### For n8n 1.0+

1. **Install the package:**
   ```bash
   npm install n8n-nodes-custom-embedding
   ```

2. **Restart n8n**

3. **Configure Credentials** (see Credentials section below)

### For Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AgnimaGocran/n8n-nodes-tei-embeddings.git
   cd n8n-nodes-custom-embedding
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## 🔑 Credentials

### EmbeddingApi

Configure connection to your API service:

- **Host** (required) - address of your API server (default: `http://10.24.10.153`)
- **Port** (required) - port of API server (default: `8081`)
- **API Key** (optional) - key for authentication

## 📋 Node Parameters

### Tei Embeddings Node
This node has no configurable parameters as it's designed to work as an embedding provider for other nodes.

## 💡 Usage Examples

### Example 1: Using the Tei Embeddings Node with a Vector Store

1. Add a **Vector Store** node (e.g., Supabase Vector Store).
2. In the Vector Store node, look for the **Embedding** connection.
3. Select **Tei Embeddings Node** from the dropdown.
4. Configure your credentials.
5. The Vector Store will automatically use your Tei Embeddings service.

### Example 2: Single Text Request to `/embeddings`

```bash
curl -X POST http://10.24.10.153:8081/embeddings \
  -H "Content-Type: application/json" \
  -d '{"input": "Hello, world!"}'
```

**Response:**
```json
[
  {
    "object": "list",
    "data": [
      {
        "object": "embedding",
        "embedding": [
          0.02621444,
          -0.014602257,
          -0.07529701,
          -0.057053782,
          0.07777279,
          -0.03792118,
          -0.003740206,
          0.10274578,
          0.07138724
        ],
        "index": 0
      }
    ],
    "model": "intfloat/multilingual-e5-small",
    "usage": {
      "prompt_tokens": 4,
      "total_tokens": 4
    }
  }
]
```
*Embedding array truncated for brevity.*

### Example 3: Multiple Texts Request to `/embeddings`

```bash
curl -X POST http://10.24.10.153:8081/embeddings \
  -H "Content-Type: application/json" \
  -d '{"input": ["First document", "Second document"]}'
```

**Response Highlights:**

- The API returns a top-level array with `object: "list"` entries.
- Each entry contains a `data` array with `embedding` objects for each provided text.
- `usage.prompt_tokens` reflects the total tokens used for the batch.

## 🏗️ Project Structure

```
n8n-nodes-custom-embedding/
├── nodes/
│   └── Embedding/                    # Tei Embeddings sub-node
│       ├── Embedding.node.ts         # Sub-node implementation
│       └── embedding.svg             # Node icon
├── credentials/
│   └── EmbeddingApi.credentials.ts  # API credentials
├── dist/                            # Compiled JavaScript files
├── examples/                        # Usage examples
├── package.json                     # Project configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🔧 Development

### Building the Project

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Build with icon copying
npm run build
```

### Project Architecture

The project centers around a single Tei Embeddings node that implements the `INodeType` interface with `type: 'embedding'`. The node provides its embedding implementation through `supplyData()` so it can be reused by AI and Vector Store nodes without additional configuration.

##  API Endpoint

### POST /embeddings

Generates embeddings for one or more texts via the Tei service.

**Request Body:**
```json
{
  "input": "Single text or an array of texts"
}
```

**Response:**
```json
[
  {
    "object": "list",
    "data": [
      {
        "object": "embedding",
        "embedding": [0.026, -0.014, -0.075, -0.057, 0.077],
        "index": 0
      }
    ],
    "model": "intfloat/multilingual-e5-small",
    "usage": {
      "prompt_tokens": 4,
      "total_tokens": 4
    }
  }
]
```
*Embedding array truncated for brevity.*

## 🧪 Testing

### API Testing

1. **Check API availability:**
   ```bash
   curl -X GET http://10.24.10.153:8081/health
   ```

2. **Test embedding generation:**
   ```bash
   curl -X POST http://10.24.10.153:8081/embeddings \
     -H "Content-Type: application/json" \
     -d '{"input": ["hello", "hi"]}'
   ```

### Testing in n8n

1. Create a new workflow
2. Add "Tei Embeddings Node"
3. Configure Credentials
4. Test with simple text

## 🔧 Troubleshooting

### Common Issues

1. **"Host and port are required"**
   - Check Credentials settings
   - Ensure Host and Port are specified

2. **"Connection refused"**
   - Check API server availability
   - Ensure port is open

3. **"Invalid response from API"**
   - Check API response format
   - Ensure API returns correct structure

### Logs

Enable logging in n8n for debugging:
```bash
n8n start --log-level debug
```

##  Useful Links

- [n8n 1.0 Migration Guide](https://docs.n8n.io/migrate/)
- [Custom Nodes Documentation](https://docs.n8n.io/integrations/creating-nodes/)
- [README_local.md](README_local.md) - Local API documentation
- [INSTALL.md](INSTALL.md) - Detailed installation instructions

## 🤝 Contributing

We welcome contributions to the project! Please:

1. Fork the repository
2. Create a branch for new feature
3. Make changes
4. Create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ‍ Author

**24auru** - [GitHub](https://github.com/24auru)

---

**Version:** 0.1.2  
**Last Updated:** December 2025
