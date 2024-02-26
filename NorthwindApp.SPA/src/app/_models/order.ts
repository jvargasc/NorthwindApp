import { OrderDetail } from "./orderdetail";

export interface Order {
    orderId:        number;
    customerId:     number;
    employeeId:     number;
    orderDate:      Date;
    requiredDate:   Date;
    shippedDate:    Date;
    shipperId:      number;
    freight:        number;
    shipName:       string;
    shipAddress:    string;
    shipCity:       string;
    shipRegion:     string;
    shipPostalCode: string;
    shipCountry:    string;
    order_Details:  OrderDetail[];
}
