import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    comment: '',
    photo: null,
    location: '',
    selectedCookingDay: '',
    cookingTime: '',
    showCookingRequest: false,
    showCookingTime: false,
  });

  const {
    comment,
    photo,
    location,
    selectedCookingDay,
    cookingTime,
    showCookingRequest,
    showCookingTime,
  } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = e => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleCookingDaySelect = day => {
    setFormData({
      ...formData,
      selectedCookingDay: day,
    });
  };

  const toggleCookingTime = () => {
    setFormData({
      ...formData,
      showCookingTime: !showCookingTime,
    });
  };

  const toggleCookingRequest = () => {
    setFormData({
      ...formData,
      showCookingRequest: !showCookingRequest,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('comment', comment);
      formDataObj.append('photo', photo);
      formDataObj.append('location', location);
      formDataObj.append('cookingDay', selectedCookingDay);
      formDataObj.append('cookingTime', cookingTime);

      console.log(formDataObj);

      const response = await axios.post(
        'http://localhost:3000/api/myfoodcom',
        formDataObj,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      // Optionally handle success response
    } catch (error) {
      console.error('Error adding comment:', error);
      // Optionally handle error
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="cooking-request">
            <button onClick={toggleCookingRequest}>Cooking Request</button>
            {formData.showCookingRequest && (
              <div>
                <h2>Cooking Request</h2>
                <ul>
                  <li onClick={() => handleCookingDaySelect('Sunday')}>
                    Can you cook on Sunday?
                  </li>
                  <li onClick={() => handleCookingDaySelect('Monday')}>
                    Can you cook on Monday?
                  </li>
                  <li onClick={() => handleCookingDaySelect('Tuesday')}>
                    Can you cook on Tuesday?
                  </li>
                  <li onClick={() => handleCookingDaySelect('Wednesday')}>
                    Can you cook on Wednesday?
                  </li>
                  <li onClick={() => handleCookingDaySelect('Thursday')}>
                    Can you cook on Thursday?
                  </li>
                  <li onClick={() => handleCookingDaySelect('Friday')}>
                    Can you cook on Friday?
                  </li>
                  <li onClick={() => handleCookingDaySelect('Saturday')}>
                    Can you cook on Saturday?
                  </li>
                </ul>
              </div>
            )}
            {selectedCookingDay && <p>You selected: {selectedCookingDay}</p>}
          </div>

          <div className="cooking-time">
            <button onClick={toggleCookingTime}>Set Cooking Time</button>
            {formData.showCookingTime && (
              <div>
                <input
                  type="time"
                  value={cookingTime}
                  onChange={handleInputChange}
                  name="cookingTime"
                />
              </div>
            )}
            {cookingTime && <p>Cooking Time set to: {cookingTime}</p>}
          </div>

          <div>
            <label className="file-label">
              Add Photo
              <input
                className="file-input"
                type="file"
                onChange={handleFileChange}
                name="photo"
              />
            </label>
          </div>

          <div>
            <input
              className="location-input"
              type="text"
              value={location}
              onChange={handleInputChange}
              placeholder="Enter your location"
              name="location"
            />
          </div>

          <div>
            <textarea
              className="textarea"
              value={comment}
              onChange={handleInputChange}
              placeholder="Enter your comment"
              name="comment"
            ></textarea>
          </div>

          <div>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
