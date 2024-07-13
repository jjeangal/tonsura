import pinataSDK from "@pinata/sdk";

const jwt = process.env.PINATA_API_JWT || "";

export async function POST(request: Request) {

    const pinata = new pinataSDK({ pinataJWTKey: jwt });
    const { id, name, title, links } = await request.json();

    const body = {
        id: id,
        name: name,
        title: title,
        links: links,
    };

    const response = await pinata.pinJSONToIPFS(body, { pinataMetadata: { name: "song" + id + ".json" } });

    const data = await response.IpfsHash;

    return Response.json({ data })
};