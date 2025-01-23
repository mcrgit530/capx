import axios from "axios";

const BASE_URL =process.env.REACT_APP_BACKEND_URL + "/api/stocks";
const stockService = {
  getAllStocks: async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  },
  addStock: async (stock) => {
    const response = await axios.post(`${BASE_URL}`, stock);
    return response.data;
  },
  updateStock: async (id, stock) => {
    const response = await axios.put(`${BASE_URL}/${id}`, stock);
    return response.data;
  },
  deleteStock: async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  },
};

export default stockService;
