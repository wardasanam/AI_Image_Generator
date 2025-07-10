import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  CircularProgress, 
  Box, 
  Paper, 
  Typography,
  IconButton,
  styled 
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PaletteIcon from '@mui/icons-material/Palette';

// ======================
// Styled Components
// ======================
const GradientPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  maxWidth: '800px',
  margin: '2rem auto',
  border: '1px solid rgba(0, 0, 0, 0.05)'
}));

const CreativeTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    fontSize: '1.1rem',
    '& fieldset': {
      borderColor: '#e0e0e0',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: '#4361ee',
      boxShadow: '0 0 0 4px rgba(67, 97, 238, 0.1)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4361ee',
      boxShadow: '0 0 0 4px rgba(67, 97, 238, 0.2)'
    },
  },
}));

const GenerateButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.8, 5),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '16px',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #4361ee 0%, #3f37c9 100%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(135deg, #3a56d4 0%, #3a0ca3 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(67, 97, 238, 0.3)'
  },
  '&:disabled': {
    background: '#e9ecef',
    color: '#adb5bd',
    transform: 'none !important'
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

// ======================
// Main Component
// ======================
export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://your-backend-url.vercel.app/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) throw new Error(await response.text());
      
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `ai-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <GradientPaper elevation={0}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <PaletteIcon sx={{ 
          fontSize: 48, 
          color: '#4361ee', 
          mb: 1,
          background: 'linear-gradient(135deg, rgba(67,97,238,0.1) 0%, rgba(63,55,201,0.1) 100%)',
          padding: 2,
          borderRadius: '50%'
        }} />
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: '#2b2d42',
          mb: 1
        }}>
          AI Image Generator
        </Typography>
        <Typography variant="body1" sx={{ 
          color: '#6c757d',
          mb: 3
        }}>
          Describe your vision and let AI create it
        </Typography>
      </Box>

      <CreativeTextField
        fullWidth
        label="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
        sx={{ mb: 3 }}
      />
      
      <Box sx={{ textAlign: 'center' }}>
        <GenerateButton
          variant="contained"
          onClick={generateImage}
          disabled={loading}
          disableElevation
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            '✨ Generate Magic'
          )}
        </GenerateButton>
      </Box>

      {error && (
        <Typography color="error" sx={{ 
          mt: 3, 
          p: 2,
          borderRadius: '12px',
          backgroundColor: '#fff0f0',
          textAlign: 'center'
        }}>
          {error}
        </Typography>
      )}

      {image && (
        <Box sx={{ 
          mt: 4,
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.05)'
        }}>
          <img 
            src={image} 
            alt={prompt} 
            style={{ 
              width: '100%',
              display: 'block'
            }}
          />
          <IconButton
            onClick={handleDownload}
            sx={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.9)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.3s ease',
              width: '48px',
              height: '48px'
            }}
          >
            <DownloadIcon fontSize="medium" />
          </IconButton>
        </Box>
      )}
    </GradientPaper>
  );
}