import { create } from 'zustand';

interface CommentBottomSheetState {
  isOpen: boolean;
  postId: number | null;
  postType: 'RECORD' | 'VOTE' | null;
}

interface CommentBottomSheetActions {
  openCommentBottomSheet: (postId: number, postType: 'RECORD' | 'VOTE') => void;
  closeCommentBottomSheet: () => void;
}

export const useCommentBottomSheetStore = create<
  CommentBottomSheetState & CommentBottomSheetActions
>(set => ({
  isOpen: false,
  postId: null,
  postType: null,

  openCommentBottomSheet: (postId: number, postType: 'RECORD' | 'VOTE') =>
    set({ isOpen: true, postId, postType }),

  closeCommentBottomSheet: () => set({ isOpen: false, postId: null, postType: null }),
}));
