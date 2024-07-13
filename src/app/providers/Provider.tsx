'use client';

import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

export function Provider({ children }: { children: React.ReactNode }) {

    return (
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
    );
}