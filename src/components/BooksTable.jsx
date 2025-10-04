import React, { useMemo } from 'react';
import Table from './Table/Table';
import TableActions from './ActionButton/TableActions';

const BooksTable = ({
  books,
  authors,
  editingRowId,
  setEditingRowId,
  editValue,
  setEditValue,
  setBooks,
  deleteBook,
  editableColumn = 'name',
  columnsConfig = ['id', 'name', 'pages', 'author', 'price', 'actions'],
}) => {
  // Create a lookup map for authors
  const authorMap = useMemo(
    () =>
      authors?.reduce((map, a) => {
        map[a.id] = `${a.first_name} ${a.last_name}`;
        return map;
      }, {}) ?? {},
    [authors]
  );

  // Enrich books with author names
  const enrichedBooks = useMemo(
    () =>
      books.map((b) => ({
        ...b,
        author_name: authorMap[b.author_id] || 'Unknown Author',
      })),
    [books, authorMap]
  );

  const handleEdit = (book) => {
    setEditingRowId(book.id);
    setEditValue(book[editableColumn] ?? ''); // name or price
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setEditValue('');
  };

  const handleSave = (id) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
            ...b,
            [editableColumn]:
              editableColumn === 'price'
                ? Number.isNaN(parseFloat(editValue))
                  ? b.price
                  : parseFloat(editValue)
                : editValue,
          }
          : b
      )
    );
    setEditingRowId(null);
    setEditValue('');
  };

  // Define all possible columns
  const allColumns = useMemo(() => {
    const editableCell = (key, inputType = 'text', step) => ({
      header: key === 'name' ? 'Name' : 'Price',
      accessorKey: key === 'name' ? 'name' : 'price',
      cell: ({ row }) => {
        const isEditingThisRow = editingRowId === row.original.id && editableColumn === key;
        if (!isEditingThisRow) return row.original[key];
        return (
          <input
            type={inputType}
            step={step}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave(row.original.id);
              if (e.key === 'Escape') handleCancel();
            }}
            className="border border-gray-300 rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        );
      },
    });

    return {
      id: { header: 'Book Id', accessorKey: 'id' },
      name: editableCell('name', 'text'),
      pages: { header: 'Pages', accessorKey: 'page_count' },
      author: { header: 'Author', accessorKey: 'author_name' },
      price: editableCell('price', 'number', '0.01'),
      actions: {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <TableActions
            row={row}
            onEdit={
              editingRowId === row.original.id
                ? handleCancel
                : () => handleEdit(row.original)
            }
            onDelete={() => deleteBook(row.original.id, row.original.name)}
          />
        ),
      },
    };
  }, [editingRowId, editableColumn, editValue, setEditValue, handleSave, handleCancel, handleEdit, deleteBook]);

  const columns = useMemo(
    () => columnsConfig.map((c) => allColumns[c]).filter(Boolean),
    [columnsConfig, allColumns]
  );

  return <Table data={enrichedBooks} columns={columns} />;
};

export default BooksTable;
