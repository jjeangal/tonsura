import { NextApiRequest, NextApiResponse } from 'next';
import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { proof, signal } = req.body;
    const app_id = 'app_staging_b3f1d126732396a06f9848b2d2dae3af';
    const action = 'verify-your-identity';
    
    try {
        const verifyRes = (await verifyCloudProof(proof, app_id, action, signal)) as IVerifyResponse;
        
        if (verifyRes.success) {
            // user is verified
            res.status(200).send(verifyRes);
        } else {
            // user is not verified
            res.status(400).send(verifyRes);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
