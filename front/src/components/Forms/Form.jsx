import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validateDateEnd = (dateEnd, { parent }) => {
  const { dateStart } = parent;
  if (dateEnd && dateStart) {
    return (
      dateEnd >= dateStart ||
      "La fecha de finalización debe ser mayor o igual a la fecha de inicio"
    );
  }
};

const Form = ({ setOpenModalFunction }) => {
  const schema = yup.object().shape({
    title: yup.string().required("Este campo es obligatorio"),
    description: yup.string().required("Este campo es obligatorio"),
    dateStart: yup.date().required("Este campo es obligatorio"),
    dateEnd: yup
      .date()
      .min(
        yup.ref("dateStart"),
        "La fecha de finalización debe ser mayor o igual a la fecha de inicio"
      )
      .required("Este campo es obligatorio")
      .test(
        "dateEnd",
        "La fecha de finalización debe ser mayor o igual a la fecha de inicio",
        validateDateEnd
      ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/raffle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      setOpenModalFunction();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full bg-impresario">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 p-6">
          <div className="border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-white">
              Informacion del Sorteo
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Título
                </label>
                <div className="mt-2">
                  <input
                    {...register("title", { required: true })}
                    placeholder="Título..."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.title && (
                    <span className="text-white">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Descripción
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description", { required: true })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Descripción..."
                  />
                  {errors.description && (
                    <span className="text-white">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="dateStart"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Fecha de inicio
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    {...register("dateStart", { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.dateStart && (
                    <span className="text-white">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="dateEnd"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Fecha final
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    {...register("dateEnd", {
                      required: true,
                      validate: validateDateEnd,
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.dateEnd && (
                    <span className="text-white">{errors.dateEnd.message}</span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <fieldset>
                  <div className="mt-2 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          {...register("hasMaxSize")}
                          type="checkbox"
                          onChange={() => setIsDisabled(!isDisabled)}
                          className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-white"
                        >
                          Añadir límite de participantes
                        </label>
                      </div>
                    </div>
                  </div>
                  {isDisabled && (
                    <div className="col-span-full">
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("maxSize")}
                          placeholder="Límite de participantes..."
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  )}
                </fieldset>
              </div>

              <div className="mt-6 col-span-full flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-white"
                  onClick={setOpenModalFunction}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-customOrange px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
