import { DropdownButton, Dropdown } from "react-bootstrap";

const SortDropdown = ({ onSortChange }) => {
  return (
    <DropdownButton
      id="dropdown-sort"
      title="Sort By"
      onSelect={onSortChange}
      className="mb-3"
    >
      <Dropdown.Item eventKey="priceAsc">Price: Low to High</Dropdown.Item>
      <Dropdown.Item eventKey="priceDesc">Price: High to Low</Dropdown.Item>
      <Dropdown.Item eventKey="nameAsc">Name: A to Z</Dropdown.Item>
      <Dropdown.Item eventKey="nameDesc">Name: Z to A</Dropdown.Item>
    </DropdownButton>
  );
};

export default SortDropdown;
