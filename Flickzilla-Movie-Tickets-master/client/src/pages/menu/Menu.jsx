import React from "react";
import Footer from "../../components/footer/Footer";
import Icons from '../../components/icons/icons';

export default function Menu() {
  return (
    <>
      <div className="about-container">
        <div className="movie-info-container">
          <div className="robot-about">
            <img
              src="https://www.myvue.com/-/media/1536x864_retail_banner_3_snacks_no_text-min.jpg?sc=.99"
              alt="interstellar"
            />
            <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
              Menu
            </h1>
          </div>
          <div className="rubon mt-3">
            <img
              src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
              alt="rubon"
            />
          </div>
        </div>
        <section className="my-20">
          <div className="moviesNowPlaying">
            <div>
              <Icons.Popcorn size={32} className="text-pink2" />
            </div>
            <p className="flicklogo font-bold">Menu</p>
            <div>
              <h1 className="font-bold">Popcorn</h1>
            </div>
          </div>
          <div className="relative">
            <div className="w-5/6 h-96 m-auto relative">
              <img
                src="https://media.cnn.com/api/v1/images/stellar/prod/220118141908-01-popcorn-stock.jpg?c=16x9&q=h_720,w_1280,c_fill"
                alt="Product"
                className="w-full h-full object-cover shadow-2xl rounded"
              />
              <div className="absolute top-0 left-0 text-black lg:w-1/2 md:w-full h-full flex justify-center items-center">
                <table className="w-full h-full bg-white rounded bg-opacity-20">
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-2">
                        <span className="lg:text-2xl md:text-xl font-bold">
                          Savory Salted Popcorn
                        </span>
                        <p className="leading-5">
                          Experience the classic goodness of our Savory Salted
                          Popcorn.
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-2">
                        <span className="lg:text-2xl md:text-xl font-bold">
                          Caramel Delight Popcorn
                        </span>
                        <p className="leading-5">
                          Indulge in the sweet allure of our Caramel Delight
                          Popcorn. Each kernel is coated in a rich caramel
                          glaze.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <span className="lg:text-2xl md:text-xl font-bold">
                          Cheddar Cheese Explosion Popcorn
                        </span>
                        <p className="leading-5">
                          Get ready for a flavor explosion with our Cheddar
                          Cheese Popcorn. Packed with the bold taste of cheddar.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=" p-4 flex justify-center items-center">
              <table className="w-3/6  font-bold mt-5">
                <thead>
                  <tr className="bg-[#FFF700] text-black bg-opacity-60">
                    <th className="p-2 text-center">Small</th>
                    <th className="p-2 text-center">Medium</th>
                    <th className="p-2 text-center">Large</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-yellow-400">
                    <td className="p-2 text-center">$2</td>
                    <td className="p-2 text-center">$3.5</td>
                    <td className="p-2 text-center">$4</td>
                  </tr>
                </tbody>
              </table>
            </div>

          <hr className="w-5/6 m-auto my-10"></hr>

          <div className="moviesNowPlaying mt-10">
            <div>
              <Icons.Nachos size={32} className="text-pink2" />
            </div>
            <p className="flicklogo font-bold">Menu</p>
            <div>
              <h1 className="font-bold">Nachos</h1>
            </div>
          </div>
          <div className="relative">
            <div className="w-5/6 h-96 m-auto relative">
              <img
                src="https://cdn.winsightmedia.com/platform/files/public/2019-04/background/nachos-shutterstock_1555366103.jpg?VersionId=pycve3VVvpAh2AB3bFhg_eUOB7XRnVe2"
                alt="Product"
                className="w-full h-full object-cover shadow-2xl rounded"
              />
              <div className="absolute top-0 left-0 text-white lg:w-1/2 md:w-full h-full flex justify-center items-center">
                <table className="w-full h-full bg-black rounded bg-opacity-20">
                  <tbody>
                    <tr className="border-b border-white">
                      <td className="p-2">
                        <span className="lg:text-2xl md:text-xl font-bold">
                          Classic Nachos
                        </span>
                        <p className="leading-5">
                          Crispy tortilla chips generously layered with melted
                          cheese, drizzled with creamy sour cream, and crowned
                          with zesty salsa.
                        </p>
                      </td>
                    </tr>
                    <tr className="border-b border-white">
                      <td className="p-2">
                        <span className="lg:text-2xl md:text-xl font-bold">
                          Cheesy Bliss Nachos
                        </span>
                        <p className="leading-5">
                          Dive into a symphony of flavors with our Cheesy Bliss
                          Nachos. Golden chips heaped with cheese blend, velvety
                          sour cream.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2">
                        <span className="lg:text-2xl md:text-xl font-bold">
                          Salsa Fiesta Nachos
                        </span>
                        <p className="leading-5">
                          The salsa fiesta with Salsa Fiesta Nachos. Each chip
                          dances with melted cheese, and a cooling swirl of sour
                          cream.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className=" p-4 flex justify-center items-center mt-5">
              <table className="w-3/6  font-bold">
                <thead>
                  <tr className="bg-black text-white bg-opacity-60">
                    <th className="p-2 text-center">Small</th>
                    <th className="p-2 text-center">Medium</th>
                    <th className="p-2 text-center">Large</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black">
                    <td className="p-2 text-center">$2.50</td>
                    <td className="p-2 text-center">$3.10</td>
                    <td className="p-2 text-center">$4.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          <hr className="w-5/6 m-auto my-10"></hr>

          <div className="moviesNowPlaying mt-10">
            <div>
              <Icons.CupStraw size={32} className="text-pink2" />
            </div>
            <p className="flicklogo font-bold">Menu</p>
            <div>
              <h1 className="font-bold">Soft Drinks</h1>
            </div>
          </div>
          <div className="">
            <div className="flex justify-center">
              <h1 className="lg:text-xl md:text-md font-bold">
                Pepsi | Diet Pepsi | Miranda | Mountain dew | 7 Up | Coca-Cola
              </h1>
            </div>
            <div className="relative mt-5">
            <div className="w-5/6 h-96 m-auto relative">
              <img
                src="https://images.alphacoders.com/238/238041.jpg"
                alt="Product"
                className="w-full h-full object-cover shadow-2xl rounded"
              />
            </div>
          </div>
            <div className=" p-4 flex justify-center items-center mt-5">
              <table className="w-3/6 border-collapse font-bold">
                <thead>
                  <tr className="bg-red-700 bg-opacity-60">
                    <th className="p-2 text-center">Small</th>
                    <th className="p-2 text-center">Medium</th>
                    <th className="p-2 text-center">Large</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-red-700">
                    <td className="p-2 text-center">$1.50</td>
                    <td className="p-2 text-center">$2.10</td>
                    <td className="p-2 text-center">$2.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
