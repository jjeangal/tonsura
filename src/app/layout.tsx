import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./providers/Provider";
import { Flex, Link, Image, Box, Heading, Text } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main>
            <Text>
              Header
            </Text>
            <Flex
              align="flex-start"
              justify="space-between"
              mx="40px"
            >
              {children}
            </Flex>
          </main>
        </Provider>
      </body>
    </html>
  );
}
