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
    dateDelivery: string;
    dateRecipt: string;
    total: number;
    order: string;
    client?: Client;
    service?: Service;
}

export default Order;