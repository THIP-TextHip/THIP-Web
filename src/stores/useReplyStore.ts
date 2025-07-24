import { create } from 'zustand';

interface ReplyState {
  isReplying: boolean;
  targetUserName?: string;
  parentId: number | null;
  replyContent: string;

  startReply: (userName: string, parentId: number) => void;
  cancelReply: () => void;
  setReplyContent: (content: string) => void;
  clearReplyContent: () => void;
}

export const useReplyStore = create<ReplyState>(set => ({
  isReplying: false,
  targetUserName: '',
  parentId: null,
  replyContent: '',

  startReply: (userName, parentId) => set({ isReplying: true, targetUserName: userName, parentId }),

  cancelReply: () => set({ isReplying: false, targetUserName: '', parentId: null }),

  setReplyContent: (content: string) => set({ replyContent: content }),

  clearReplyContent: () => set({ replyContent: '' }),
}));
