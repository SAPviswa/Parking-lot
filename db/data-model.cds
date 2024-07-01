namespace parkinglot.lot;

using {cuid} from '@sap/cds/common';

entity Parkingslots {
  key slotno : String;
      type   : String enum {
        Inward;
        Outward;
      };
      parkinglotAssign : Association to Parkinglotassign;
}

entity Parkinglotassign {
  key vehicleNo    : String;
      driverName   : String;
      PhoneNo      : String;
      time         : DateTime;
      status       : String;
      parkingslots : Association to Parkingslots;
}

entity Parkinglot_UnAssign : cuid {
  status           : String;
  time             : DateTime;
  parkinglotAssign : Association to Parkinglotassign;
}

entity ParkingHistory : cuid {
  parkingslots       : Association to Parkingslots;
  parkinglotAssign   : Association to Parkinglotassign;
  parkinglotunassign : Association to Parkinglot_UnAssign;
  event              : String; // Description of the event or change
}
