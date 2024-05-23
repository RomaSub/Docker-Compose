interface OnlineListProps {
  users: string[];
}

const OnlineList: React.FC<OnlineListProps> = ({ users }) => {
  return (
    <div className="overflow-auto px-5 text-white">
      {users.map((name, ind) => (
        <li className="nav-item w-100" key={ind}>
          <div className="w-100 br-0 text-truncate text-start">{name}</div>
        </li>
      ))}
    </div>
  );
};

export default OnlineList;
