---
title: "Realtime Delivery: Websockets and Server-Sent Events"
date: "2025-03-01"
---

### Introduction
If you've ever used telegram, tracked a grabfood delivery on your iphone lockscreen, or was staring at the $ETH chart diligently while candlesticks painted the chart red in a matter of seconds, you've interacted with real-time web technologies. Two common ways to achieve this are **WebSockets** and **Server-Sent Events (SSE)**. Both allow servers to send updates to clients without needing the client to repeatedly ask for new data.

### WebSockets
[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) provide full-duplex communication, meaning both the client and server can send messages to each other at any time. This makes them ideal for real-time chat applications, multiplayer games, and collaborative editing tools.

#### How WebSockets Work
1. The client sends an HTTP request to initiate a WebSocket handshake.
2. If the server accepts, it responds with an Upgrade header to switch the connection to the WebSocket protocol.
3. Once established, both the client and server can send messages asynchronously without additional HTTP requests.

**Pros:**
- Bi-directional communication (client ↔ server)
- Low latency due to persistent connection
- Allows binary/text

**Cons:**
- More complex implementation
- Additional overhead and dependencies to maintain
- Requires WebSocket-compatible servers

### Server-Sent Events (SSE)
[SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) is a simpler alternative that allows the server to push updates to the client over a long-lived HTTP connection. Unlike WebSockets, SSE is uni-directional: only the server can send data to the client.

#### How SSE Works
1. The client makes an initial request to the server.
2. Server needs to respond using the MIME type `text/event-stream`
    ```go
    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")
    ```
3. The server keeps the connection open and streams data as needed.
4. The client listens for incoming updates without making additional requests.
5. Provides callbacks to implement error handling
    ```js    
    eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
    };
    ```

**Pros:**
- Simpler to implement (comes in javascript natively with most browsers supporting it)
- Works well with existing HTTP infrastructure
- Lightweight

**Cons:**
- One-way communication (server → client), not suitable for interaction-heavy use cases like gaming
- Supports text data encoded in UTF-8 only
- Limited to maximum of 6 open connections per browser, per domain, when not used over HTTP/2, 

### Building with SSE in Go
[Meme Fetcher](https://github.com/elt0nxale/meme-fetcher) was a mini project to experiment with SSE in Go. It allows multiple client connections to stream real time memes from reddit's r/memes, who each receive a unique sequence of memes from the shared cache.

#### Key Takeaways:
- SSE in Go is straightforward using the `http` package.
- Keeping connections open efficiently is important to avoid resource leaks.
- Clients only need a simple `EventSource` in JavaScript to receive updates.

### When to Use What?
| Use Case         | WebSockets | SSE  |
|----------------|-----------|------|
| Chat Apps      | ✅        | ❌   |
| Stock Updates  | ✅        | ✅   |
| Notifications  | ❌        | ✅   |
| Multiplayer Games | ✅   | ❌   |

### Wrapping Up
Use websockets when you truly require bidirectional communication - like google docs or slack. For anything else - notification feeds or streaming token-by-token chatgpt responses - SSE does this in a simpler, more scalable and lightweight fashion. 

