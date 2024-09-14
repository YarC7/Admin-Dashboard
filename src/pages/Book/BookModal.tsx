import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "../../components/Header";
import { useGetGenresQuery } from "../../lib/apiSlice";

type BookFormData = {
  title: string;
  author: string;
  publisher: string;
  language: string;
  image: string;
  genre: string;
  publish_year: number;
  price: number;
  stockQuantity: number;
  rating: number;
  description: string;
};

type CreateBookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: BookFormData) => void;
};

const BookModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateBookModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    description: "",
    language: "",
    genre: "",
    image: "",
    price: 0,
    publish_year: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const {
    data: genres,
  } = useGetGenresQuery();

  const optionGenres = genres?.map((genre)=> {
    return (
        <option key={genre._id} value={genre.name}>{genre.name}</option>
    )
  })
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (evt) => {
        const image = evt.target.result.replace(/^data:image\/[a-z]+;base64,/, "").trim();
        setFormData({
        ...formData,
        image: "data:image/jpeg;base64," + image,
        });
    };    
  };

  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";
  const inputFlex =
    "w-40 gap-4 mb-2 m-1 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white ">
        <Header name="Create New Book" />
        <form onSubmit={handleSubmit} className="mt-5 ">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Book title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Tilte"
            onChange={handleChange}
            value={formData.title}
            className={inputCssStyles}
            required
          />
          <div className="flex">
            <div>
            <label htmlFor="productName" className={labelCssStyles}>
            Author
            </label>
            <input
                type="text"
                name="author"
                placeholder="Author"
                onChange={handleChange}
                value={formData.author}
                className={inputFlex}
                required
            />
            </div>
            <div>
            <label htmlFor="productName" className={labelCssStyles}>
            Publisher
            </label>
            <input
                type="text"
                name="publisher"
                placeholder="Publisher"
                onChange={handleChange}
                value={formData.publisher}
                className={inputFlex}
                required
            />
            </div>
          </div>
          
          

          <div className="flex ">
            <div>
                <label htmlFor="productPrice" className={labelCssStyles}>
                    Price
                </label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    value={formData.price}
                    className={inputFlex}
                    required
                />
            </div>
            <div>
                <label htmlFor="stockQuantity" className={labelCssStyles}>
                    Stock
                </label>
                <input
                    type="number"
                    name="stockQuantity"
                    placeholder="stockQuantity"
                    onChange={handleChange}
                    value={formData.stockQuantity}
                    className={inputFlex}
                    required
                />
            </div>
          </div>
          
          <div className="flex ">
            <div>
                <label htmlFor="productPrice" className={labelCssStyles}>
                    Publish Year
                </label>
                <input
                    type="number"
                    name="publish_year"
                    placeholder="Publish Year"
                    onChange={handleChange}
                    value={formData.publish_year}
                    className={inputFlex}
                    required
                />
            </div>
            <div>
                <label htmlFor="productPrice" className={labelCssStyles}>
                    Language
                </label>
                <input
                    type="text"
                    name="language"
                    placeholder="Language"
                    onChange={handleChange}
                    value={formData.language}
                    className={inputFlex}
                    required
                />
            </div>
          </div>
          <label htmlFor="genre" className={labelCssStyles}>
            Genre
          </label>
          <select id="genre" name="genre" defaultValue={formData.genre} onChange={handleChange} className="bg-gray-50 border-2 border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="" disabled>Choose a genre</option>
            {optionGenres}
          </select>
          <label htmlFor="description" className={labelCssStyles}>
            Summary
          </label>
          <input
            type="text"
            name="description"
            placeholder="Summary"
            onChange={handleChange}
            value={formData.description}
            className={inputCssStyles}
            required
          />
          
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-xs text-gray-900 border-2 border-gray-500 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" name="image" onChange={handleFileChange} type="file" accept="image/*"/>


          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookModal;