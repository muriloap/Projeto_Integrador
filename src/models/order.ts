import Client from "./client";
import Product from "./product";
import Service from "./service";

type Order = {
    id: number;
    clientId: number;
    serviceId: number;
    equipment: string;
    defect: string;
    report: string;
    guarantee: string;
    status: string;
    dateCreate: string;
    dateDelivery: string;
    dateRecipt: string;
    total: number;
    totalProducts: number;
    totalService: number;
    client?: Client;
    service?: Service;
    ordens: number;
    shops?: {
        id: number;
        productId: number;
        amount: number;
        salePrice: number;
        product?: Product;
    }[];
    
}

export default Order;