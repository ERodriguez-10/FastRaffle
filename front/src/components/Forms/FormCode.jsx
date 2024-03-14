import { useForm } from "react-hook-form";

const FormCode = ({ setOpenModalFunction }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const rCode = data.code;
    console.log(rCode);

    setOpenModalFunction();
    try {
      const response = await fetch(
        `http://localhost:8080/api/raffle/${rCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      setOpenModalFunction();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full bg-impresario">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 p-6">
          <div className="border-gray-900/10 pb-6">
            <h2 className="text-base font-semibold leading-7 text-white">
              Ingresa el código del Sorteo!
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Código del Sorteo
                </label>
                <div className="mt-2">
                  <input
                    {...register("code", { required: true })}
                    placeholder="Codigo..."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.code && (
                    <span className="text-white">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 col-span-full flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-white"
                  onClick={setOpenModalFunction}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCode;
