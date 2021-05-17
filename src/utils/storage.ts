const prefix = 'shopping-heaven-storage';

const store = async (key: string, value: any) => {
	localStorage.setItem(prefix + key, JSON.stringify(value));
};

const get = async (key: string) => {
	const item: any = localStorage.getItem(prefix + key);
	const value = JSON.parse(item);
	if (!value) return null;

	return item;
};

const storageMethods = {
	store,
	get
};

export default storageMethods;
