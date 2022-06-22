import * as React from "react";
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field, Formik } from 'formik';
import { useContext } from "react";
import { DispatchContext } from "../contexts/search_context";

export const MyForm = () => {
  const dispatch = useContext(DispatchContext);

  return (
    <Formik
      initialValues={{
        ingredient: '',
        quantity: 0,
        unity: 'quant'
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        dispatch({ type: 'ADD_INGREDIENT', payload: values });
        setSubmitting(false);
      }}
      validationSchema={Yup.object({
        ingredient: Yup.string()
          .required('Required'),
        quantity: Yup.number()
          .required('Required')
          .positive('Must be a positive number')
          .integer('Must be an integer'),
        unity: Yup.string()
          .required('Required')
          .oneOf(['weight', 'volume', 'quant'], 'Invalid unity')
      })}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="grid gap-2 grid-cols-1 w-1/3 text-center">
          <h1>Search Ingredients</h1>
          <label htmlFor="ingredient">Ingredient</label>
          <Field name="ingredient" className="text-blue-900 rounded" />
          {touched.ingredient && errors.ingredient && <div className="text-red-600">{errors.ingredient}</div>}
          <label htmlFor="quantity">Quantity</label>
          <Field name="quantity" className="text-blue-900 rounded" />
          {touched.quantity && errors.quantity && <div className="text-red-600">{errors.quantity}</div>}
          <label htmlFor="unity">Measurement metric</label>
          <Field as="select" name="unity" className="text-blue-900 rounded">
            <option value="weight">Weight</option>
            <option value="volume">Volume</option>
            <option value="quant">Quant</option>
          </Field>
          {touched.unity && errors.unity && <div className="text-red-600">{errors.unity}</div>}


          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
