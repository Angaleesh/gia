"use client";

import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = ["Help me plan my day", "Explain something simply", "Brainstorm a new idea"];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();
    const message = input.trim();
    if (!message || isLoading) return;
    setMessages((current) => [...current, { role: "user", content: message }]);
    setInput("");
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "The assistant is unavailable.");
      setMessages((current) => [...current, { role: "assistant", content: data.message }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant is unavailable right now.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="chat-shell">
      <aside className="chat-sidebar">
        <div className="brand-mark" aria-hidden="true">g</div>
        <div><p className="eyebrow">Angaleesh's Personal Assistant</p><h1>Gia</h1></div>
        <button className="new-chat" type="button" onClick={() => setMessages([])}><span aria-hidden="true">+</span> New conversation</button>
        <div className="sidebar-note"><span className="status-dot" /><div><strong>Gia is online</strong><small>Ready when you are</small></div></div>
      </aside>
      <section className="chat-panel">
        <header className="chat-header"><div><p className="eyebrow">CONVERSATION</p><h2>How can I help?</h2></div><div className="model-label"><span className="status-dot" /> Llama 3.2</div></header>
        <div className="message-area" aria-live="polite">
          {messages.length === 0 ? <div className="welcome-state">
            <div className="welcome-orbit" aria-hidden="true"><span>✦</span></div><p className="eyebrow">GOOD TO SEE YOU</p>
            <h3>Let&apos;s make something<br /><em>meaningful</em> today.</h3>
            <p className="welcome-copy">Ask Gia anything. From untangling complex thoughts to finding the next small step.</p>
            <div className="suggestions">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setInput(suggestion)}>{suggestion} <span aria-hidden="true">↗</span></button>)}</div>
          </div> : <div className="messages">
            {messages.map((message, index) => <div className={`message-row ${message.role}`} key={`${message.role}-${index}`}>
              {message.role === "assistant" && <div className="avatar">g</div>}<p>{message.content}</p>
            </div>)}
            {isLoading && <div className="message-row assistant"><div className="avatar">g</div><p className="typing"><span /><span /><span /></p></div>}
          </div>}
        </div>
        <div className="composer-wrap">{error && <p className="error-message" role="alert">{error}</p>}
          <form className="composer" onSubmit={sendMessage}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Message Gia..." aria-label="Message Gia" disabled={isLoading} /><button className="send-button" type="submit" disabled={!input.trim() || isLoading} aria-label="Send message"><span aria-hidden="true">↑</span></button></form>
          <p className="composer-hint">Gia can make mistakes. Check important information.</p>
        </div>
      </section>
    </main>
  );
}
