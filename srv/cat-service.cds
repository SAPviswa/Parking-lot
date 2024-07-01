using parkinglot.lot as lot from '../db/data-model';
@Path: 'Parkinglots'
service CatalogService {
     entity Parkingslots as projection on lot.Parkingslots;
     entity Parkinglot_Allotment as projection on lot.Parkinglot_Assign;
     entity Parkinglot_UnAssign as projection on lot.Parkinglot_UnAssign;
     entity ParkingHistory as projection on lot.ParkingHistory;
}
