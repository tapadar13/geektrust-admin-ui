const Pagination = ({
  usersPerPage,
  totalUsers,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const nPages = Math.ceil(totalUsers / usersPerPage);

  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const startPage = () => {
    setCurrentPage(1);
  };

  const endPage = () => {
    setCurrentPage(Math.ceil(totalUsers / usersPerPage));
  };

  return (
    <nav>
      <ul className="pagination">
        <li>
          <a href="!#" className="page-link" onClick={startPage}>
            Start
          </a>
        </li>
        <li className="page-item">
          <a href="!#" className="page-link" onClick={prevPage}>
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              href="!#"
              onClick={() => setCurrentPage(number)}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="!#" className="page-link" onClick={nextPage}>
            Next
          </a>
        </li>
        <li className="page-item">
          <a href="!#" className="page-link" onClick={endPage}>
            End
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
