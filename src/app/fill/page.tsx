'use client'

import React from 'react';
import { RegisterSong } from '../components/RegisterSong';
import { SongDetails } from '../components/SongDetails';

interface PageProps {
    isMissing?: boolean;
}

const Page: React.FC<PageProps> = ({ isMissing }) => {
    return (
        <div>
            {isMissing ? <SongDetails /> : <RegisterSong />}
        </div>
    );
};

export default Page;