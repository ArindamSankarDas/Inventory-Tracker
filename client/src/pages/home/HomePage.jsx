import IntroLogo from "../../assets/icons/logo.svg";

const HomePage = () => {
  return (
    <section className="bg-secondary w-full h-full flex flex-col items-center justify-center gap-10 flex-1">
      <div className="flex flex-col items-center justify-center gap-7">
        <h1 className="text-4xl font-semibold">Welcome to </h1>
        <img src={IntroLogo} alt="logo" />
      </div>
      <p className="w-2/3 font-medium text-center tracking-wider leading-7 lg:w-1/2 lg:text-2xl">
        This inventory management app is a straightforward web application that
        allows for basic Create, Read, Update, and Delete (CRUD) operations
        along with user authentication.
      </p>
    </section>
  );
};

export default HomePage;
