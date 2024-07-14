import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(request: NextRequest) {
    const { id, name, title, links, thumbnail, tags } = await request.json();

    const body = {
        id,
        name,
        title,
        links,
        thumbnail,
        tags,
    };

    try {
        // Define the file path
        const filePath = path.join(process.cwd(), 'public', `song${id}.json`);

        // Write the JSON data to the file
        fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

        const file = fs.createReadStream(filePath);

        const formData = new FormData();

        formData.append('file', file);

        const response = await axios.post('https://api.thegraph.com/ipfs/api/v0/add', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        const { Hash } = response.data;
        console.log(`File uploaded to Graph IPFS: https://api.thegraph.com/ipfs/api/v0/cat?arg=${Hash}`);

        return NextResponse.json({ message: Hash });
    } catch (error) {
        console.error('Error saving file:', error);
        return NextResponse.json({ error: 'Error saving file' }, { status: 500 });
    }
}
