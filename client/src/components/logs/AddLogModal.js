/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
// import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';

const AddLogModal = ({ addLog }) => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  // const [message, setMessage] = useState('');
  // const [attention, setAttention] = useState(false);
  // const [tech, setTech] = useState('');

  const onSubmit = () => {
    if (title === '' || thumbnail === '') {
      M.toast({ html: 'Please enter the first and last name' });
    } else {
      addLog({ title, thumbnail });

      M.toast({ html: `${title} ${thumbnail} was added as a tech` });

      // Clear fields
      setTitle('');
      setThumbnail('');
    }
  };

  const modalStyle = {
    width: '80%',
    height: '50%',
    marginTop: '100px',
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        {/* <h4>Enter System Log</h4> */}
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor='title' className='active'>
              Title
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='thumbnail'
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />
            <label htmlFor='thumbnail' className='active'>
              Thumbnail
            </label>
          </div>
        </div>

        {/* <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div> */}

        {/* <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div> */}
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

export default connect(null, { addLog })(AddLogModal);
