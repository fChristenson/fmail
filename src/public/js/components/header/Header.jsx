const React = require("react");
const Input = require("@material-ui/core/Input").default;
const Button = require("@material-ui/core/Button").default;
const SearchIcon = require("@material-ui/icons/Search").default;
const withRouter = require("react-router-dom/withRouter").default;
const Paths = require("../../config/paths");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (!event.target.search.value) return;

    this.props.onSubmit();

    if (window.location.pathname === Paths.searchTemplate) {
      this.props.history.replace(Paths.search(event.target.search.value));
    } else {
      this.props.history.push(Paths.search(event.target.search.value));
    }
  }

  render() {
    return (
      <header className="header">
        <span className="header__logo">Fmail</span>
        <form className="header__search-form" onSubmit={this.onSubmit}>
          <Input fullWidth name="search" className="header__search-field" />
          <Button type="submit" variant="contained" color="primary">
            <SearchIcon />
          </Button>
        </form>
      </header>
    );
  }
}

module.exports = withRouter(Header);
