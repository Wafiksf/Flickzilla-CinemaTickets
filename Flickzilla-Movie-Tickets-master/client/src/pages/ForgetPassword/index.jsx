import { useState } from "react";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/api/password-reset`;
			const { data } = await axios.post(url, { email });
			toast.success(data.message, {
				theme: "colored",
			  });
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message, {
					theme: "colored",
				  });
			}
		}
	};

	return (
		<>
		<ToastContainer/>
		<div className="movie-info-container">
        <div className="robot-about">
          <img
            src="https://www.pointgadget.com/wp-content/uploads/2019/12/best-netflix-alternatives.jpg"
            alt="interstellar"
          />
          <h1 className="md:text-4xl lg:text-4xl xl:text-5xl font-bold">
            My Account
          </h1>
        </div>
        <div className="rubon mt-3">
          <img
            src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header-1536x8.jpg"
            alt="rubon"
          />
        </div>
      </div>
		<div className="my-20 mx-10">
			<form  onSubmit={handleSubmit}>
				<h1 className="mb-10">Lost your password? Please enter your email address. You will receive a link to create a new password via email.</h1>
				<label className="text-gray-500">Enter Your Email</label>
				<div>
					<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className="input-field bg-gray-100 px-8 py-4 md:w-96"
				/>
				</div>

				<button type="submit" className="bg-pink2 text-white font-bold py-2 px-4 mt-5">
					Submit
				</button>
			</form>
		</div>
		<footer>
        <Footer />
      </footer>
		</>
	);
};

export default ForgotPassword;