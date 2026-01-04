import { create } from 'zustand';

interface ReplyState {
  isReplying: boolean;
  nickname: string;
  parentId: number | null;
  replyContent: string;

  startReply: (parentCommentCreatorNickname: string, parentId: number) => void;
  cancelReply: () => void;
  setReplyContent: (content: string) => void;
  clearReplyContent: () => void;
}

export const useReplyStore = create<ReplyState>(set => ({
  isReplying: false,
  nickname: '',
  parentId: null,
  replyContent: '',

  startReply: (nickname, parentId) => set({ isReplying: true, nickname, parentId }),

  cancelReply: () => set({ isReplying: false, nickname: '', parentId: null, replyContent: '' }),

  setReplyContent: (content: string) => set({ replyContent: content }),

  clearReplyContent: () => set({ replyContent: '' }),
}));
