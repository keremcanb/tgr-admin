import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextInput } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useResources from '../../utils/useResources';
import { updateCategory } from '../../actions/category';

const EditCategoryModal = ({ current, updateCategory }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (current) {
      setTitle(current.title);
      setThumbnail(current.thumbnail);
    }
  }, [current]);

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter title and thumbnail' });
    } else {
      const updCategory = {
        id: current.id,
        title,
        thumbnail
      };

      updateCategory(updCategory);
      M.toast({ html: `Location updated` });

      setTitle('');
      setThumbnail('');
    }
  };

  return (
    <div
      id="edit-category-modal"
      className="modal"
      // style={{ width: '70%', height: '60%', marginTop: '50px' }}
    >
      <div className="modal-content">
        <h4>Edit Location</h4>
        <TextInput
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          type="text"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

EditCategoryModal.propTypes = {
  current: PropTypes.object,
  updateCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.category.current
});

export default connect(mapStateToProps, { updateCategory })(EditCategoryModal);
