import api from "./api";

export const getProduct = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "fetch failed";
    }
};

export const getProductDetails = async (id: string) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "fetch detail failed";
    }
};

export const getProductByCategory = async (category: string) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "fetch detail failed";
    }
};

export const searchProducts = async (query: string) => {
    try {
        if (!query || query.trim() === "") {
            return { results: [], query: "", count: 0 };
        }
        const response = await api.get(`/products/search`, {
            params: { q: query.trim() }
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data || "search failed";
    }
};

