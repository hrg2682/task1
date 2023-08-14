import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import itemsApiResponse from '../itemsData.js'; 
import '../styles/TaxForm.css';

const TaxForm = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryToggle = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const initialValues = {
    applied_to: 'some',
    selectedItems: [],
  };

  const handleApply = (values) => {
    console.log(values);
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Add Tax</h2>
      <Formik initialValues={initialValues} onSubmit={handleApply}>
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <Field className="input" type="text" name="quantity" placeholder="Enter quantity..." />
            </div>
            {/* <div className="control">
              <label className="radio">
                Apply to:{' '}
                <Field className="radio ml-0" type="radio" name="applied_to" value="some" />
                Some items{' '}
              </label>
            </div>
            <div>
              <label className='radio'>
                <Field className="radio ml-6" type="radio" name="applied_to" value="all" />
                All items
              </label>
            </div> */}
            <div className="control">
  <label className="radio">
    <Field className="is-checkradio ml-0" type="radio" name="applied_to" value="some" />
    <span className="checkmark"></span>
    Some items
  </label>
</div>
<div className="control">
  <label className='radio'>
    <Field className="is-checkradio ml-6" type="radio" name="applied_to" value="all" />
    <span className="checkmark"></span>
    All items
  </label>
</div>

            <div className="input">
              <Field type="text" name="searchQuery" placeholder="Search items..." />
            </div>
            <div className="checkbox-group">
              {itemsApiResponse.map((item) => (
                <div key={item.id}>
                  {item.category && (
                    <label
                      className={`checkbox-label ${
                        selectedCategory === item.category.name ? 'selected-category' : ''
                      }`}
                    >
                      <Field
                        type="checkbox"
                        name="selectedItems"
                        value={item.id}
                        checked={
                          selectedCategory === item.category.name ||
                          values.selectedItems.includes(item.id)
                        }
                        onChange={() => {
                          if (selectedCategory === item.category.name) {
                            handleCategoryToggle(null);
                          }
                          setFieldValue(
                            'selectedItems',
                            values.selectedItems.includes(item.id)
                              ? values.selectedItems.filter(
                                  (id) => id !== item.id
                                )
                              : [...values.selectedItems, item.id]
                          );
                        }}
                      />
                      {item.category.name}
                    </label>
                  )}
                  <div>
                    <label className="checkbox-label">
                      <Field
                        type="checkbox"
                        name="selectedItems"
                        value={item.id}
                        checked={!item.category && values.selectedItems.includes(item.id)}
                        onChange={() => {
                          if (selectedCategory) {
                            handleCategoryToggle(null);
                          }
                          setFieldValue(
                            'selectedItems',
                            values.selectedItems.includes(item.id)
                              ? values.selectedItems.filter(
                                  (id) => id !== item.id
                                )
                              : [...values.selectedItems, item.id]
                          );
                        }}
                      />
                      {item.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <ErrorMessage name="selectedItems" className="error-message" component="div" />
            <button type="submit" className="submit-button">Apply</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaxForm;
