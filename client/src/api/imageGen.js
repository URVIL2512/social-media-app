import axios from 'axios';

export const generateImage = (prompt) => axios.post('/api/image/generate', { prompt }).then(r => r.data);
