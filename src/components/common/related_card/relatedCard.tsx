import { FC } from "react";
import Styles from "./relatedCard.module.scss";
import { IRelatedCard } from "../../../lib/types/propTypes";
import { Link } from "react-router-dom";

interface IAttributes {
  attrLabel: string;
  attrValue: string;
}

const RelatedCard: FC<IRelatedCard> = ({
  relatedTitle,
  relatedType,
  relatedImportance,
  relatedLevel,
  relatedLink,
}) => {
  const attributes: IAttributes[] = [
    { attrLabel: "Type: ", attrValue: relatedType },
    { attrLabel: "Importance: ", attrValue: relatedImportance },
    { attrLabel: "Level: ", attrValue: relatedLevel },
  ];
  return (
    <div className={`${Styles.relatedCard} `}>
      <Link to={relatedLink}>
        <h1 className="font-main font-color">{relatedTitle}</h1>
      </Link>
      <p className="font-paragraph font-color">
        description is not returned from the API, so this is placeholder text.
      </p>
      <ul>
        {attributes &&
          attributes.map((attr, index) => (
            <li key={index}>
              <b className="font-color font-paragraph">{attr.attrLabel}</b>
              <p className="font-color font-paragraph">{attr.attrValue}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RelatedCard;
