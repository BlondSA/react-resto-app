import React, { Component } from "react";
import { connect } from "react-redux";
import WithRestoService from "../hoc";
import { menuLoaded, menuRequested, menuError } from "../../actions";
import Spinner from "../spinner";
// import Error from "../error";

import "./itemPage.css";

class ItemPage extends Component {
    componentDidMount() {
        const { RestoService, menuLoaded, menuRequested, menuError } =
            this.props;
        menuRequested();
        RestoService.getMenuItems()
            .then((response) => {
                menuLoaded(response);
            })
            .catch(() => menuError());
    }

    render() {
        const { loading, menuItems } = this.props;
        if (loading) {
            return <Spinner />;
        }
        const item = menuItems.find(
            (item) => item.id === +this.props.match.params.id
        );
        const { title, price, url, category } = item;
        return (
            <div className="item-menu">
                <div className="menu__item item__block">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">
                        Category: <span>{category}</span>
                    </div>
                    <div className="menu__price">
                        Price: <span>{price}$</span>
                    </div>
                    <button className="menu__btn">Add to cart</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = { menuLoaded, menuRequested, menuError };

export default WithRestoService()(
    connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);
