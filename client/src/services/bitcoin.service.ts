import axios from 'axios';
import type{ MempoolAddressResponse } from '@/types';

const BTC_API_URL : string  = "https://mempool.space/api/address";

//to be used when pool upload is available
export const getBitcoinBalance = async (address: string): Promise<string> => {
    try {
        const response = await axios.get<MempoolAddressResponse>(`${BTC_API_URL}/${address}`);
        
        const chain_stats  = response.data.chain_stats;
        const mempool_stats = response.data.mempool_stats; // Pending txs

        const currentSatoshis = 
            (chain_stats.funded_txo_sum - chain_stats.spent_txo_sum) +
            (mempool_stats.funded_txo_sum - mempool_stats.spent_txo_sum);

        // Converts Satoshis to BTC
        return (currentSatoshis / 100_000_000).toFixed(8);
    } catch (error) {
        console.error(`Error fetching BTC for ${address}:`, error);
        return "0.00000000";
    }
};