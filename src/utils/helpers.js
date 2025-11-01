// Format date to "Month DD, YYYY, HH:MM AM/PM" format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleDateString('en-US', options);
};

// Format phone number
export const formatPhone = (phone) => {
  return phone;
};

// Truncate email if too long
export const truncateEmail = (email, maxLength = 30) => {
  return email.length > maxLength ? `${email.substring(0, maxLength)}...` : email;
};
