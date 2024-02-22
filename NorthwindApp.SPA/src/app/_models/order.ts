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
    regionId:       number;
    shipPostalCode: string;
    shipCountry:    string;
}
