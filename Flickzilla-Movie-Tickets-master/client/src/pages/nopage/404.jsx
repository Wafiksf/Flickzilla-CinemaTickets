import Footer from "../../components/footer/Footer";
import image from "../../images/imageedit_4_3927277980.png";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <div className="movie-info-container">
        <div className="robot-about">
          <img
            src="https://www.pointgadget.com/wp-content/uploads/2019/12/best-netflix-alternatives.jpg"
            alt="interstellar"
          />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
            Page Not Found
          </h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col py-20">
        <div>
          <img src={image} alt="Page Not Found"></img>
        </div>
          <h1 className="text-4xl font-bold mt-9">
            Sorry we can't find that page! 
          </h1>
          <p className="mt-5 text-xl">The page you are looking for was
            never existed.
          </p>
          <Link to="/">
            <button className="bg-pink2 text-white font-bold py-2 px-4 mt-5">Back To Home</button>
          </Link>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default NoPage;
