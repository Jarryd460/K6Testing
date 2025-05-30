export class DateHelper {
	static formatDate(date: Date) {
		let hours = date.getHours();
		let minutes: number | string = date.getMinutes();
		const ampm = hours >= 12 ? "pm" : "am";
		hours %= 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		const strTime = hours + ":" + minutes + " " + ampm;
		return (
			date.getMonth() +
			1 +
			"/" +
			date.getDate() +
			"/" +
			date.getFullYear() +
			"  " +
			strTime
		);
	}
}
