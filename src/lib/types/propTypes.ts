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
}
// side menu interface
type menuList = {
  label: string;
  path: string;
};
export interface ISideMenu {
  menuTitle: string;
  menuList: menuList[];
}
