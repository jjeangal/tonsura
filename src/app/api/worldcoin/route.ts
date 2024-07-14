import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';
import { NextResponse } from 'next/server'; // Make sure you're importing NextResponse

export async function POST(request: Request) {
    const { proof, signal } = await request.json();

    const app_id = 'app_staging_b3f1d126732396a06f9848b2d2dae3af';
    const action = 'verify-your-identity';

    try {
        const verifyRes = (await verifyCloudProof(proof, app_id, action, signal)) as IVerifyResponse;

        if (verifyRes.success) {
            // user is verified
            return NextResponse.json(verifyRes, { status: 200 });
        } else {
            // user is not verified
            return NextResponse.json(verifyRes, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
