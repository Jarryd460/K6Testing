export function formatDate(date: Date) {
	let hours = date.getHours();
	let minutes: number | string = date.getMinutes();
	const ampm = hours >= 12 ? "pm" : "am";
	hours %= 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? "0" + String(minutes) : minutes;
	const strTime = String(hours) + ":" + String(minutes) + " " + ampm;
	return (
		String(date.getMonth() + 1) +
		"/" +
		String(date.getDate()) +
		"/" +
		String(date.getFullYear()) +
		"  " +
		strTime
	);
}
