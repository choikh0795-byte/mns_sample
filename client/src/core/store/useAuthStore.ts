/**
 * Auth Store
 * 인증 상태 관리 (프로토타입: 어떤 계정 정보로든 로그인 가능)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        if (!email || !password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }
        // 프로토타입: 어떤 계정 정보로든 로그인 허용
        const namePart = email.split('@')[0] || '관리자';
        set({
          user: {
            id: '1',
            email,
            name: namePart,
            role: 'HR 매니저',
            department: '인사팀',
            avatar: namePart.substring(0, 2).toUpperCase(),
          },
          token: 'prototype-token-' + Date.now(),
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
