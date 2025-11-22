import React, { FC, Dispatch, SetStateAction } from "react";
import { Iperson } from "../AppTypes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  persons: Iperson[];
  setPersons: Dispatch<SetStateAction<Iperson[]>>;
}

const AddUser: FC<Props> = ({ isOpen, setIsOpen, persons, setPersons }) => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required("نام الزامی است"),
    lastName: Yup.string().required("نام خانوادگی الزامی است"),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-white/20 dark:bg-gray-800/40 backdrop-blur-xl shadow-lg border border-white/20 text-gray-800 dark:text-gray-100">
        <h2 className="text-xl font-semibold text-center mb-5">افزودن کاربر</h2>
        <Formik
          initialValues={{ firstName: "", lastName: "", image: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setPersons([
              ...persons,
              { ...values, id: Date.now(), date: new Date() },
            ]);
            setIsOpen(false);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4" autoComplete="off">
              <div>
                <label className="block mb-1 font-medium">نام</label>
                <Field
                  name="firstName"
                  className="w-full rounded-xl p-3 bg-white/30 dark:bg-gray-900/40 border border-white/30 focus:ring-2 focus:ring-indigo-400"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block mb-1 font-medium">نام خانوادگی</label>
                <Field
                  name="lastName"
                  className="w-full rounded-xl p-3 bg-white/30 dark:bg-gray-900/40 border border-white/30 focus:ring-2 focus:ring-indigo-400"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-white/30 dark:bg-gray-700/50">
                  {values.image ? (
                    <img src={values.image as string} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">بدون تصویر</div>
                  )}
                </div>
                <label
                  htmlFor="image"
                  className="mt-3 px-4 py-2 rounded-lg cursor-pointer bg-white/40 dark:bg-gray-700/60 hover:opacity-80 transition text-sm font-medium"
                >
                  بارگذاری تصویر
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => setFieldValue("image", reader.result as string);
                    reader.readAsDataURL(file);
                  }}
                />
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300/40 dark:bg-gray-700/60 hover:opacity-80 transition"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 transition"
                >
                  ثبت
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
