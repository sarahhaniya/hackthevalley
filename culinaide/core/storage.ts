import AsyncStorage from "@react-native-async-storage/async-storage";

// Save JSON under a key
export async function saveData<T>(key: string, value: T) {
	try {
		const json = JSON.stringify(value);
		await AsyncStorage.setItem(key, json);
	} catch (e) {
		console.error("Error saving to storage", e);
	}
}

// Load JSON under a key, fallback if missing/broken
export async function loadData<T>(key: string, fallback: T): Promise<T> {
	try {
		const raw = await AsyncStorage.getItem(key);
		if (raw) {
			return JSON.parse(raw) as T;
		}
	} catch (e) {
		console.error("Error loading from storage", e);
	}
	return fallback;
}

// Remove a key
export async function removeData(key: string) {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		console.error("Error removing from storage", e);
	}
}
