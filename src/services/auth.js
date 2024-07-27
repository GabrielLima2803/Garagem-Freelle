import api from '@/plugins/axios';

export default class AuthService {
  async postUserToken(token) {
    try {
      const response = await api.get("/usuarios/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API response:', response); 
      return response.data;
    } catch (error) {
      console.error('API request error:', error); 
      throw error;
    }
  }
}
