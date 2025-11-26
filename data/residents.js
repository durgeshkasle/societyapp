// Resident data for Shree Sai Dham Co.Op. Housing Society
export const residents = [
  // Ground Floor
  { flatNumber: '001', name: 'ANSHUMAN KOSAMBIA' },
  { flatNumber: '002', name: 'UMA VHOTKAR' },
  { flatNumber: '003', name: 'SANJAY KUMAR' },
  { flatNumber: '004', name: 'AARTI GAIKWAD' },
  
  // First Floor
  { flatNumber: '101', name: 'SADASHIV DHURI' },
  { flatNumber: '102', name: 'PRAVIN PALANDE' },
  { flatNumber: '103', name: 'MANISH RAI' },
  { flatNumber: '104', name: 'BALIRAM PALANDE' },
  
  // Second Floor
  { flatNumber: '201', name: 'SHOBHA SONAWANE' },
  { flatNumber: '202', name: 'VIJAY KUMAWAT' },
  { flatNumber: '203', name: 'LEENA WARADKAR' },
  { flatNumber: '204', name: 'ANIL KUMAR KHOT' },
  
  // Third Floor
  { flatNumber: '301', name: 'KISHAN PRAJAPATI' },
  { flatNumber: '302', name: 'BARBOZA' },
  { flatNumber: '303', name: 'DIMPLE R. SUTHAR' },
  { flatNumber: '304', name: 'BALKRISHNA KELKAR' },
  
  // Fourth Floor
  { flatNumber: '401', name: 'RAMDAS KASLE' },
  { flatNumber: '402', name: 'HEMANT KASLE' },
];

// Helper function to get resident name by flat number
export const getResidentNameByFlatNumber = (flatNumber) => {
  const resident = residents.find((r) => r.flatNumber === flatNumber);
  return resident ? resident.name : '';
};

