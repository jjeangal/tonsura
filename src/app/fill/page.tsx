'use client'

import React from 'react';
import { RegisterSong } from '../components/RegisterSong';
import { SongDetails } from '../components/SongDetails';

interface FillProps {
    isMissing?: boolean;
}

const Fill: React.FC<FillProps> = ({ isMissing = false }) => {
    return (
        <div>
            {isMissing ? <SongDetails /> : <RegisterSong />}
        </div>
    );
};

export default Fill;