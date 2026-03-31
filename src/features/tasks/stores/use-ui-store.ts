import { create } from 'zustand'

type TaskView = 'board' | 'list'

type UIStore = {
  taskView: TaskView
  setTaskView: (view: TaskView) => void
}

export const useUIStore = create<UIStore>((set) => ({
  taskView: 'board',
  setTaskView: (view) => set({ taskView: view }),
}))
