import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Heart, 
  Reply, 
  Send,
  Lightbulb,
  Bug,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Comment, Reply as ReplyType, CommunityStats } from '../types/community';

interface CommunityFeedbackProps {
  projectId?: string;
}

const CommunityFeedback: React.FC<CommunityFeedbackProps> = ({ projectId = 'default' }) => {
  const { language } = useLanguage();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [selectedType, setSelectedType] = useState<Comment['type']>('general');
  const [filterType, setFilterType] = useState<'all' | Comment['type']>('all');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [stats, setStats] = useState<CommunityStats>({
    totalComments: 0,
    totalSuggestions: 0,
    resolvedSuggestions: 0,
    activeDiscussions: 0,
    contributors: 0
  });

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`community-comments-${projectId}`);
    if (storedComments) {
      const parsed = JSON.parse(storedComments).map((comment: any) => ({
        ...comment,
        timestamp: new Date(comment.timestamp),
        replies: comment.replies.map((reply: any) => ({
          ...reply,
          timestamp: new Date(reply.timestamp)
        }))
      }));
      setComments(parsed);
      updateStats(parsed);
    }
  }, [projectId]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem(`community-comments-${projectId}`, JSON.stringify(comments));
    updateStats(comments);
  }, [comments, projectId]);

  const updateStats = (commentsList: Comment[]) => {
    const totalComments = commentsList.length;
    const suggestions = commentsList.filter(c => c.type === 'suggestion');
    const resolved = suggestions.filter(s => s.status === 'resolved');
    const active = commentsList.filter(c => c.status !== 'resolved').length;
    const contributors = new Set(commentsList.map(c => c.author)).size;

    setStats({
      totalComments,
      totalSuggestions: suggestions.length,
      resolvedSuggestions: resolved.length,
      activeDiscussions: active,
      contributors
    });
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const submitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: generateId(),
      author: isAnonymous ? (language === 'en' ? 'Anonymous' : '匿名用户') : 'User',
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      tags: [],
      type: selectedType,
      status: selectedType === 'suggestion' ? 'open' : undefined,
      isAnonymous
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const submitReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: ReplyType = {
      id: generateId(),
      author: isAnonymous ? (language === 'en' ? 'Anonymous' : '匿名用户') : 'User',
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      isAnonymous
    };

    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyContent('');
    setShowReplyForm(null);
  };

  const likeComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const likeReply = (commentId: string, replyId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : comment
    ));
  };

  const updateCommentStatus = (commentId: string, status: Comment['status']) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, status }
        : comment
    ));
  };

  const filteredComments = comments.filter(comment => 
    filterType === 'all' || comment.type === filterType
  );

  const typeIcons = {
    general: <MessageSquare size={16} />,
    suggestion: <Lightbulb size={16} />,
    question: <HelpCircle size={16} />,
    'bug-report': <Bug size={16} />
  };

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800'
  };

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return language === 'en' ? 'Just now' : '刚刚';
    if (minutes < 60) return language === 'en' ? `${minutes}m ago` : `${minutes}分钟前`;
    if (hours < 24) return language === 'en' ? `${hours}h ago` : `${hours}小时前`;
    return language === 'en' ? `${days}d ago` : `${days}天前`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-theme-card rounded-xl p-4 shadow-theme-md">
          <div className="text-2xl font-bold text-theme-primary">{stats.totalComments}</div>
          <div className="text-sm text-theme-secondary">
            {language === 'en' ? 'Total Messages' : '总留言数'}
          </div>
        </div>
        <div className="bg-theme-card rounded-xl p-4 shadow-theme-md">
          <div className="text-2xl font-bold text-theme-primary">{stats.totalSuggestions}</div>
          <div className="text-sm text-theme-secondary">
            {language === 'en' ? 'Suggestions' : '建议数'}
          </div>
        </div>
        <div className="bg-theme-card rounded-xl p-4 shadow-theme-md">
          <div className="text-2xl font-bold text-theme-primary">{stats.resolvedSuggestions}</div>
          <div className="text-sm text-theme-secondary">
            {language === 'en' ? 'Resolved' : '已解决'}
          </div>
        </div>
        <div className="bg-theme-card rounded-xl p-4 shadow-theme-md">
          <div className="text-2xl font-bold text-theme-primary">{stats.activeDiscussions}</div>
          <div className="text-sm text-theme-secondary">
            {language === 'en' ? 'Active' : '活跃讨论'}
          </div>
        </div>
        <div className="bg-theme-card rounded-xl p-4 shadow-theme-md">
          <div className="text-2xl font-bold text-theme-primary">{stats.contributors}</div>
          <div className="text-sm text-theme-secondary">
            {language === 'en' ? 'Contributors' : '参与者'}
          </div>
        </div>
      </div>

      {/* New Comment Form */}
      <div className="bg-theme-card rounded-xl p-6 shadow-theme-md">
        <h3 className="text-lg font-semibold mb-4 text-theme-primary flex items-center gap-2">
          <Plus size={20} />
          {language === 'en' ? 'Share Your Thoughts' : '分享您的想法'}
        </h3>
        
        {/* Comment Type Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(typeIcons).map(([type, icon]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as Comment['type'])}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                selectedType === type
                  ? 'bg-theme-primary text-white'
                  : 'bg-theme-surface text-theme-secondary hover:bg-theme-hover'
              }`}
            >
              {icon}
              <span className="text-sm">
                {type === 'general' && (language === 'en' ? 'General' : '一般留言')}
                {type === 'suggestion' && (language === 'en' ? 'Suggestion' : '建议')}
                {type === 'question' && (language === 'en' ? 'Question' : '问题')}
                {type === 'bug-report' && (language === 'en' ? 'Bug Report' : '错误报告')}
              </span>
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={language === 'en' ? 'Write your message...' : '写下您的留言...'}
          className="w-full p-4 bg-theme-surface text-theme-primary rounded-lg resize-none focus:ring-2 focus:ring-theme-primary"
          rows={4}
        />

        {/* Submit Options */}
        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center gap-2 text-sm text-theme-secondary">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded"
            />
            {language === 'en' ? 'Post anonymously' : '匿名发布'}
          </label>
          
          <button
            onClick={submitComment}
            disabled={!newComment.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={16} />
            {language === 'en' ? 'Submit' : '提交'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'general', 'suggestion', 'question', 'bug-report'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filterType === type
                ? 'bg-theme-primary text-white'
                : 'bg-theme-surface text-theme-secondary hover:bg-theme-hover'
            }`}
          >
            {type !== 'all' && typeIcons[type as keyof typeof typeIcons]}
            <span className="text-sm">
              {type === 'all' && (language === 'en' ? 'All' : '全部')}
              {type === 'general' && (language === 'en' ? 'General' : '一般')}
              {type === 'suggestion' && (language === 'en' ? 'Suggestions' : '建议')}
              {type === 'question' && (language === 'en' ? 'Questions' : '问题')}
              {type === 'bug-report' && (language === 'en' ? 'Bug Reports' : '错误报告')}
            </span>
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-theme-card rounded-xl p-6 shadow-theme-md"
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {comment.isAnonymous ? '?' : comment.author[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-theme-primary">{comment.author}</div>
                    <div className="text-sm text-theme-secondary">{formatRelativeTime(comment.timestamp)}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {typeIcons[comment.type]}
                  {comment.status && (
                                         <select
                       value={comment.status}
                       onChange={(e) => updateCommentStatus(comment.id, e.target.value as Comment['status'])}
                       className={`px-2 py-1 rounded text-xs font-medium ${statusColors[comment.status]}`}
                       aria-label={language === 'en' ? 'Update status' : '更新状态'}
                     >
                      <option value="open">{language === 'en' ? 'Open' : '未解决'}</option>
                      <option value="in-progress">{language === 'en' ? 'In Progress' : '处理中'}</option>
                      <option value="resolved">{language === 'en' ? 'Resolved' : '已解决'}</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Comment Content */}
              <div className="mb-4">
                <p className="text-theme-primary whitespace-pre-wrap">{comment.content}</p>
              </div>

              {/* Comment Actions */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => likeComment(comment.id)}
                  className="flex items-center gap-2 text-theme-secondary hover:text-red-500 transition-colors"
                >
                  <Heart size={16} />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                
                <button
                  onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                  className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-colors"
                >
                  <Reply size={16} />
                  <span className="text-sm">
                    {language === 'en' ? 'Reply' : '回复'} ({comment.replies.length})
                  </span>
                </button>
              </div>

              {/* Reply Form */}
              {showReplyForm === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-theme-surface"
                >
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={language === 'en' ? 'Write a reply...' : '写下回复...'}
                    className="w-full p-3 bg-theme-surface text-theme-primary rounded-lg resize-none focus:ring-2 focus:ring-theme-primary"
                    rows={3}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setShowReplyForm(null)}
                      className="px-4 py-2 text-theme-secondary hover:text-theme-primary transition-colors"
                    >
                      {language === 'en' ? 'Cancel' : '取消'}
                    </button>
                    <button
                      onClick={() => submitReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="px-4 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {language === 'en' ? 'Reply' : '回复'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 pt-4 border-t border-theme-surface space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {reply.isAnonymous ? '?' : reply.author[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-theme-primary text-sm">{reply.author}</span>
                          <span className="text-xs text-theme-secondary">{formatRelativeTime(reply.timestamp)}</span>
                        </div>
                        <p className="text-sm text-theme-primary">{reply.content}</p>
                        <button
                          onClick={() => likeReply(comment.id, reply.id)}
                          className="flex items-center gap-1 mt-2 text-theme-secondary hover:text-red-500 transition-colors"
                        >
                          <Heart size={14} />
                          <span className="text-xs">{reply.likes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredComments.length === 0 && (
        <div className="text-center py-12 text-theme-secondary">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
          <p>{language === 'en' ? 'No messages yet. Be the first to share your thoughts!' : '还没有留言，成为第一个分享想法的人吧！'}</p>
        </div>
      )}
    </div>
  );
};

export default CommunityFeedback; 