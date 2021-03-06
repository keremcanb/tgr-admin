import { useState } from 'react';
import { useDispatch } from 'react-redux';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import { TextInput, Row, Container } from 'react-materialize';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addCategory } from '../../store/actions/category';
import FileUpload from '../../components/upload/FileUpload';
import useResources from '../../utils/useResources';

const AddCategory = ({ history }) => {
  const [category, setCategory] = useState({
    title: '',
    thumbnail: '',
    location: ''
  });
  const { title, location } = category;
  const [submittedFileName, setSubmittedFileName] = useState('');
  const locations = useResources('locations');
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();

  const onChangeHandler = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const onSelect = (value, action) => {
    setCategory({ ...category, [action.name]: value });
  };

  const onSubmitHandler = async () => {
    if (!title) {
      M.toast({ html: 'Please enter title' });
    } else if (!location) {
      M.toast({ html: 'Please enter location' });
    } else {
      dispatch(
        addCategory({
          ...category,
          thumbnail: submittedFileName
        })
      );
      M.toast({ html: `${title} added` });
      history.push('categories');
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Category</title>
      </Helmet>
      <Container className="center mt form-container">
        <Row>
          <form onSubmit={onSubmitHandler}>
            <Select
              id="add-cat-loc"
              name="location"
              placeholder="Location *"
              value={location}
              onChange={onSelect}
              components={animatedComponents}
              closeMenuOnSelect={false}
              isMulti
              options={locations.map((loc) => ({
                value: loc.title,
                label: loc.title
              }))}
            />
            <TextInput
              id="add-cat-title"
              name="title"
              placeholder="Title *"
              value={title}
              onChange={onChangeHandler}
              s={12}
            />
            <FileUpload updateFileNameToParent={setSubmittedFileName} />
          </form>
        </Row>
      </Container>
    </>
  );
};

export default AddCategory;
