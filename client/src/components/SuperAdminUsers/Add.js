import "./Add.css";

const Add = (props) => {
  console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setOpen(false);
  };

  return (
    <div className="addForm">
      <div className="modalForm">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1 className="form-title">Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="form-group">
                <label>
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  className="form-input"
                />
              </div>
            ))}
          <div className="form-group form-button">
            <input
              type="submit"
              className="form-submit button-primary bg-primary"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
