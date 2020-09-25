import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Modal,
  TextInput,
  Textarea,
  Row,
  Col
} from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
// import useResources from '../../utils/useResources';
import { updatePlace } from '../../actions/place';

const EditPlaceModal = ({ current, updatePlace }) => {
  const [place, setPlace] = useState('');
  // const locations = useResources('locations');
  // const categories = useResources('categories');
  const {
    title,
    thumbnail,
    image,
    content,
    location,
    category,
    info,
    link,
    lat,
    lng
  } = place;

  useEffect(() => {
    if (current) {
      setPlace(current);
    }
  }, [current]);

  const onChange = (e) => {
    setPlace({ ...place, [e.target.id]: e.target.value });
  };

  const onSubmit = () => {
    updatePlace(place);
    M.toast({ html: 'Place updated' });
  };

  return (
    <Modal
      id="edit-place-modal"
      actions={[
        <Button onClick={onSubmit} node="button" waves="light" type="submit">
          Submit
          <Icon right>send</Icon>
        </Button>
      ]}
    >
      <TextInput
        id="title"
        label="Title"
        type="text"
        value={title}
        onChange={onChange}
      />
      <TextInput
        id="thumbnail"
        label="Thumbnail"
        type="text"
        value={thumbnail}
        onChange={onChange}
      />
      <TextInput
        id="image"
        label="Image"
        type="text"
        value={image}
        onChange={onChange}
      />
      <Textarea
        id="content"
        label="Content"
        type="text"
        value={content}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="location"
            label="Location"
            type="text"
            value={location}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="category"
            label="Category"
            type="text"
            value={category}
            onChange={onChange}
          />
        </Col>
      </Row>
      <TextInput
        id="info"
        label="Info"
        type="text"
        value={info}
        onChange={onChange}
      />
      <TextInput
        id="link"
        label="Link"
        type="text"
        value={link}
        onChange={onChange}
      />
      <Row>
        <Col m={6}>
          <TextInput
            id="lat"
            label="Lat"
            type="text"
            value={lat}
            onChange={onChange}
          />
        </Col>
        <Col m={6}>
          <TextInput
            id="lng"
            label="Lng"
            type="text"
            value={lng}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Modal>
  );
};

EditPlaceModal.propTypes = {
  current: PropTypes.object,
  updatePlace: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  current: state.place.current
});

export default connect(mapStateToProps, { updatePlace })(EditPlaceModal);
