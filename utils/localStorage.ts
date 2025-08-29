const LocalStorageService = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key: string, value: unknown) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};

export default LocalStorageService;
