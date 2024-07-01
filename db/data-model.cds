namespace parkinglot.lot;

using {cuid} from '@sap/cds/common';

entity Parkingslots {
  key slotno : String;
      type   : String enum {
        Inward;
        Outward;
      };
}

entity Parkinglot_Assign {
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
  parkinglotassign : Association to Parkinglot_Assign;
}

entity ParkingHistory : cuid {
  parkingslots       : Association to Parkingslots;
  parkinglotassign   : Association to Parkinglot_Assign;
  parkinglotunassign : Association to Parkinglot_UnAssign;
  event              : String; // Description of the event or change
}
