import * as React from "react";
import * as Yup from 'yup';
import { Form, Field, Formik } from 'formik';
import { useContext } from "react";
import { DispatchContext, Ingredient, SearchContext } from "../contexts/search_context";

export const MyForm = () => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(SearchContext)

  return (
    <Formik
      initialValues={{
        ingredient: '',
        with: 'with'
      } as Ingredient}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        dispatch({ type: 'ADD_INGREDIENT', payload: values });
        setSubmitting(false);
      }}
      validationSchema={Yup.object({
        ingredient: Yup.string()
          .required('Required')
          .test('already exist', "can't add twice the same ingredient",
            (value) => {
              if (state.filter(ingredient => {
                return ingredient.ingredient === value
              }).length === 0)
                return true
              return false
            }
          ),
        with: Yup.string()
          .required('Required')
          .oneOf(['with', 'without'], 'Invalid value')
      })}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="grid gap-2 grid-cols-1 w-1/3 text-center">
          <h1>Search Ingredients</h1>
          <label htmlFor="ingredient">Ingredient</label>
          <Field name="ingredient" className="text-blue-900 rounded" />
          {touched.ingredient && errors.ingredient && <div className="text-red-600">{errors.ingredient}</div>}
          <label htmlFor="with">With or Without</label>
          <Field as="select" name="with" className="text-blue-900 rounded">
            <option value="with">With</option>
            <option value="without">Without</option>
          </Field>
          {touched.with && errors.with && <div className="text-red-600">{errors.with}</div>}


          <button type="submit" disabled={isSubmitting} className='bg-rose-700 rounded w-full text-center p-2'>
            Add Ingredient
          </button>
        </Form>
      )}
    </Formik>
  );
}
