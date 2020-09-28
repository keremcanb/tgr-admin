import React, { useState } from 'react';
import { Button, Icon, Modal, TextInput, Select } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import makeAnimated from 'react-select/animated';
// import Select from 'react-select';
import { addCategory } from '../../actions/category';
import useResources from '../../utils/useResources';

const AddCategoryModal = ({ addCategory }) => {
  const initialFormState = { title: '', thumbnail: '', location: '' };
  const [category, setCategory] = useState(initialFormState);
  const { title, thumbnail, location } = category;
  const locations = useResources('locations');
  // const animatedComponents = makeAnimated();

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter category' });
    } else {
      addCategory(category);
      M.toast({ html: `Category added` });
      setCategory(initialFormState);
    }
  };

  const onChange = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value });
  };

  // const onSelect = (value, action) => {
  //   setCategory({ ...category, [action.id]: value });
  // };

  return (
    <Modal
      id="add-category-modal"
      style={{
        height: '100%',
        width: '60%'
      }}
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
      trigger={
        <Button
          className="blue darken-2"
          fab
          floating
          large
          node="button"
          waves="light"
          icon={<Icon>add</Icon>}
        />
      }
    >
      <TextInput
        id="title"
        placeholder="Title *"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        placeholder="Thumbnail *"
        value={thumbnail}
        onChange={onChange}
      />
      <Select
        id="location"
        name="location"
        value={location}
        onChange={onChange}
        multiple
      >
        <option disabled value="">
          Location
        </option>
        {locations.map((location) => (
          <option key={location._id} value={location.title}>
            {location.title}
          </option>
        ))}
      </Select>
      {/* <select
            name='location'
            // defaultValue={[category.location]}
            onChange={handleInputChange}
            size={locations.length}
            multiple
          >
            {locations.map((location) => (
              <option key={location._id} value={location.title}>
                {location.title}
              </option>
            ))}
          </select> */}
      {/* <Select
        id="location"
        options={locations.map((loc) => ({
          value: loc.title,
          label: loc.title
        }))}
        onChange={onSelect}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
      /> */}
    </Modal>
  );
};

AddCategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired
};

export default connect(null, { addCategory })(AddCategoryModal);
