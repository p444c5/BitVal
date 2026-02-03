export type IParticipant = {
  _id: string | number;
  name: string;
  deposit: number;
  status?: "active" | "matched" | "allocated" | "completed";
  walletAddress: string;
  amountAllocated?: number;
  pairedWith?: string | null;
  isPaired?: boolean;
  createdAt?: string;
};

export interface IParticipantStore {
  participants: IParticipant[];
  rawParticipants: IParticipant[];
  loading: boolean;
  error: string | null;
  count: number;
  pool: number;
  loadParticipants: () => Promise<void>;
}

export interface UIParticipant extends Omit<IParticipant, "_id" | "deposit"> {
  id: string | number;
  giftValue?: number;
  joinedDate: string;
}

export interface UIParticipantGridProps {
  participants: UIParticipant[];
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  truncateAddress: (address: string) => string;
  copyToClipboard: (address: string, id: string | number) => void;
  copiedId: string | number | null;
}

export interface Pair {
  id: number;
  from: string;
  fromValue: number;
  to: string;
  toValue: number;
  timestamp: string;
  status: string;
}

export interface PairCardProps {
  pair: Pair;
}
export interface NewParticipant extends Omit<IParticipant, "id"> {
  id?: string | number;
}

export type BtcCtxStats = {
    funded_txo_count: number;
    funded_txo_sum: number; 
    spent_txo_count: number;
    spent_txo_sum: number; 
    tx_count: number;
}


export interface MempoolAddressResponse {
    address: string;
    chain_stats: BtcCtxStats;
    mempool_stats: BtcCtxStats;
}