import React, { Component } from "react";
import Select from 'react-select';
import countryService from "../services/country.service";

export default class CountryList extends Component {
    constructor(props) {
        super(props);
        this.retrieveCountries = this.retrieveCountries.bind(this);

        this.state = {
            countries: [],
            selectOptions: []
        };
    }

    async componentDidMount() {
        await this.retrieveCountries();
    }

    async retrieveCountries() {
        await countryService.getAll()
            .then(response => {
                const ddlOptions = response.data.data?.map((data) => {
                    return { value: data._id, label: data.name }
                });
                this.setState({
                    countries: response.data.data,
                    selectOptions: ddlOptions
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleChange(selectedOption) {
        countryService.get(selectedOption.value)
            .then(response => {
                this.setState({
                    countries: response.data.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { countries } = this.state;

        return (
            <div className="submit-form">
                <div>
                    <Select
                        onChange={this.handleChange.bind(this)}
                        options={this.state.selectOptions}
                        placeholder="Select"
                    />
                </div>
                <div className="form-group">
                    <h4>Country List</h4>
                    <ul className="list-group">

                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Rank</th>
                            </tr>
                            {countries?.map((data, index) => (
                                <tr>
                                    <td>
                                        {data.name}

                                    </td>
                                    <td>
                                        <img src={data.image} height="50px" className="App-logo" alt="logo" />
                                    </td>
                                    <td>
                                        {data._id}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </ul>
                </div>
            </div>
        );

    }
}
