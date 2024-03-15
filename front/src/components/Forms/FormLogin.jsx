import { useForm } from "react-hook-form";

const FormLogin = ({ setOpenModalFunction }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    // try {
    //   const response = await fetch(
    //     `http://localhost:8080/api/raffle/${rCode}/user/${user}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const responseData = await response.json();

    //   if (!responseData.error) {
    //     toast.success("¡Tu participación se ha registrado correctamente!", {
    //       position: "bottom-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });

    //     setOpenModalFunction();
    //   } else {
    //     toast.error(`${responseData.message}`, {
    //       position: "bottom-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  return (
    <div className="w-full bg-impresario">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12 p-6">
          <div className="border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-white">
              ¡Ingresar!
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Nombre de Usuario
                </label>
                <div className="mt-2">
                  <input
                    {...register("username", { required: true })}
                    placeholder="Nombre de Usuario..."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.username && (
                    <span className="text-white">
                      Este campo es obligatorio
                    </span>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="Contraseña..."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 border-gray-400 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
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
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-customOrange px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
