// src/pages/Inventory.jsx
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import BooksTable from '../components/BooksTable';
import useLibraryData from '../hooks/useLibraryData';
import { useSelector } from 'react-redux';

const Inventory = () => {
  // State for UI
  const [activeTab, setActiveTab] = useState('books');
  const [showModal, setShowModal] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [books, setBooks] = useState([]);

  const { userId } = useSelector((state) => state.auth)


  // Set active tab based on view query param
  const view = 'books';
  const { storeId } = useParams();
  const { storeBooks, authors } = useLibraryData({ storeId })

  useEffect(() => {
    if (view === 'authors' || view === 'books') {
      setActiveTab(view);
    }
  }, [view]);

  useEffect(() => {
    setBooks(storeBooks)
  }, [storeBooks]);

  // Modal controls
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
  };

  const deleteBook = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setEditingRowId(null);
      setEditPrice('');
    }
  };

  return (
    <div className="py-6">
      <div className="flex mb-4 w-full justify-center items-center">
        <button
          onClick={() => setActiveTab('books')}
          className={`px-4 border-b-2 py-2 ${activeTab === 'books' ? 'border-b-main' : 'border-b-transparent'}`}
        >
          Books
        </button>
        <button
          onClick={() => setActiveTab('authors')}
          className={`px-4 border-b-2 py-2 ${activeTab === 'authors' ? 'border-b-main' : 'border-b-transparent'}`}
        >
          Authors
        </button>
      </div>

      <Header addNew={openModal} title={`Store Inventory`} buttonTitle="Add to inventory" disabled={!userId} />

      {activeTab === 'books' ? (
        <p className="text-gray-600">No books found in this store.</p>
      ) : (
        <p className="text-gray-600">No authors with books in this store.</p>
      )}

      <BooksTable
        books={books}
        authors={authors}
        editingRowId={editingRowId}
        setEditingRowId={setEditingRowId}
        editValue={editPrice}
        setEditValue={setEditPrice}
        setBooks={setBooks}
        deleteBook={deleteBook}
        editableColumn="price"
        columnsConfig={['id', 'name', 'pages', 'author', 'price', 'actions']}
      />

      <Modal
        title="Add/Edit Book in Store"
        save={closeModal}
        cancel={closeModal}
        show={showModal}
        setShow={setShowModal}
      >
        <div className="flex flex-col gap-4 w-full">
          <div>
            <label htmlFor="book_select" className="block text-gray-700 font-medium mb-1">
              Select Book
            </label>
            <select
              id="book_select"
              className="border border-gray-300 rounded p-2 w-full"
            >
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-1">
              Price
            </label>
            <input
              id="price"
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Enter Price (e.g., 29.99)"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Inventory;