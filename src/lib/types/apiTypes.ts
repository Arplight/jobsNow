// Jobs types
type Skill = {
  id: string;
};
type JobAttributes = {
  title: string;
};

type JobRelationships = {
  skills: Skill[];
};
export type JobsMeta = {
  next: number;
  count: number;
};

// skill types
type Job = {
  id: string;
};

type RelatedSkill = {
  id: string;
};

type SkillAttributes = {
  name: string;
  type: string;
  importance: string;
  level: string;
};

type SkillRelationships = {
  jobs: Job[];
  skills: RelatedSkill[];
};

/////////////////////////Ressponse Interfaces

// Job endpoint interface
export interface IJob {
  id: string;
  type: string;
  attributes: JobAttributes;
  relationships: JobRelationships;
}
// Jobs endpoint interface
export interface IJobsResponse {
  jobs: IJob[];
  meta: JobsMeta;
}
// Skill endpoint interface
export interface ISkillResponse {
  id: string;
  type: string;
  attributes: SkillAttributes;
  relationships: SkillRelationships;
}
