import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState('');
  const [issueType, setIssueType] = useState('');
  const [email, setEmail] = useState('');
  const [shareData, setShareData] = useState(false);
  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: 'support', text: 'Hi! How can we help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const agentReplyTimeout = useRef(null);
  const [agentTyping, setAgentTyping] = useState(false);
  const [hasAgentReplied, setHasAgentReplied] = useState(false);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ experience, issueType, email });
    alert('Feedback submitted! Check the console for form data.');
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (chatInput.trim() === '') return;
    setChatMessages((msgs) => [
      ...msgs,
      { from: 'user', text: chatInput }
    ]);
    setChatInput('');
  };

  useEffect(() => {
    console.log('chatMessages', chatMessages);
    // Only reply to the first user message
    if (
      !hasAgentReplied &&
      chatMessages.length > 0 &&
      chatMessages[chatMessages.length - 1].from === 'user'
    ) {
      setAgentTyping(true);
      agentReplyTimeout.current = setTimeout(() => {
        setChatMessages((msgs) => [
          ...msgs,
          { from: 'support', text: 'Hello! I am happy to help! What seems to be the problem?' }
        ]);
        setAgentTyping(false);
        setHasAgentReplied(true);
      }, 1500);
    } else if (hasAgentReplied) {
      setAgentTyping(false);
    }
    return () => {
      if (agentReplyTimeout.current) clearTimeout(agentReplyTimeout.current);
    };
  }, [chatMessages, hasAgentReplied]);

  useEffect(() => {
    // Prevent duplicate Glimt script injection
    const existingScript = document.querySelector('script[src="https://cdn.glimt.support/browser/glimt.js"]');
    let script;
    if (!existingScript) {
      script = document.createElement('script');
      script.setAttribute('data-public-key', 'pk_ad3f49947acb7cc3f1e285c4b932b6d0572c81df8caa7de4ca4ed43e7aada548');
      script.setAttribute('data-persist', '');
      // script.setAttribute('data-api-url', 'http://localhost:4000/v1beta');
      script.src = 'https://cdn.glimt.support/browser/glimt.js';
      document.body.appendChild(script);
    }

    // Prevent duplicate inline script injection
    const inlineScriptId = 'glimt-set-user-inline';
    let inlineScript = document.getElementById(inlineScriptId);
    if (!inlineScript) {
      inlineScript = document.createElement('script');
      inlineScript.id = inlineScriptId;
      inlineScript.innerHTML = `
        (function setGlimtUser(attempts) {
          if (window.Glimt && window.Glimt.session && typeof window.Glimt.session.setUser === 'function') {
            window.Glimt.session.setUser({
              uid: "2f7ef73d-cf88-42d6-8fc6-6e49e35d02e3",
              email: "johndoe@example.com",
              nickname: "johndoe",
            });
          } else if (attempts > 0) {
            setTimeout(function() { setGlimtUser(attempts - 1); }, 500);
          }
        })(10);
      `;
      document.body.appendChild(inlineScript);
    }

    // Cleanup scripts on unmount (only if we added them)
    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (inlineScript && document.body.contains(inlineScript)) {
        document.body.removeChild(inlineScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 relative">
      <header className="mb-6 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-2">Feedback Form</h1>
        <div className="text-center text-gray-500">Step {step} of 3</div>
      </header>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl flex flex-col gap-6"
      >
        {step === 1 && (
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="experience">
              Tell us about your experience
            </label>
            <textarea
              id="experience"
              className="w-full border rounded p-2 min-h-[80px] focus:ring focus:ring-blue-200"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="issueType">
              Type of issue
            </label>
            <select
              id="issueType"
              className="w-full border rounded p-2 bg-white"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Bug">Bug</option>
              <option value="Confusion">Confusion</option>
              <option value="Feature Request">Feature Request</option>
            </select>
            <div className="mt-4 h-24 overflow-y-scroll border rounded p-2 bg-gray-50">
              <div className="h-32">
                <p className="text-gray-700 font-semibold mb-2">Need help?</p>
                <ul className="list-disc ml-5 text-gray-600 text-sm">
                  <li>"Bug" - Something is broken or not working as expected.</li>
                  <li>"Confusion" - Something was unclear or hard to use.</li>
                  <li>"Feature Request" - You'd like to see a new feature or improvement.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Your email (optional)
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          {step > 1 ? (
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleBack}
            >
              Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="shareData"
                  className="h-4 w-4"
                  onChange={(e) => setShareData(e.target.checked)}
                />
                <label htmlFor="shareData" className="text-sm text-gray-600">
                  I agree to share my data with a third party
                </label>
              </div>
              <button
                type="submit"
                className={`px-4 py-2 bg-green-600 text-white rounded opacity-50 cursor-not-allowed`}
                disabled={true}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </form>
      <footer className="mt-10 text-gray-500 text-sm w-full max-w-xl text-center border-t pt-6">
        <div>Need more help? <a href="mailto:support@example.com" className="text-blue-600 underline">Contact support</a></div>
        <div className="mt-2">&copy; {new Date().getFullYear()} Feedback Inc.</div>
      </footer>
      {/* Floating Chat Bubble */}
      <button
        type="button"
        aria-label="Chat with support"
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        onClick={() => setChatOpen((open) => !open)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5272 20 9.12741 19.7362 7.88889 19.2632L3 21L4.26316 16.1111C3.48947 14.8889 3 13.4861 3 12C3 7.30558 7.02944 3.5 12 3.5C16.9706 3.5 21 7.30558 21 11.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Chat Box */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-xl flex flex-col border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-center px-6 py-4 border-b">
            <span className="text-xl font-bold text-gray-800">Support Chat</span>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" style={{ maxHeight: '260px' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'support' ? 'justify-start' : 'justify-end'} items-end`}>
                {msg.from === 'support' && (
                  <div className="flex items-end mr-2">
                    <div className="w-8 h-8 bg-green-400 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">A</div>
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl text-base max-w-[70%] shadow-sm ${
                    msg.from === 'support'
                      ? 'bg-green-50 text-green-900 rounded-bl-none'
                      : 'bg-blue-100 text-blue-900 rounded-br-none'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.from === 'user' && (
                  <div className="flex items-end ml-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">U</div>
                  </div>
                )}
              </div>
            ))}
            {/* Typing animation (only show if agentTyping) */}
            {agentTyping && (
              <div className="flex justify-start items-end">
                <div className="flex items-end mr-2">
                  <div className="w-8 h-8 bg-green-400 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">A</div>
                </div>
                <div className="px-4 py-2 rounded-2xl text-base max-w-[70%] shadow-sm bg-green-50 text-green-900 rounded-bl-none flex items-center">
                  <span>Typing</span>
                  <span className="ml-1 flex">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="border-t px-6 py-4">
            <form onSubmit={handleChatSend} className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base focus:ring focus:ring-blue-200 outline-none"
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-200 hover:bg-blue-400 text-blue-900 font-semibold px-6 py-2 rounded-full text-base transition disabled:opacity-50"
                disabled={chatInput.trim() === ''}
              >
                Send
              </button>
            </form>
          </div>
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl focus:outline-none"
            onClick={() => setChatOpen(false)}
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
