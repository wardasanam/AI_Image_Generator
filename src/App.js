import { Container, CssBaseline } from '@mui/material';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <>
      <CssBaseline />
<Container 
  maxWidth="lg" 
  sx={{ 
    py: 8,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center', // Vertically center content
    justifyContent: 'center',
    background: 'radial-gradient(circle at top, #f5f7fa 0%, #e4e8ed 100%)'
  }}
>
  <ImageGenerator />
</Container>
    </>
  );
}

export default App;