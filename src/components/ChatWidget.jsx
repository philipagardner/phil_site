import { useEffect, useRef, useState } from 'react';
import ButtonGame, { DEFAULT_GAME } from './ButtonGame';

const initialMessages = [
  {
    role: 'assistant',
    content:
      'Hey There! I’m Tracy, Phil’s AI assistant. Want to know more about Phil, feel free to ask anything about his background, career, personal life, or how to get in touch.'
  }
];

async function getAssistantReply(input, history) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          ...history
            .filter((message) => message.type !== 'game' && message.content)
            .map(({ role, content }) => ({ role, content })),
          { role: 'user', content: input }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('AI endpoint unavailable');
    }

    const data = await response.json();

    if (data.reply) {
      return { reply: data.reply, ui: data.ui || null, game: data.game || null };
    }

    throw new Error('Empty reply from assistant');
  } catch (error) {
    console.error('Chat request failed:', error);
    return {
      reply: 'Sorry, I couldn’t reach the assistant just now. Please try again in a moment.',
      ui: null,
      game: null
    };
  }
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGameButton, setShowGameButton] = useState(false);
  const messagesRef = useRef(null);
  const hasWonGame = messages.some(
    (message) => message.type === 'game' && message.clicks >= message.game.goal
  );

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage = { role: 'user', content: trimmedInput };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsLoading(true);

    const reply = await getAssistantReply(trimmedInput, messages);

    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        content: reply.reply,
        ...(reply.ui === 'button_game_offer'
          ? { offerStatus: 'pending', game: reply.game || DEFAULT_GAME }
          : {})
      }
    ]);
    setIsLoading(false);
  }

  function newGameMessage(game = DEFAULT_GAME) {
    return { role: 'assistant', type: 'game', content: '', clicks: 0, game };
  }

  function handleOfferChoice(index, choice) {
    if (choice === 'no') {
      setShowGameButton(true);
    }

    setMessages((current) => {
      const updated = current.map((message, i) =>
        i === index ? { ...message, offerStatus: choice } : message
      );

      if (choice === 'yes') {
        return [...updated, { role: 'user', content: 'Yes!' }, newGameMessage(current[index]?.game)];
      }

      return [
        ...updated,
        { role: 'user', content: 'No, that sounds scary' },
        {
          role: 'assistant',
          content: 'Well, just click the button game button if you change your mind!'
        }
      ];
    });
  }

  function handleGameClick(index) {
    setMessages((current) =>
      current.map((message, i) =>
        i === index
          ? { ...message, clicks: Math.min(message.clicks + 1, message.game.goal) }
          : message
      )
    );
  }

  function handleLaunchGame() {
    setMessages((current) => [...current, newGameMessage()]);
  }

  return (
    <div className="chat-widget">
      {!isOpen && (
        <button
          type="button"
          className="chat-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
          aria-expanded={isOpen}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="chat-panel" role="dialog" aria-label="Portfolio AI assistant">
          <div className="chat-header">
            <div>
              <div className="chat-status">AI assistant</div>
              <strong>Ask Phil’s AI</strong>
            </div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI assistant"
            >
              ×
            </button>
          </div>

          <div className="chat-messages" ref={messagesRef}>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chat-message ${message.role}`}
              >
                <div
                  className={`chat-message-body${message.type === 'game' ? ' chat-message-body-wide' : ''}`}
                >
                  <div className={`chat-bubble chat-bubble-${message.role}`}>
                    {message.type === 'game' ? (
                      <ButtonGame
                        game={message.game}
                        clicks={message.clicks}
                        onClick={() => handleGameClick(index)}
                      />
                    ) : (
                      message.content
                    )}
                  </div>

                  {message.offerStatus === 'pending' && (
                    <div className="chat-offer-actions">
                      <button
                        type="button"
                        className="chat-offer-yes"
                        onClick={() => handleOfferChoice(index, 'yes')}
                      >
                        Yes!
                      </button>
                      <button
                        type="button"
                        className="chat-offer-no"
                        onClick={() => handleOfferChoice(index, 'no')}
                      >
                        No, that sounds scary
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message assistant">
                <div className="chat-bubble chat-bubble-assistant">Thinking…</div>
              </div>
            )}
          </div>

          {showGameButton && !hasWonGame && (
            <div className="chat-game-launch-bar">
              <button type="button" className="chat-game-launch" onClick={handleLaunchGame}>
                🔴 Button game
              </button>
            </div>
          )}

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about the work..."
              aria-label="Ask the AI assistant"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
