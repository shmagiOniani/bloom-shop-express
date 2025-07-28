import api from "@/lib/axios";


export const userService = {
    updateUserStatus: async (id: any, type: string) => {
        const response = await api.put(`/user/status-update/${id}`, {type});
        return response.data;
      },
      getUsers: async () => {
        const response = await api.get('/user');
        return response.data;
      }
  }