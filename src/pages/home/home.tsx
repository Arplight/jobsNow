import JobCard from "../../components/common/job_card/jobCard";

const Home = () => {
  const skills = [
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "active listening",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "information ordering",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "active listening",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "information ordering",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
  ];
  const data = Array.from({ length: 12 }, (_, i) => i);
  return (
    <>
      {/* jobs count */}
      <h1
        className="font-hero font-color"
        style={{ marginBottom: 16, paddingLeft: 16 }}
      >
        All Jobs (255)
      </h1>
      {/* all jobs */}
      <ul className="jobs-grid">
        {data &&
          data.map((job, index) => (
            <li key={index}>
              <JobCard
                jobTitle="4th Grade Math Teacher"
                jobLink="9b92abe6-3bf3-4cc6-8744-4de0c8af0630"
                jobSkills={skills}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

export default Home;
