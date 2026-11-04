import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../../../_services/authors";
import { Link } from "react-router-dom";

const AdminAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const authorsData = await getAuthors();
      setAuthors(authorsData);
    };
    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Apakah anda ingin menghapus author ini?",
      );

      if (confirmDelete) {
        await deleteAuthor(id);
        setAuthors(authors.filter((author) => author.id !== id));
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting author");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="author-search" className="sr-only">
              Search authors
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="author-search"
                type="search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Search authors"
              />
            </div>
          </div>
          <div className="flex w-full shrink-0 justify-end md:w-auto">
            <Link
              to="/admin/authors/create"
              type="button"
              className="flex items-center justify-center rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              <svg
                aria-hidden="true"
                className="mr-2 h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Tambah Author
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Nama
                </th>
                <th scope="col" className="px-4 py-3">
                  Foto
                </th>
                <th scope="col" className="px-4 py-3">
                  Bio
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id} className="border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                    >
                      <p className="line-clamp-2 whitespace-normal">
                        {author.name}
                      </p>
                    </th>
                    <td className="max-w-xl px-4 py-3">
                      <p className="line-clamp-2 whitespace-normal">
                        {author.photo}
                      </p>
                    </td>
                    <td className="max-w-xl px-4 py-3">
                      <p className="line-clamp-2 whitespace-normal">
                        {author.bio || "No biography provided"}
                      </p>
                    </td>
                    <td className="relative px-4 py-3">
                      <div className="flex items-center justify-end">
                        <button
                          id={`dropdown-button-${author.id}`}
                          onClick={() => toggleDropdown(author.id)}
                          className="inline-flex items-center rounded-lg p-1 text-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                          type="button"
                          aria-label={`Actions for ${author.name}`}
                          aria-expanded={openDropdownId === author.id}
                        >
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        {openDropdownId === author.id && (
                          <div
                            id={`dropdown-${author.id}`}
                            className="absolute right-4 top-full z-10 mt-2 w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
                          >
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby={`dropdown-button-${author.id}`}
                            >
                              <li>
                                <Link
                                  to={`/admin/authors/edit/${author.id}`}
                                  type="button"
                                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(author.id)}
                                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No authors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {authors.length}
          </span>{" "}
          {authors.length === 1 ? "author" : "authors"}
        </div>
      </div>
    </section>
  );
};

export default AdminAuthors;
