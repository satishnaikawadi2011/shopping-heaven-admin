const prefix = 'shopping-heaven-storage';

const store = (key: string, value: any) => {
	localStorage.setItem(prefix + key, JSON.stringify(value));
};

const get = (key: string) => {
	const item: any = localStorage.getItem(prefix + key);
	const value = JSON.parse(item);
	if (!value) return null;

	return value;
};

const remove = (key: string) => {
	localStorage.removeItem(prefix + key);
};

const storageMethods = {
	store,
	get,
	remove
};

export default storageMethods;
