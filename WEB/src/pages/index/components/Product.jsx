import { memo } from "react";
import { filterPrice, formatDimension } from "../../../service/filter";
import {
  IC_BEDROOM,
  IC_KITCHEN,
  IC_FLOOR,
  IMG_HOME_DEFAULT,
  IC_PARKING,
  IC_SQUARE,
  IC_PRICE,
  IC_JURIDICAL,
  IC_ADDRESS,
  IC_CONTACT,
  IC_SIZE,
  IC_DIRECTION,
  IC_DATE,
} from "../../../images";

export const Product = memo(({ item }) => {
  return (
    <div className="item">
      <div className="wrapper-image d-flex align-items-center justify-content-center">
        {item.link_image ? (
          <img
            src={item.link_image}
            alt="not found"
            className="image-product"
          />
        ) : (
          <img
            src={IMG_HOME_DEFAULT}
            alt="not found"
            className="image-product"
          />
        )}
      </div>
      <div className="content-item">
        <div className="title">
          <a href={`/home/${item.id}`}>
            <div className="text">{item.title}</div>
          </a>
        </div>
        <div className="wrapper-square-direct">
          <div className="square">
            <img className="icon" src={IC_SQUARE} alt="notfound" />
            <label> Square: </label>
            {!item.square || item.square === "None" || item.square === "" || String(item.square).toLowerCase() === "nan" ? "__" : item.square + " m²"}
          </div>

          <div className="size">
            <img className="icon" src={IC_SIZE} alt="notfound" />
            <label> Size: </label>
            {formatDimension(item.width)} x {formatDimension(item.length)}
          </div>
          <div className="direct">
            <img className="icon" src={IC_DIRECTION} alt="notfound" />
            <label> Direction : </label>
            {!item.direct || item.direct === "None" || item.direct === "" || String(item.direct).toLowerCase() === "nan" ? "__" : " " + item.direct}
          </div>
        </div>
        <div className="wrapper-price-location">
          <div className="price">
            <img className="icon" src={IC_PRICE} alt="notfound" />
            <label>Price :</label>
            {" " + filterPrice(item.price)}
          </div>
          <div className="juridial">
            <img className="icon" src={IC_JURIDICAL} alt="notfound" />
            <label>Juridical :</label>
            {item.juridical}
          </div>
          <div className="address">
            <img className="icon" src={IC_ADDRESS} alt="notfound" />
            <label>Address :</label>
            {item.street === "None" ? "" : item.street + " Street, "}
            {item.ward === "None" ? "" : item.ward + " Ward, "}
            {item.district === "None" ? "" : item.district + " District, "}
            {item.province === "None" ? "" : item.province + " City."}
          </div>
        </div>
        <div className="wrapper-bedroom-parking-floor">
          <div className="bedroom ic">
            <img className="icon" src={IC_BEDROOM} alt="notfound" />
            <div>
              {item.bedroom === "" ? "__" : item.bedroom}
              {/* : item.bedroom.replace("pn", " bedroom")} */}
            </div>
          </div>
          <div className="kitchen ic">
            <img className="icon" src={IC_KITCHEN} alt="notfound" />
            <div>
              {" kitchen: " +
                (item.kitchen === ""
                  ? "__"
                  : item.kitchen === "có"
                  ? "yes"
                  : "no")}
            </div>
          </div>

          <div className="parking ic">
            <img className="icon" src={IC_PARKING} alt="notfound" />
            <div>
              {" parking: " +
                (item.bathroom === ""
                  ? "__"
                  : item.parking === "có"
                  ? "yes"
                  : "no")}
            </div>
          </div>

          <div className="floor ic">
            <img className="icon" src={IC_FLOOR} alt="notfound" />
            <div>
              {item.floor === "" ? "__" : item.floor}
              {/* : item.floor.replace("t", " floor")} */}
            </div>
          </div>
        </div>
        <div className="wrapper-upload">
          <div className="contact">
            <img className="icon" src={IC_CONTACT} alt="notfound" />
            {item.name_contact === "" ? " __" : " " + item.name_contact} :
            {item.phone_contact === "" ? " __" : " " + item.phone_contact}
          </div>
          <div className="date">
            <img className="icon" src={IC_DATE} alt="notfound" />
            <label>Date :</label>
            {" " + item.date}
          </div>
        </div>
      </div>
    </div>
  );
});
