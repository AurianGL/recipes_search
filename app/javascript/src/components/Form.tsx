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
        <Form>
          <h1>hello</h1>
          <Field name="ingredient" />
          {touched.ingredient && errors.ingredient && <div>{errors.ingredient}</div>}

          <Field name="quantity" />
          {touched.quantity && errors.quantity && <div>{errors.quantity}</div>}

          <Field as="select" name="unity">
            <option value="weight">Weight</option>
            <option value="volume">Volume</option>
            <option value="quant">Quant</option>
          </Field>
          {touched.unity && errors.unity && <div>{errors.unity}</div>}


          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
