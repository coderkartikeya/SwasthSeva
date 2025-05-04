interface HospitalData {
  hospitalID: string;
  hospitalName: string;
  contactPersonName: string;
  // ... other fields
}

export const extractNames = (data: HospitalData) => {
  // Extract hospital name
  const hospitalName = data.hospitalName.trim();
  
  // Extract contact person name
  const contactName = data.contactPersonName.trim();
  
  // Split contact name into parts
  const nameParts = contactName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  
  return {
    hospitalName,
    contactName,
    firstName,
    lastName
  };
};

export const formatForBlockchain = (data: HospitalData) => {
  const names = extractNames(data);
  
  return {
    hospitalId: data.hospitalID,
    hospitalName: names.hospitalName,
    contactPerson: {
      fullName: names.contactName,
      firstName: names.firstName,
      lastName: names.lastName
    },
    timestamp: new Date().toISOString(),
    // Add any other relevant data you want to store in blockchain
  };
}; 