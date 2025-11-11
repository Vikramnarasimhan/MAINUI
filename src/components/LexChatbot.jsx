import React, { useState } from "react";
import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";

const client = new LexRuntimeV2Client({
  region: "eu-central-1",
  // For production use Cognito credentials here instead of hardcoding
  // credentials: fromCognitoIdentityPool({ ... })
});

const BOT_ID = "UYENXVYDXY"; // Your Bot ID
const BOT_ALIAS_ID = "TSTALIASID"; // Your Bot Alias ID
const LOCALE = "en_US";
const SESSION_ID = "user-session-" + Math.random().toString(36).substring(2, 15);

export default function LexChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendToLex(message) {
    try {
      const command = new RecognizeTextCommand({
        botId: BOT_ID,
        botAliasId: BOT_ALIAS_ID,
        localeId: LOCALE,
        sessionId: SESSION_ID,
        text: message,
      });

      const response = await client.send(command);
      const botReply = response.messages?.[0]?.content || "I didn't get a response!";
      setMessages((msgs) => [...msgs, { from: "user", text: message }, { from: "bot", text: botReply }]);
    } catch (error) {
      setMessages((msgs) => [...msgs, { from: "user", text: message }, { from: "bot", text: "Sorry, there was an error." }]);
    }
  }

  return (
    <div style={{ width: 300, border: "1px solid #ddd", padding: 10 }}>
      <div style={{ height: 250, overflowY: "scroll", background: "#fafafa", marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.from}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        style={{ width: "80%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendToLex(input);
            setInput("");
          }
        }}
      />
      <button
        style={{ width: "18%" }}
        onClick={() => {
          sendToLex(input);
          setInput("");
        }}
      >
        Send
      </button>
    </div>
  );
}
