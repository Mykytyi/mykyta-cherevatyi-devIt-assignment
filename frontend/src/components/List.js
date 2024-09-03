import ListItem from './ui/ListItem';

import '../styles/List.css';

const List = ({ data }) => {
  return (
    <div className="CustomList">
      <ul>
        {data.map((item, index) => (
          <ListItem value={item.data} key={JSON.stringify(item)} />
        ))}
      </ul>
    </div>
  );
}

export default List;
