'use client'

import React from 'react';
import  { AddYourOwn } from '../components/AddYourOwn';
interface PageProps {
    
}

const Page: React.FC<PageProps> = ({  }) => {
    return (
        <div>
           <AddYourOwn />
        </div>
    );
};

export default Page;