import { ReactNode } from "react";
// skill pill interface
export interface ISkillPill {
  skillName: string;
  skillLink: string;
}
// job card interface
export interface IJobCard {
  jobTitle: string;
  jobSkills: ISkillPill[];
  jobLink: string;
}

// Related card interface
export interface IRelatedCard {
  relatedTitle: string;
  relatedType: string;
  relatedImportance: string;
  relatedLevel: string;
  relatedLink: string;
}
// side menu interface
export type menuList = {
  label: string;
  path: string;
};
export interface ISideMenu {
  menuTitle: string;
  menuList: menuList[];
}

// Burger icon
export interface IBurgerIcon {
  openMenu: boolean;
  setOpenMenu: (isOpen: boolean) => void;
}

// navbar pages
export type TPages = {
  pageLabel: string;
  pageLink: string;
};
// Nav list
export interface INavList {
  pages: TPages[];
  currentPage: string;
}
// Error message
export interface IErrorMessage {
  errorMessage: string;
  errorIcon: ReactNode;
}
