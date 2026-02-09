import api from "@/api";
import { toast } from "sonner";

export const pairParticipants = async () => {
    try {
        const response = await api.post('admin/pair');
        return response.data;
    } catch (error: any) {
        console.error('Error pairing participants:', error);
        toast.error("Failed to pair participants.", {
            duration: 4000
        });
        throw error;
    }
};

export const distributeGifts = async () => {
    try {
        const response = await api.post('/admin/distribute');
        return response.data;
    } catch (error: any) {
        console.error('Error distributing gifts:', error);
        toast.error("Failed to distribute gifts.", {
            duration: 4000
        });
        throw error;
    }
};