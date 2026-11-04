import { useEffect, useState } from "react";
import { getGenres } from "../../../_services/genres";
import { showBook, updateBook } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors";
import { useNavigate, useParams } from "react-router-dom";

export const BookEdit = () => {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    stock: 0,
    genre_id: 0,
    author_id: 0,
    cover_photo: null,
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [genresData, authorsData, booksData] = await Promise.all([
        getGenres(),
        getAuthors(),
        showBook(id),
      ]);

      setGenres(genresData);
      setAuthors(authorsData);
      setFormData({
        title: booksData.title,
        price: booksData.price,
        stock: booksData.stock,
        genre_id: booksData.genre_id,
        author_id: booksData.author_id,
        cover_photo: booksData.cover_photo,
        description: booksData.description,
      });
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (const key in formData) {
        if (key === "cover_photo") {
          if (formData.cover_photo instanceof File) {
            payload.append("cover_photo", formData.cover_photo);
          }
        } else {
          payload.append(key, formData[key]);
        }
      }

      await updateBook(id, payload);
      navigate("/admin/books");
    } catch (error) {
      console.log(error);
      alert("Error updating book");
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover_photo") {
      setFormData({
        ...formData,
        cover_photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Buku
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Judul
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. Pelangi"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Harga
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. 12000"
                  required
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stok
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="e.g. 1"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="genre_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>
                <select
                  id="genre_id"
                  name="genre_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  required
                  value={formData.genre_id}
                  onChange={handleChange}
                >
                  <option selected value="">
                    --Pilih Genre--
                  </option>
                  {genres.map((genre) => (
                    <option value={genre.id} key={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="genre_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author
                </label>
                <select
                  id="author_id"
                  name="author_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  required
                  value={formData.author_id}
                  onChange={handleChange}
                >
                  <option selected value="">
                    --Pilih Author--
                  </option>

                  {authors.map((author) => (
                    <option value={author.id} key={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label
                  htmlFor="cover_photo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Cover
                </label>
                <input
                  type="file"
                  name="cover_photo"
                  id="cover_photo"
                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                  placeholder="Deskripsi buku"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Simpan Buku
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
