export interface Employee {
    employeeId:      number;
    lastName:        string;
    firstName:       string;
    title:           string;
    titleOfCourtesy: string;
    birthDate:       Date;
    hireDate:        Date;
    address:         string;
    city:            string;
    regionId:        number;
    postalCode:      string;
    country:         string;
    homePhone:       string;
    extension:       string;
    photo:           string;
    notes:           string;
    reportsTo:       number;
    photoPath:       string;
}
