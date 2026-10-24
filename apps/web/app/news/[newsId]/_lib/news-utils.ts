'use client';
export const getNewsStatus = (date: string): 'منتهي' | 'قادم' => {
  return new Date(date).getTime() < Date.now() ? 'منتهي' : 'قادم';
};

export const formatNewsDate = (date: string): string => {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T00:00:00Z`));
};

export const generateGoogleCalendarUrl = (title: string, description: string, date: string): string => {
  const eventTitle = encodeURIComponent(title);
  const eventDetails = encodeURIComponent(description);
  const eventDate = date.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&dates=${eventDate}T000000Z/${eventDate}T235959Z`;
};
