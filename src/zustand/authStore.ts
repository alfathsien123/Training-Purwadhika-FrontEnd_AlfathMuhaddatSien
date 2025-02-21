import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const authStore = create(persist((set) => ({
    //Global State
    token: '',
    email: "",
    role: "",
    name: "",

    setAuth: ({ token, email, role, name }:  { token: string, email: string, role: string, name: string}) => set({ token, email, role, name })
}), 
// Persist LocalStorage
{
    name: "authToken",
    partialize: (state: any) => ({ token: state.token })
}))

export default authStore;