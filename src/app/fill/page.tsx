'use client'

import React from 'react';
import { RegisterSong } from '../components/RegisterSong';
import { SongDetails } from '../components/SongDetails';

const Fill: React.FC<{ isMissing?: boolean }> = ({ isMissing = false }) => {
    return (
        <div>
            {isMissing ? <SongDetails /> : <RegisterSong />}
        </div>
    );
};

export default Fill;