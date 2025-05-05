export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Format the date part (e.g., "May 2, 2025")
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Format the time part (e.g., "7:10:33 PM")
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return `${formattedDate} at ${formattedTime}`;
}
