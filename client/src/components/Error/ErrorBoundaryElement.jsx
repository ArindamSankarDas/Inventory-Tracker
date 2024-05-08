import notFound404 from "../../assets/website/404.png";

const ErrorBoundaryElement = () => {
  return (
    <main
      className={
        "relative w-full min-h-screen flex flex-col gap-6 justify-center items-center bg-error_color"
      }
    >
      <img
        className="relative z-20 max-w-56 drop-shadow-3xl-white lg:max-w-[34rem]"
        src={notFound404}
        alt="not found page image"
        width={"100%"}
      />
      <h1 className="relative z-20 text-4xl font-semibold font-serif">
        A Dog Ate this Page
      </h1>
      <h1 className="absolute top-[24%] z-10 text-[220px] text-center text-gray-700 lg:text-[520px] lg:top-auto">
        404
      </h1>
    </main>
  );
};

export default ErrorBoundaryElement;
