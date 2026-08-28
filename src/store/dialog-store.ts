import type {ReactNode} from 'react';
import {create} from 'zustand';

type TAction = {
  text: string;
  formId?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export type DialogProps = {
  title: string;
  description?: string;
  content: ReactNode;
  className?: string;
  primaryAction?: TAction;
  secondaryAction?: TAction;
};

export type TAppDialog = {
  dialog: DialogProps | null;
  setDialog: (value: DialogProps) => void;
  onClose: () => void;
};

export const useAppDialog = create<TAppDialog>(set => ({
  dialog: null,

  setDialog: value => {
    set({dialog: value});
  },

  onClose: () => {
    set({dialog: null});
  }
}));
