import Client from "./client";
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
    client?: Client;
    service?: Service;
    shops?: {
        productId: number;
        amount: number;
        salePrice: number;
    }[];
}

export default Order;