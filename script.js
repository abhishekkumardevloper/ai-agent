console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  const chatContainer = document.getElementById("chat-container");
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  console.log("chatContainer:", chatContainer);
  console.log("chatForm:", chatForm);
  console.log("userInput:", userInput);
  console.log("sendBtn:", sendBtn);

  if (!chatForm || !userInput || !sendBtn || !chatContainer) {
    console.error("❌ One or more elements not found. Check IDs in index.html.");
    return;
  }

  let messages = [];

  function addMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role === "user" ? "user" : "bot");
    messageDiv.textContent = content;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function addMeta(text) {
    const metaDiv = document.createElement("div");
    metaDiv.classList.add("message", "meta");
    metaDiv.textContent = text;
    chatContainer.appendChild(metaDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return metaDiv;
  }

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("📨 Form submitted");

    const text = userInput.value.trim();
    if (!text) {
      console.log("⚠️ Empty message, ignoring");
      return;
    }

    // Add user message to UI and history
    addMessage("user", text);
    messages.push({ role: "user", content: text });
    userInput.value = "";
    userInput.focus();

    // Show typing indicator
    sendBtn.disabled = true;
    const typingIndicator = addMeta("AI is thinking...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      console.log("🔁 Response status:", response.status);

      if (!response.ok) {
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();
      console.log("✅ Response JSON:", data);

      // Remove typing indicator
      typingIndicator.remove();

      const reply = data.reply || "Sorry, I couldn't answer that. Try again.";
      addMessage("assistant", reply);
      messages.push({ role: "assistant", content: reply });
    } catch (err) {
      console.error("❌ Error talking to AI:", err);
      typingIndicator.textContent = "Error talking to AI. Please try again.";
    } finally {
      sendBtn.disabled = false;
    }
  });

  // Add a welcome message
  const welcome =
    "Hi! I'm your Course Helper AI. Ask me any course-related question, like:\n" +
    "- Explain operating system deadlock\n" +
    "- What is object oriented programming?\n" +
    "- Difference between stack and queue\n" +
    "- Explain normalization in DBMS";
  addMessage("assistant", welcome);
});
