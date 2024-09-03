import '../../styles/ListItem.css';

const ListItem = ({ value }) => {
  return (
    <li className="ListItem">
      <p>Value from the server: {value}</p>
    </li>
  )
}

export default ListItem;
