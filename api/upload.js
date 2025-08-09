// api/upload.js
import { Octokit } from '@octokit/rest';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, programType, files } = req.body;

  if (!fullName || !email || !programType || !files || files.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const owner = 'i-am-ayo';           // Your GitHub username
  const repo = 'chinaedulink';        // Your repo name
  const branch = 'main';

  try {
    for (const file of files) {
      const { name, content } = file;
      const path = `${programType}/${Date.now()}_${fullName.replace(/\s+/g, '_')}_${name}`;

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: `Upload: ${path}`,
        content,
        branch,
      });
    }

    return res.status(200).json({ message: 'Files uploaded to GitHub successfully!' });
  } catch (error) {
    console.error('GitHub upload error:', error);
    return res.status(500).json({ error: 'Failed to upload files to GitHub' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};