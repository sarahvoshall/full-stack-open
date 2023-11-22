import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const exercisesTotal = course.parts.reduce(function (sum, part) {
    return sum + part.exercises;
  }, 0);

  console.log(exercisesTotal)

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total exercises={exercisesTotal} />
    </>
  );
};

export default Course;
