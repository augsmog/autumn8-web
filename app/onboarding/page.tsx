'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressSidebar } from '@/components/onboarding/ProgressSidebar';
import { MessageBubble } from '@/components/onboarding/MessageBubble';
import { QuickSelect } from '@/components/onboarding/QuickSelect';
import { TypingIndicator } from '@/components/onboarding/TypingIndicator';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

interface QuickSelectConfig {
  type: 'single' | 'multi';
  options: string[];
  allowCustom: boolean;
}

interface OnboardingResponse {
  message: string;
  quickSelect: QuickSelectConfig | null;
  progressPercent: number;
  dataCollected: Record<string, unknown>;
  phase: string;
}

function OnboardingContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>({});
  const [quickSelect, setQuickSelect] = useState<QuickSelectConfig | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const clientInfo = {
    firstName: searchParams.get('firstName') || searchParams.get('name') || '',
    lastName: searchParams.get('lastName') || '',
    email: searchParams.get('email') || '',
    plan: searchParams.get('plan') || 'Foundation',
    industry: searchParams.get('industry') || '',
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setQuickSelect(null);
    setIsLoading(true);

    try {
      // Convert messages to API format (exclude the just-added user message from history,
      // the API receives history + current message)
      const apiMessages = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));
      // Add the user message
      apiMessages.push({ role: 'user', content: content.trim() });

      const response = await fetch('/api/onboarding/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          clientInfo,
          collectedData,
        }),
      });

      const data: OnboardingResponse = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setProgressPercent(data.progressPercent || progressPercent);
      setQuickSelect(data.quickSelect || null);

      if (data.dataCollected && Object.keys(data.dataCollected).length > 0) {
        setCollectedData(prev => ({ ...prev, ...data.dataCollected }));
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "We're having a brief technical issue. Please refresh the page — your progress is saved.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isLoading, clientInfo, collectedData, progressPercent]);

  const startConversation = useCallback(async () => {
    if (started) return;
    setStarted(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/onboarding/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          clientInfo,
          collectedData: {},
        }),
      });

      const data: OnboardingResponse = await response.json();

      setMessages([{
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      }]);
      setProgressPercent(data.progressPercent || 5);
      setQuickSelect(data.quickSelect || null);

      if (data.dataCollected) {
        setCollectedData(data.dataCollected);
      }
    } catch {
      setMessages([{
        role: 'assistant',
        content: `Hey ${clientInfo.firstName || 'there'}! Welcome to Autumn8. I'm going to help set up your business automation today.\n\nLet's start with the basics — what's your business called, and where are you based?`,
        timestamp: new Date(),
      }]);
      setProgressPercent(5);
    } finally {
      setIsLoading(false);
    }
  }, [started, clientInfo]);

  useEffect(() => {
    startConversation();
  }, [startConversation]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Sidebar — hidden on mobile unless toggled */}
      <div className={`
        fixed inset-0 z-40 lg:relative lg:z-auto
        ${showSidebar ? 'block' : 'hidden lg:block'}
        lg:w-72 lg:flex-shrink-0
      `}>
        <div className="h-full">
          {showSidebar && (
            <div
              className="absolute inset-0 bg-black/50 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}
          <div className="relative h-full z-10 w-72">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-white lg:hidden z-20"
              onClick={() => setShowSidebar(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <ProgressSidebar
              progressPercent={progressPercent}
              collectedData={collectedData}
            />
          </div>
        </div>
      </div>

      {/* Main conversation area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setShowSidebar(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <img src="/logo.png" alt="Autumn8" className="h-8" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Setting up your automation
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}

            {isLoading && <TypingIndicator />}

            {quickSelect && !isLoading && (
              <div className="pl-11 mb-4">
                <QuickSelect
                  type={quickSelect.type}
                  options={quickSelect.options}
                  allowCustom={quickSelect.allowCustom}
                  onSelect={(value) => sendMessage(value)}
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-gray-100 px-4 py-4 lg:px-8 bg-white flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your reply..."
                disabled={isLoading}
                rows={1}
                className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 disabled:opacity-50 disabled:bg-gray-50 max-h-32 overflow-y-auto"
                style={{ minHeight: '48px' }}
                onInput={e => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                }}
              />
              <Button
                onClick={() => sendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="bg-orange-500 hover:bg-orange-600 h-12 w-12 p-0 flex-shrink-0 rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
