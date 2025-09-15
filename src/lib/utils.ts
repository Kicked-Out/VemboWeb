import { clsx, type ClassValue } from "clsx";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export function cn(...inputs: any[]): string {
	// Простий варіант, подібний до clsx:
	const classes: string[] = [];
	const add = (val: any) => {
		if (!val && val !== 0) return;
		const t = typeof val;
		if (t === "string" || t === "number") {
			classes.push(String(val));
		} else if (Array.isArray(val)) {
			val.forEach(add);
		} else if (t === "object") {
			for (const key in val) {
				if (Object.prototype.hasOwnProperty.call(val, key) && val[key]) {
					classes.push(key);
				}
			}
		}
	};

	inputs.forEach(add);
	return classes.join(" ");
}
