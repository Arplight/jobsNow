import { FC } from "react";
import Styles from "./relatedCard.module.scss";
import { IRelatedCard } from "../../../lib/types/propTypes";

interface IAttributes {
  attrLabel: string;
  attrValue: string;
}

const RelatedCard: FC<IRelatedCard> = ({
  relatedTitle,
  relatedType,
  relatedImportance,
  relatedLevel,
}) => {
  const attributes: IAttributes[] = [
    { attrLabel: "Type: ", attrValue: relatedType },
    { attrLabel: "Importance: ", attrValue: relatedImportance },
    { attrLabel: "Level: ", attrValue: relatedLevel },
  ];
  return (
    <div className={`${Styles.relatedCard} card-hover`}>
      <h1 className="font-main font-color">{relatedTitle}</h1>
      <p className="font-paragraph font-color">
        the ability to communicate information and ideas in speaking so others
        will understand.
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
