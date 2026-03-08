interface Message {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br />');
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.role === 'assistant') {
    return (
      <div className="flex items-start gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white text-xs font-bold">A8</span>
        </div>
        <div className="flex-1 max-w-2xl">
          <p className="text-xs text-gray-400 mb-1">Autumn8</p>
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: `<p class="mb-3">${renderMarkdown(message.content)}</p>`,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-6 flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-slate-600 text-xs font-bold">You</span>
      </div>
      <div className="flex-1 max-w-2xl flex justify-end">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-tr-sm px-4 py-3 text-gray-800 leading-relaxed max-w-md">
          {message.content}
        </div>
      </div>
    </div>
  );
}
