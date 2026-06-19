// Maps each application status to a color used for pills and card borders
export const statusStyles = {
  'Applied': { color: '#2563EB', soft: '#EFF6FF' },
  'Interview Scheduled': { color: '#D97706', soft: '#FEF3E2' },
  'Interviewed': { color: '#D97706', soft: '#FEF3E2' },
  'Offer': { color: '#059669', soft: '#ECFDF5' },
  'Rejected': { color: '#DC2626', soft: '#FEF2F2' },
  'Withdrawn': { color: '#6B7280', soft: '#F3F4F6' }
};

export function getStatusStyle(status) {
  return statusStyles[status] || statusStyles['Applied'];
}