import {create} from 'zustand'

const useConversationStore=create((set)=>({
    conversation:[],
    updateConversation:(conversation)=>set({conversation:conversation}),
}));

export default useConversationStore;