'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import type { JobComment } from '@/lib/careers/types';
import { jobComments } from '@/lib/careers/data';
import { formatRelativeTime } from '@/lib/careers/utils';
import { Textarea } from '@/components/ui/inputs/textarea';
import { cn } from '@/lib/utils';

const CURRENT_USER = {
  name: 'Bạn',
  avatar: 'https://avatars.githubusercontent.com/u/8?v=4',
};

type Props = {
  jobId: string;
};

export function JobComments({ jobId }: Props) {
  const [comments, setComments] = useState<JobComment[]>(
    () => jobComments.filter((c) => c.jobId === jobId)
  );
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = useCallback(() => {
    if (!newComment.trim()) return;
    const comment: JobComment = {
      id: `jc-${Date.now()}`,
      jobId,
      author: CURRENT_USER,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
      isOwner: true,
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment('');
  }, [newComment, jobId]);

  const handleReply = useCallback(
    (parentId: string) => {
      if (!replyContent.trim()) return;
      const reply: JobComment = {
        id: `jr-${Date.now()}`,
        jobId,
        author: CURRENT_USER,
        content: replyContent.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
        isOwner: true,
      };
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...(c.replies ?? []), reply] }
            : c
        )
      );
      setReplyTo(null);
      setReplyContent('');
    },
    [replyContent, jobId]
  );

  const handleDelete = useCallback((id: string, parentId?: string) => {
    if (parentId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? { ...c, replies: c.replies?.filter((r) => r.id !== id) }
            : c
        )
      );
    } else {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  }, []);

  const handleEdit = useCallback(
    (id: string, parentId?: string) => {
      if (!editContent.trim()) return;
      if (parentId) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentId
              ? {
                  ...c,
                  replies: c.replies?.map((r) =>
                    r.id === id ? { ...r, content: editContent.trim() } : r
                  ),
                }
              : c
          )
        );
      } else {
        setComments((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, content: editContent.trim() } : c
          )
        );
      }
      setEditingId(null);
      setEditContent('');
    },
    [editContent]
  );

  const totalCount =
    comments.length +
    comments.reduce((acc, c) => acc + (c.replies?.length ?? 0), 0);

  return (
    <section className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white/90 mb-2">
        Bình luận & Câu hỏi
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {totalCount} bình luận
      </p>

      <div className="flex gap-4 mb-10">
        <Image
          src={CURRENT_USER.avatar}
          alt={CURRENT_USER.name}
          width={40}
          height={40}
          className="rounded-full size-10 object-cover shrink-0"
        />
        <div className="flex-1">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Nhập câu hỏi hoặc bình luận về vị trí này..."
            rows={3}
            className="rounded-2xl min-h-[100px]"
          />
          <button
            onClick={handleSubmit}
            disabled={!newComment.trim()}
            className="mt-3 px-6 py-2.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            Gửi
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            replyTo={replyTo}
            replyContent={replyContent}
            editingId={editingId}
            editContent={editContent}
            onReplyTo={setReplyTo}
            onReplyContent={setReplyContent}
            onSubmitReply={() => handleReply(comment.id)}
            onLike={(id) => {
              setComments((prev) =>
                prev.map((c) => {
                  if (c.id === id) return { ...c, likes: c.likes + 1 };
                  if (c.replies) {
                    return {
                      ...c,
                      replies: c.replies.map((r) =>
                        r.id === id ? { ...r, likes: r.likes + 1 } : r
                      ),
                    };
                  }
                  return c;
                })
              );
            }}
            onEdit={(id, content) => {
              setEditingId(id);
              setEditContent(content);
            }}
            onEditContent={setEditContent}
            onSaveEdit={(id) => handleEdit(id)}
            onCancelEdit={() => {
              setEditingId(null);
              setEditContent('');
            }}
            onDelete={(id) => handleDelete(id)}
            onDeleteReply={(replyId, parentId) =>
              handleDelete(replyId, parentId)
            }
            onSaveEditReply={(replyId, parentId) =>
              handleEdit(replyId, parentId)
            }
          />
        ))}
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  replyTo,
  replyContent,
  editingId,
  editContent,
  onReplyTo,
  onReplyContent,
  onSubmitReply,
  onLike,
  onEdit,
  onEditContent,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onDeleteReply,
  onSaveEditReply,
  isReply,
  parentId,
}: {
  comment: JobComment;
  replyTo: string | null;
  replyContent: string;
  editingId: string | null;
  editContent: string;
  onReplyTo: (id: string | null) => void;
  onReplyContent: (v: string) => void;
  onSubmitReply: () => void;
  onLike: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  onEditContent: (v: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onDeleteReply: (replyId: string, parentId: string) => void;
  onSaveEditReply: (replyId: string, parentId: string) => void;
  isReply?: boolean;
  parentId?: string;
}) {
  const isEditing = editingId === comment.id;

  return (
    <div className={cn(isReply && 'ml-12 sm:ml-16')}>
      <div className="flex gap-3">
        <Image
          src={comment.author.avatar}
          alt={comment.author.name}
          width={36}
          height={36}
          className="rounded-full size-9 object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-800 dark:text-white/90">
              {comment.author.name}
            </span>
            <span className="text-xs text-gray-400">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>

          {isEditing ? (
            <div className="mt-2">
              <Textarea
                value={editContent}
                onChange={(e) => onEditContent(e.target.value)}
                rows={2}
                className="rounded-xl text-sm"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    isReply && parentId
                      ? onSaveEditReply(comment.id, parentId)
                      : onSaveEdit(comment.id)
                  }
                  className="px-4 py-1.5 rounded-full bg-primary-500 text-white text-xs font-medium"
                >
                  Lưu
                </button>
                <button
                  onClick={onCancelEdit}
                  className="px-4 py-1.5 rounded-full text-xs text-gray-500 hover:text-gray-700"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
              {comment.content}
            </p>
          )}

          {!isEditing && (
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => onLike(comment.id)}
                className="text-xs text-gray-400 hover:text-primary-500 transition-colors flex items-center gap-1"
              >
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.278 2.101-.75 3.732-3.042 6.78-6.042 6.78-6.042s3.048 3 6.78 6.042c.568.472 1.295.75 2.101.75.633 0 1.183-.228 1.617-.608.434-.38.683-.894.683-1.442 0-1.104-.896-2-2-2-.548 0-1.062.249-1.442.683-.38.434-.608.984-.608 1.617 0 .806.278 1.533.75 2.101 3.042 3.732 6.042 6.78 6.042 6.78s-3 3.048-6.042 6.78c-.472.568-.75 1.295-.75 2.101 0 .633.228 1.183.608 1.617.38.434.894.683 1.442.683 1.104 0 2-.896 2-2 0-.548-.249-1.062-.683-1.442-.434-.38-.984-.608-1.617-.608-.806 0-1.533.278-2.101.75-3.732 3.042-6.78 6.042-6.78 6.042s-3.048-3-6.78-6.042c-.568-.472-1.295-.75-2.101-.75-.633 0-1.183.228-1.617.608-.434.38-.683.894-.683 1.442 0 1.104.896 2 2 2 .548 0 1.062-.249 1.442-.683.38-.434.608-.984.608-1.617 0-.806-.278-1.533-.75-2.101-3.042-3.732-6.042-6.78-6.042-6.78s3-3.048 6.042-6.78c.472-.568.75-1.295.75-2.101 0-.633-.228-1.183-.608-1.617-.434-.38-.894-.683-1.442-.683-1.104 0-2 .896-2 2 0 .548.249 1.062.683 1.442.38.434.984.608 1.617.608z" />
                </svg>
                {comment.likes > 0 && comment.likes}
              </button>
              {!isReply && (
                <button
                  onClick={() =>
                    onReplyTo(replyTo === comment.id ? null : comment.id)
                  }
                  className="text-xs text-gray-400 hover:text-primary-500 transition-colors"
                >
                  Trả lời
                </button>
              )}
              {comment.isOwner && (
                <>
                  <button
                    onClick={() => onEdit(comment.id, comment.content)}
                    className="text-xs text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() =>
                      isReply && parentId
                        ? onDeleteReply(comment.id, parentId)
                        : onDelete(comment.id)
                    }
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Xóa
                  </button>
                </>
              )}
            </div>
          )}

          {!isReply && replyTo === comment.id && (
            <div className="mt-3 flex gap-3">
              <Textarea
                value={replyContent}
                onChange={(e) => onReplyContent(e.target.value)}
                placeholder="Viết trả lời..."
                rows={2}
                className="rounded-xl text-sm flex-1"
              />
              <button
                onClick={onSubmitReply}
                disabled={!replyContent.trim()}
                className="self-end px-4 py-2 rounded-full bg-primary-500 text-white text-xs font-medium disabled:opacity-50"
              >
                Gửi
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <div key={reply.id} className="mt-4">
          <CommentItem
            comment={reply}
            replyTo={replyTo}
            replyContent={replyContent}
            editingId={editingId}
            editContent={editContent}
            onReplyTo={onReplyTo}
            onReplyContent={onReplyContent}
            onSubmitReply={onSubmitReply}
            onLike={onLike}
            onEdit={onEdit}
            onEditContent={onEditContent}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onDelete={onDelete}
            onDeleteReply={onDeleteReply}
            onSaveEditReply={onSaveEditReply}
            isReply
            parentId={comment.id}
          />
        </div>
      ))}
    </div>
  );
}
