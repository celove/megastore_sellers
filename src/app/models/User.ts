
export interface User {
        id: string,
        name: string,
        username: string,
        cnpj: string,
        email: string,
        storeName: string,
        phone: string,
        password: string,
        address: {
          cep: string,
          street: string,
          number: string,
          complement: string,
          state: string,
          city: string,
          neighborhood: string
    
        }
}