import api from "@/api";
import { toast } from "sonner";
import type { NewParticipant } from "@/types";

export const getAllParticipants = async () => {
  try {
    const response = await api.get("/participants");
    return response.data;
  } catch (error:any) {
    
    console.error("Error fetching participants:", error);
    toast.error("Failed to fetch participants");
    throw error;
  }
};

export const addParticipant = async (participantData:NewParticipant) => {
  try {
    const response = await api.post("/newparticipant", participantData);
    return response.data;
  } catch (error: any) {
    console.error("Error adding participant:", error);
    toast.error("Failed to add participant");
    throw error;
  }
};

export const bulkUploadParticipants = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post("/participants/bulk-upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error uploading participants:", error);
    toast.error("Failed to upload participants");
    throw error;
  }
};