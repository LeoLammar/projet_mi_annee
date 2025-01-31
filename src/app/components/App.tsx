
import React, { useState, KeyboardEvent } from "react";
import "./styles.css";

interface Message {
  sender: string;
  text: string;
}

const languages: Record<string, string> = {
  fr: "Français 🇫🇷",
  en: "English 🇬🇧",
  es: "Español 🇪🇸",
  de: "Deutsch 🇩🇪",
  it: "Italiano 🇮🇹",
};

const welcomeMessages: Record<string, string> = {
  fr: "👋 Bonjour, bienvenue sur votre chatbot ! Comment puis-je vous aider ?",
  en: "👋 Hello, welcome to your chatbot! How can I help you?",
  es: "👋 ¡Hola! Bienvenido a tu chatbot. ¿Cómo puedo ayudarte?",
  de: "👋 Hallo! Willkommen bei Ihrem Chatbot. Wie kann ich Ihnen helfen?",
  it: "👋 Ciao! Benvenuto nel tuo chatbot. Come posso aiutarti?",
};

// 🔑 Clé API (à remplacer)
const API_KEY = "AIzaSyDauShkHCStKoYEOa_4D92qspBUfbdigzU";

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // 🔹 Fonction pour ouvrir/fermer le chat
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    setSelectedLanguage(null);
    if (!isChatOpen) {
      setMessages([
        { sender: "IA", text: "👋 Bonjour, bienvenue sur votre chatbot !" },
        { sender: "IA", text: "👋 Hello, welcome to your chatbot!" },
        {
          sender: "IA",
          text: "🌍 Veuillez sélectionner une langue / Please select a language:",
        },
      ]);
    }
  };

  // 🔹 Sélection de la langue
  const selectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    setMessages([{ sender: "IA", text: welcomeMessages[lang] }]);
  };

  // 🔹 Envoi d'un message
  const sendMessage = async () => {
    if (!input.trim() || !selectedLanguage) return;

    const userMessage: Message = { sender: "Vous", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    // 📚 Vérifie si l'utilisateur parle d'un cours
    if (input.toLowerCase().includes("cours")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "IA", text: "📚 Vous voulez un cours ! Souhaitez-vous :" },
        { sender: "IA", text: "✅ 1. Un résumé généré par l'IA" },
        { sender: "IA", text: "🔗 2. Accéder à des fiches de cours externes" },
      ]);
      return;
    }

    // 🎓 Option 1 → Génération d'un cours
    if (input.trim() === "1") {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: `Explique-moi un cours en ${selectedLanguage}.` },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const aiReply =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Impossible de générer un résumé.";

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "IA", text: aiReply },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "IA", text: "⚠️ Erreur de connexion." },
        ]);
      }
      return;
    }

    // 📚 Option 2 → Fiches de cours externes
    if (input.trim() === "2") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "IA", text: "📖 Voici des ressources utiles :" },
        {
          sender: "IA",
          text: "🔗 [Khan Academy](https://www.khanacademy.org/)",
        },
        {
          sender: "IA",
          text: "🔗 [Studyrama](https://www.studyrama.com/revision-examen/fiche-de-revision)",
        },
        {
          sender: "IA",
          text: "🔗 [OpenClassrooms](https://openclassrooms.com/)",
        },
      ]);
      return;
    }

    // 🔹 Envoi normal à l'IA
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Réponds en ${selectedLanguage}. Question : ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Réponse non disponible.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "IA", text: aiReply },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "IA", text: "⚠️ Erreur de connexion." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button  className="bg-blue-500 text-white p-3 rounded-full shadow-lg" onClick={toggleChat}>
        💬
      </button>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-4 w-80">
          <div className="chat-header">
            <span>💡 Chat IA</span>
            <button className="close-button" onClick={toggleChat}>
              ✖
            </button>
          </div>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "Vous" ? "message user" : "message ai"
                }
              >
                <strong>{msg.sender} :</strong> {msg.text}
              </div>
            ))}
          </div>

          {!selectedLanguage ? (
            <div className="language-selection">
              {Object.entries(languages).map(([code, name]) => (
                <button key={code} onClick={() => selectLanguage(code)}>
                  {name}
                </button>
              ))}
            </div>
          ) : (
            <div className="input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && sendMessage()
                }
                placeholder="Écris un message..."
              />
              <button onClick={sendMessage}>➤</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;