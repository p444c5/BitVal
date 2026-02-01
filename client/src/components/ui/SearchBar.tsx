import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    value, 
    onChange, 
    placeholder = "Search...", 
    className = "" 
}) => {
    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700/20 text-white placeholder-gray-500 focus:border-rose-900/80 focus:outline-none transition-colors"
            />
        </div>
    );
};

export default SearchBar;