import { atom } from 'recoil';

import { IStep } from '@chainlit/react-client';

export interface IVCLastThread {
  threadId: string | null;
  messages: IStep[];
  timestamp: number;
}

const getLastConversationFromStorage = (): IVCLastThread => {
  const stored = localStorage.getItem('lastThread');
  return stored
    ? JSON.parse(stored)
    : {
        threadId: null,
        messages: [],
        timestamp: 0
      };
};

export const vcLastThreadState = atom<IVCLastThread>({
  key: 'LastThread',
  default: getLastConversationFromStorage(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('lastThread', JSON.stringify(newValue));
      });
    }
  ]
});
