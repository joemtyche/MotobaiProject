import React, { useEffect, useState } from "react";
import {
  UserPlusIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import Logo from "../../assets/Logo.png";
import "../pages.css";

export default function DynamicForm({
  btnTitle,
  title,
  formArr,
  onSubmit,
  icon,
  defaultValue,
  deleteBtn,
  deleteHandler,
  deleteBtnTitle,
  trashIcon,
}) {
  //Makes array to OBJECT
  const prepareForm = () => {
    return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
  };

  const [form, setForm] = useState(defaultValue || prepareForm(formArr));
  const initialForm = prepareForm(formArr);

  const onChangeHandler = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  //SET FORM BACK TO OLD STATE
  const onsubmitHandler = () => {
    onSubmit(form, () => setForm(initialForm));
  };

  return (
    <section>
      <div>
        <div>
          <div
            className={`absolute inset-0 w-fit h-fit m-auto bg-mainColor rounded-lg z-10
            `}
          >
            <div className={`bg-mainColor w-1/2 rounded-l-lg`}>
              <img
                className="max-w-16 rounded-l-xl"
                src={Logo}
                alt="Motobai-Logo"
              />
            </div>
            <form onSubmit={onSubmit} className={`min-w-[55vw]`}>
              <div className={`bg-gray-100 py-10 px-8 rounded-b-lg`}>
                <h1 className="font-bold text-2xl mb-10">{title}</h1>
                <div className={`   gap-x-6 gap-y-8 grid grid-cols-3 `}>
                  {formArr.map(({ label, name, type, readOnly }, index) => (
                    <div
                      className={`flex flex-col justify-between`}
                      key={index}
                    >
                      <input
                        className={`shadow-sm text-base border-2 rounded py-2 px-4 focus:border-green-600 focus:ring-0 focus:outline-none`}
                        readOnly={readOnly}
                        label={label}
                        id={name}
                        name={name}
                        type={type}
                        value={form[name] || ""}
                        onChange={(e) => onChangeHandler(e)}
                        required
                      ></input>
                      <label
                        className={`absolute transition-all duration-100 ease-in  px-4 py-2 label-line text-gray-600 label-line`}
                        htmlFor={name}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className={`flex justify-end gap-4 mt-12 `}>
                  <button
                    type="button"
                    onClick={(e) => {
                      {
                        deleteHandler(e);
                      }
                    }}
                    className={`${deleteBtn} shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center`}
                  >
                    {deleteBtnTitle}
                    {trashIcon}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onsubmitHandler();
                    }}
                    type="submit"
                    className={`shadow-md bg-white border-2 border-red-700 rounded px-4 py-2 hover:bg-red-700 hover:text-white transition-all duration-100 flex gap-4 items-center`}
                  >
                    {btnTitle}
                    {icon}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}