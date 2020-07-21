---
layout: post
title: Using Formik to Simplify React Forms
author: Ryan Miller
comments: true
tags:
- Formik
- React
- JavaScript
---

Formik is an extremely popular React module created by Jared Palmer to help with forms ([Docs here](https://jaredpalmer.com/formik/docs/overview)).

Formik reduces verbosity of forms by centralizing logic, shipping with defaults, and allowing us to feed properties via its generic `Field` element. Formik's claim to fame is simplifying these typically complex activities:

1. Getting values in and out of form state
1. Validation and error messages
1. Handling form submission

To get started, install the npm module in your project directory:  
`npm i formik --save`  
and then import it into the component that you'd like to use it. Here is my import line with a couple other components that are typically used.  
`import {Formik, Field, useField} from 'formik';`  

In this post, I'll take us through 3 main use cases, showing a barebones example of each.

1. Create a form controlled by Formik with initial values
2. Using the `<Field>` element to update form values and inject defaults.
2. Validate form fields

I'll break these examples into sections and provide code snippets for each. Let's get started.


#### 1. Create a form controlled by Formik with initial values
Once you have Formik imported to you component, it's simple to start using it.
First, add your `<Formik> </Formik>` element as shown in the example below. Formik takes a number of props ([see here](https://jaredpalmer.com/formik/docs/api/formik)), many of which are optional. The most important prop is `initialValues`, which you must define for each piece of data you want your form to handle.

Let's take a look at the code snippet below which can help explain some key functionality.

```
  <Formik
      initialValues={{
        accountId: "123",
        firstName: "Ryan",
        lastName: "Miller",
        email: "example@example.com"
        balance: 100;
      }}
  >
  {({values, errors, handleChange})} =>	(
    <div>Content here.</div>
  )
  </Formik>
```

With our initial values passed in, focus your attention now in between the Formik element tags. Notice we have a JavaScript function which supplies several parameters. These parameters is where we define all the properties that Formik gives us access to. For example `values` maps to the `initialValues` data that Formik is now tracking for us. Anywhere within the Formik context, I can now refer to, say, `values.firstName` and to get its current value.

#### 2. Using the `<Field>` element to update form values and inject defaults.

Let's say we want an input text box to control the first name and last name values. The `<Field>` element is a generic element from Formik which can be used to display a variety of form element types. In the example below, notice we have `type` set to input, to indicate we want this to be an input box. We also set the `name` property. This one is critically important, because under-the-hood, the value in this prop maps to the data values that Formik is managing for us. In other words, by setting up two fields mapping to each `firstName` and `lastName`, these text boxes are now effectively managing the data mapped to `values.firstName` and `values.lastName`.

```
<Formik
    initialValues={{
      accountId: "123",
      firstName: "Ryan",
      lastName: "Miller",
      email: "example@example.com",
      balance: 100
    }}
	onSubmit={()=>handleSubmit()}
	validate={(values)=>runValidationLogic()}
>
 {({ values, errors, isSubmitting }) => (
	<div>
		<Field type="input" name="firstName" as={Form.Control} />
		<Field type="input" name="lastName" as={Form.Control} />
		<div>More content here.</div>
	</div>
 )
</Formik>
```

