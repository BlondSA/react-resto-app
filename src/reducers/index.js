const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "MENU_LOADED":
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false,
            };
        case "MENU_REQUESTED":
            return { ...state, menu: state.menu, loading: true, error: false };
        case "MENU_ERROR":
            return { ...state, menu: state.menu, loading: true, error: true };
        case "ITEM_ADDED_TO_CART":
            const id = action.payload;
            const itemInd = state.items.findIndex((item) => item.id === id);
            if (itemInd >= 0) {
                const itemInState = state.items.find((item) => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty,
                };
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1),
                    ],
                    totalPrice: state.totalPrice + newItem.price,
                };
            }
            const item = state.menu.find((item) => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1,
            };
            return {
                ...state,
                items: [...state.items, newItem],
                totalPrice: state.totalPrice + newItem.price,
            };
        case "ITEM_REMOVE_FROM_CART":
            const index = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.id === index
            );
            const price =
                state.items[itemIndex]["price"] *
                state.items[itemIndex]["qtty"];
            const before = state.items.slice(0, itemIndex);
            const after = state.items.slice(itemIndex + 1);
            return {
                ...state,
                items: [...before, ...after],
                totalPrice: state.totalPrice - price,
            };
        default:
            return state;
    }
};

export default reducer;
