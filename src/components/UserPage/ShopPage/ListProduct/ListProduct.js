import { Link } from "react-router-dom";
import { addToCart } from "~/services";
import { useNavigate } from "react-router-dom";
function ListProduct({ data }) {
  const navigate = useNavigate();
  const handleAddToCart = (productId, size, color, quantity) => {
    if (addToCart(productId, color, size, quantity)) {
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="product-list">
      <div className="row">
        {Object.keys(data).length !== 0 &&
          data.map((product, index) => (
            <div className="col-lg-4 col-sm-6" key={product.id}>
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
                      <button
                        onClick={() =>
                          handleAddToCart(
                            product.productId,
                            product.size,
                            product.color,
                            1
                          )
                        }
                      >
                        <i className="icon_bag_alt" />
                      </button>
                    </li>
                    <li className="quick-view">
                      <Link to={`/product/${product.productId}`}>
                        + Quick View
                      </Link>
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
