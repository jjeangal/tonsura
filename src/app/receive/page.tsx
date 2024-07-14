'use client'

import React from 'react';
import  { SongPlatforms } from '../components/SongPlatform';
const platforms = [
    { name: "Deezer", icon: "D" },
    { name: "Apple Music", icon: "A" },
    { name: "Spotify", icon: "S" },
  ];
  
interface PageProps {
    
}

const Page: React.FC<PageProps> = ({  }) => {
    return (
        <div>
           <SongPlatforms />
        </div>
    );
};

export default Page;