import React, { Component } from "react";
import formatCurrency from "../Util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for modal to show and hide(if produst exist then show it not exist than dont show)
      product: null,
    };
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        {/* cascade is making item come to one after another not at the same time */}
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div> {formatCurrency(product.price)}</div>
                    <button
                      className="button-primary"
                      onClick={() => this.props.addToCart(product)}
                    >
                      {" "}
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-model" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes: {"  "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>{" "}
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button-primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
