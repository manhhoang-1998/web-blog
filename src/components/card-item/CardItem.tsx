import React, { FC } from "react";
import "./CardItem.scss";

type CardItemProps = {
  image?: string;
  title: string;
};
const CardItem: FC<CardItemProps> = ({ image, title }) => {
  return (
    <div className="card-item">
      <div className="card-title">
        <span className="card-title__name">{title}</span>
        <div className="card-title__close">
          <i className="card-title__close-icon fa-solid fa-xmark"></i>
        </div>
      </div>
      {image ? (
        <img src={image} alt="" className="card-item__image" />
      ) : (
        <div className="card-item__new">
          <i className="card-item__new-icon fa-solid fa-plus"></i>
        </div>
      )}
    </div>
  );
};
export { type CardItemProps };
export default CardItem;
