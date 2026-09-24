const ProfileCard = (props) => (
  <div>
    <p>Name: {props.name}</p>
    <p>Age: {props.age}</p>
    <p>Job Title: {props.jTitle}</p>
    <p>City: {props.loc}</p>
  </div>
);

export default ProfileCard;
