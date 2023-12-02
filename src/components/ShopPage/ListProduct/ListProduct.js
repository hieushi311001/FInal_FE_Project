import { Link } from "react-router-dom";
function ListProduct({ data }) {
  return (
    <div className="product-list">
      <div className="row">
        {Object.keys(data).length !== 0 &&
          data.map((product, index) => (
            <div className="col-lg-4 col-sm-6" key={index}>
              <div className="product-item">
                <div className="pi-pic">
                  <img src={product.image1} alt={product.name} />
                  {product.discount !== 0 && (
                    <div className="sale pp-sale">{product.discount}%</div>
                  )}
                  <div className="icon">
                    <i className="icon_heart_alt" />
                  </div>
                  <ul>
                    <li className="w-icon active">
                      <a href={{}}>
                        <i className="icon_bag_alt" />
                      </a>
                    </li>
                    <li className="quick-view">
                      <Link to={`/product/${product.productId}`}>
                        + Quick View
                      </Link>
                    </li>
                    <li className="w-icon">
                      <a href={{}}>
                        <i className="fa fa-random" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="pi-text">
                  <div className="catagory-name">{product.brand}</div>
                  <a href={{}}>
                    <h5>{product.name}</h5>
                  </a>
                  {product.discount !== 0.0 ? (
                    <div className="product-price">
                      {product.sellingPrice -
                        (product.discount / 100) * product.sellingPrice}
                      $ <span>{product.sellingPrice}$</span>
                    </div>
                  ) : (
                    <div className="product-price-1">
                      <span>{product.sellingPrice}$</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListProduct;
