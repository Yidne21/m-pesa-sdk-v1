export const validatePhoneNumber = (phone: string): boolean => {
  return /^251\d{8,9}$/.test(phone);
};
