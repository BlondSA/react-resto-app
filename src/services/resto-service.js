export default class RestoService {
    _apiBase = "http://localhost:3000";

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);

        if (!response.ok) {
            throw new Error(
                `Could not fetch ${this._apiBase}${url}, received ${response.status}`
            );
        }

        return await response.json();
    };

    getMenuItems = async () => {
        return await this.getResource(`/menu/`);
    };

    getItem = async (id) => {
        const response = await this.getResource(`/menu`);

        const item = response.find((item) => item.id === +id);
        return item;
    };

    getOrderNumber = async () => {
        const response = await this.getResource(`/orders/`);
        console.log(response);
        const orderNumber = response.length + 1;
        return orderNumber;
    };

    setOrder = async (order) => {
        const number = await this.getOrderNumber();
        const newOrder = {
            id: number,
            order: order,
        };
        const response = await fetch(`${this._apiBase}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder),
        });
        if (!response.ok) {
            throw new Error(`"Json Error" ${response.status}`);
        }
    };
}
