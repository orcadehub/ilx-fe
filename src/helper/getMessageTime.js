export function formatMessageTime(timestamp) {
 const messageDate = new Date(timestamp);
 const now = new Date();

 const diffMs = now - messageDate; // difference in milliseconds
 const diffHours = diffMs / (1000 * 60 * 60);

 const isToday = now.toDateString() === messageDate.toDateString();

 // Helper to format time like "8:40 AM"
 const formatTime = (date) => {
  return date.toLocaleTimeString("en-IN", {
   hour: "numeric",
   minute: "2-digit",
   hour12: true,
  });
 };

 if (diffHours < 24 && isToday) {
  // Within same day → show time
  return formatTime(messageDate);
 } else if (diffHours < 48 && now.getDate() - messageDate.getDate() === 1) {
  // Within 24–48 hours → Yesterday
  return "Yesterday";
 } else {
  // Older → show date like "6 Oct" or "06 Oct"
  return messageDate.toLocaleDateString("en-IN", {
   day: "numeric",
   month: "short",
  });
 }
}
