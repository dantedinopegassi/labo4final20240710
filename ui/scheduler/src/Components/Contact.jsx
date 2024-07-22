import React, { useState } from "react";
import Icons from "./Icons";
const sharedInputClasses =
  "mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const sharedLabelClasses =
  "block text-sm font-medium text-zinc-700 dark:text-zinc-300";
const sharedTextClasses = "text-zinc-700 dark:text-zinc-300 mb-2";

const ContactInformation = () => (
  <div className="logoContact mb-8 p-6 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
      Contact Information
    </h2>
    <p className={sharedTextClasses}>
      <span className="font-semibold">Devs: </span>
      gero, nico
    </p>
    <p className={sharedTextClasses}>
      <span className="font-semibold">Phone: </span>
      (123) 456-7890
    </p>
    <p className="text-zinc-700 dark:text-zinc-300">
      <span className="font-semibold">Email: </span>
      contact@example.com
    </p>
    <div className="">
      <Icons
        iconsYlinks={[
          {
            icon: "fab fa-github icon",
            link: "https://github.com/gerogabas/ProyectoKiosko",
            background: "before:bg-gray-800",
          },
          {
            icon: "fab fa-linkedin icon",
            link: "https://www.linkedin.com/in/",
            background: "before:bg-blue-700",
          },
          {
            icon: "fab fa-twitter icon",
            link: "https://twitter.com/",
            background: "before:bg-blue-500",
          },
        ]}
      />
    </div>
  </div>
);

const InputField = ({ id, label, type = "text" }) => (
  <div>
    <label className={sharedLabelClasses} htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      className={`${sharedInputClasses} border-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white`}
      required
    />
  </div>
);

const TextAreaField = ({ id, label }) => (
  <div>
    <label className={sharedLabelClasses} htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows="4"
      className={`${sharedInputClasses} border-zinc-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white`}
      required
    />
  </div>
);

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Como mandas un mail??");
    // Add form submission handling logic here
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField id="name" label="Name" />
      <InputField id="email" label="Email" type="email" />
      <TextAreaField id="message" label="Message" />
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

const ContactUsPage = () => (
  <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-6">
    <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
        Contact Us
      </h1>
      <ContactInformation />

      <ContactForm />
    </div>
  </div>
);

export default ContactUsPage;
