const Part = (props) => {
  return (
    <li key={props.name}>
      {props.name} {props.exercises}
    </li>
  );
};

export default Part;
