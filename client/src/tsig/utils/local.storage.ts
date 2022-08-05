const SUBSCRIPTION_KEY = "subscription_id";

export const saveLastSubscriptionRecord = (value: string) => {
    if (getLastSubscriptionRecord() === value) value = "";
    localStorage.setItem(SUBSCRIPTION_KEY, value);
};

export const getLastSubscriptionRecord = () => {
    if (localStorage.getItem(SUBSCRIPTION_KEY))
        return localStorage.getItem(SUBSCRIPTION_KEY)!;
    else return "";
};
