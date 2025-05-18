import React, { useState, useEffect } from 'react';
import { User, Thread } from '../types';
import { X, Send, Wand2, Loader2, MessageSquare } from 'lucide-react';

interface ProfileProps {
  user: User;
  isReplying: boolean;
  selectedThread?: Thread | null;
  onCloseReply: () => void;
  onSendReply: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, isReplying, selectedThread, onCloseReply, onSendReply }) => {
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Generate initial reply when thread is selected
  useEffect(() => {
    if (selectedThread && isReplying) {
      handleAIGenerate(true);
    }
  }, [selectedThread, isReplying]);

  const callClaudeAPI = async (prompt: string) => {
    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      return null;
    }
  };

  const handleAIGenerate = async (isInitial: boolean = false) => {
    if (!selectedThread) return;
    
    setIsGenerating(true);
    try {
      const prompt = isInitial
        ? `Please help me draft an initial response to this message: "${selectedThread.content}". Consider the context that this is from ${selectedThread.platform} and in the channel #${selectedThread.channel?.name}.`
        : `Please generate a new response to this message: "${selectedThread.content}". Make it professional and contextual.`;
      
      const response = await callClaudeAPI(prompt);
      if (response) {
        setReplyText(response);
      }
    } catch (error) {
      console.error('Error generating reply:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhanceText = async () => {
    if (!replyText.trim() || !selectedThread) return;
    
    setIsEnhancing(true);
    try {
      const prompt = `Original message: "${selectedThread.content}"
My draft reply: "${replyText}"
Please enhance my reply while keeping the original intent. Make it more professional and contextual.`;
      
      const response = await callClaudeAPI(prompt);
      if (response) {
        setReplyText(response);
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendReply();
    setReplyText('');
  };

  if (!isReplying) {
    return (
      <div className="h-full flex flex-col p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500">{user.title}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-slate-900">Recent Threads</h4>
          {user.recentThreads.map((thread, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-lg">
              <h5 className="font-medium text-slate-800">{thread.preview}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-slate-900">Quick Reply</h3>
        </div>
        <button 
          onClick={onCloseReply}
          className="p-1 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={16} className="text-slate-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        {selectedThread && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-slate-900">
                  {selectedThread.sender.name}
                </span>
                <span className="text-xs text-slate-500">
                  in #{selectedThread.channel?.name}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {selectedThread.timestamp}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-sm text-slate-700 whitespace-pre-line">
                {selectedThread.content}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <textarea 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full h-32 p-3 bg-white border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
            placeholder="Type your reply..."
          />
          
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => handleAIGenerate(false)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors ${
                  isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isGenerating || isEnhancing}
              >
                <Wand2 size={14} />
                <span>Generate</span>
              </button>
              
              <button
                onClick={handleEnhanceText}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 rounded-lg hover:bg-slate-100 transition-colors ${
                  isEnhancing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isGenerating || isEnhancing || !replyText.trim()}
              >
                {isEnhancing ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Wand2 size={14} />
                )}
                <span>Enhance</span>
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ${
                (isGenerating || isEnhancing) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isGenerating || isEnhancing || !replyText.trim()}
            >
              {(isGenerating || isEnhancing) ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;