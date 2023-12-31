import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import HornedBeast from "./HornedBeast";
import { filterBeasts, filterUniqueHornCounts } from "../js/filters";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        searchTerm: "",
        horns: "All",
      },
      filteredBeasts: this.props.beastData,
      uniqueHornCounts: filterUniqueHornCounts(this.props.beastData),
    };
  }

  handleSetFilters = ({ target: { name, value } }) => {
    const filters = { ...this.state.filters };
    filters[name] = value;
    const filteredBeasts = filterBeasts(this.props.beastData, filters);
    this.setState({ filters, filteredBeasts });
  };

  handleFormReset = () => {
    this.setState({
      filters: { searchTerm: "", horns: "All" },
      filteredBeasts: this.props.beastData,
    });
  };

  render() {
    const { handleBeastSelection } = this.props;
    return (
      <main>
        <Container fluid>
          <Row className="sticky-top">
            <Col xs={12} sm={12} md={10} lg={10} xl={8}>
              <Form>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="search">Search</InputGroup.Text>
                  <Form.Control
                    aria-label="Search"
                    aria-describedby="search"
                    name="searchTerm"
                    value={this.state.filters.searchTerm}
                    onInput={this.handleSetFilters}
                  />
                  <InputGroup.Text id="horn-filter">
                    Horn Filter
                  </InputGroup.Text>
                  <Form.Select
                    name="horns"
                    value={this.state.filters.horns}
                    onChange={this.handleSetFilters}
                  >
                    {this.state.uniqueHornCounts.map((label) => (
                      <option key={label}>{label}</option>
                    ))}
                  </Form.Select>
                  <Button
                    variant="outline-secondary"
                    id="clear-search"
                    onClick={this.handleFormReset}
                  >
                    &#10005;
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <Row className="mb-4">
            {this.state.filteredBeasts.map((beast) => (
              <Col
                key={beast._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                className="d-flex"
              >
                <HornedBeast
                  beast={beast}
                  handleBeastSelection={handleBeastSelection}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </main>
    );
  }
}
