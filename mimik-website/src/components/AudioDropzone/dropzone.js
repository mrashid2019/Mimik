import { Paper } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
    setFileName(acceptedFiles[0].name);
  }, []);

  const playAudio = () => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const audio = new Audio(fileReader.result);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    };
    fileReader.readAsDataURL(files[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/wav': [] },
  });

  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': { border: '1px solid #ccc' },
          marginLeft:'10%',
          marginRight:'10%',
          marginBottom:'3%'
        }}
      >
        <div style={{ padding: '16px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: 'green' }}>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          <em>(audio files with *.wav extension will only be accepted)</em>
        </div>
      </Paper>
      {files.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px', marginLeft:'10%' }}>
            <button onClick={playAudio} disabled={isPlaying} style={{ backgroundColor:'#6969a7',marginRight: '16px', width: '10%',
              borderRadius: '25px', color: 'white' }}>
              {isPlaying ? 'Playing...' : 'Play'}
            </button>
            <span>{fileName}</span>
          </div>
        </>
      )}
    </>
  );
};

export default Dropzone;
