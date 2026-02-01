import React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
                {title}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {subtitle}
            </p>
        </div>
    );
};

export default Hero;