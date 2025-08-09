import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function FileUploader() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from('uploads') // your bucket name
      .upload(`public/${file.name}`, file);

    if (error) {
      console.error('Upload error:', error.message);
    } else {
      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(`public/${file.name}`);
      setUrl(urlData.publicUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && <p>File URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
    </div>
  );
}

export default FileUploader;