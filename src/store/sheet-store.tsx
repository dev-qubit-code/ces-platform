import type {ReactNode} from 'react';
import {create} from 'zustand';
type TAction = {
  text: string;
  formId?: string;
  className?: string;
  onClick?: () => void;
};
export type SheetProps = {
  title: string;
  description: string;
  content: ReactNode;
  className?: string;
  primaryAction?: TAction;
  secondaryAction?: TAction;
};
export type TAppSheet = {
  sheet: SheetProps | null;
  setSheet: (value: SheetProps) => void;
  onClose: () => void;
};

export const useAppSheet = create<TAppSheet>(set => ({
  sheet: null,
  onClose: () => {
    set({sheet: null});
  },
  setSheet: value => {
    set({sheet: value});
  }
}));
