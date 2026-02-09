import { useState } from 'react';
import { toast } from 'sonner';
import { useParticipantsContext } from '@/context/ParticipantContext';
import { bulkUploadParticipants, addParticipant } from '@/services/participants.service';
import type {  UseParticipantsManagerReturn,FormData,  NewParticipant } from '@/types';
import type { ChangeEvent, FormEvent } from 'react';



export const useParticipantsManager = (): UseParticipantsManagerReturn => {
    const { rawParticipants, loadParticipants } = useParticipantsContext();
    const [uploading, setUploading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    
    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        deposit: '',
        walletAddress: ''
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            toast.info(`Selected file: ${e.target.files[0].name}`);
        }
    };

    const handleBulkUpload = async () => {
        if (!file) {
            toast.warning("Please select a file first"); 
            return;
        }
        setUploading(true);
        try {
            await bulkUploadParticipants(file);
            loadParticipants();
            setFile(null);
        } catch (error) {
            console.error('Upload failed hook level', error);
        } finally {
            setUploading(false);
        }
    };
    
    const handleDeleteParticipant = async (id: string | number) => {
        console.log("Delete logic (mock)", id);
        
    };


    const openModal = () => setIsModalOpen(true);
    
    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', deposit: '', walletAddress: '' }); // Reset form
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNewParticipantSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.deposit || !formData.walletAddress) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
             const payload: NewParticipant = {
                name: formData.name,
                deposit: Number(formData.deposit), 
                walletAddress: formData.walletAddress
            };

            await addParticipant(payload);
            loadParticipants();
            closeModal();
           
        } catch (error) {
            console.error("Failed to create participant", error);
        }
    };

    return {
        rawParticipants,
        uploading,
        file,
        isModalOpen,
        formData,
        handleFileChange,
        handleBulkUpload,
        handleDeleteParticipant,
        openModal,
        closeModal,
        handleInputChange,
        handleNewParticipantSubmit
    };
};
