import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.query.mode === 'on') {
    return res.setPreviewData({}).status(200).json({ message: 'preview mode on' });
  }
  return res.clearPreviewData().status(200).send('preview mode off, use `/api/preview?mode=on` to enable');
}
