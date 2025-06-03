import axios from 'axios';
import { ref } from 'vue';

const BASE_URL = 'http://127.0.0.1:8000/api/accounting-billing/employees/';

export function useApi() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiRequest = async (url: string, method: 'get' | 'post' | 'put' | 'delete', data?: any) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios({
        url: `${BASE_URL}/${url}`,
        method,
        data,
      });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      error.value = err.message || 'An error occurred';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, apiRequest };
}
