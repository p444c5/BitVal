import api from "@/api";
import { toast } from "sonner";
import type { NewParticipant } from "@/types";
import type { AxiosError } from "axios";

export const getAllParticipants = async () => {
  try {
    const response = await api.get("/participants");
    return response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Failed to fetch participants");
    throw error;
  }
};

export const addParticipant = async (participantData: NewParticipant) => {
  const toastId = toast.loading("Adding participant...");
  
  try {
    const response = await api.post("admin/newparticipant", participantData);
    toast.success("Participant added successfully", { id: toastId });
    return response.data;
  } catch (error) {
    console.error("Error adding participant:", error);
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Failed to add participant", { id: toastId });
    throw error;
  }
};

export const bulkUploadParticipants = async (file: File) => {
  const toastId = toast.loading("Processing bulk upload...");

  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post("admin/participants/bulk-upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    toast.success("Participants uploaded successfully", { id: toastId });
    return response.data;
  } catch (error) {
    console.error("Bulk upload failed:", error);
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Bulk upload failed.", { id: toastId });
    return false; 
  }
};