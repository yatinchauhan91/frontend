import React, { Component } from "react";
import Select from 'react-select';
import countryService from "../services/country.service";

export default class AddCountry extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveCountry = this.saveCountry.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            countryName: "",
            selectOptions: [
                { value: 'Oceania', label: 'Oceania' },
                { value: 'Europe', label: 'Europe' },
                { value: 'Africa', label: 'Africa' },
                { value: 'Asia', label: 'Asia' },
            ],
            continent: "",
            image: ""
        };
    }

    onChangeName(e) {
        this.setState({
            countryName: e.target.value
        });
    }

    handleChange(e) {
        this.setState({
            continent: e.value
        });
    }

    async convertToBase64(e) {
        const file = e.target.files[0];

        const maxAllowedSize = 4 * 1024 * 1024;

        if (e.target.files[0].size > maxAllowedSize) {
            alert('Max file size 4 mb can be uploaded.')
        } else {
            const base64 = await this.convertBase64(file);
            this.setState({
                image: base64
            });
        }
    }

    convertBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    saveCountry() {

        if (this.state.name == "" || this.state.continent == "" || this.state.image == "") return alert('Please fill all data.');
        var data = {
            name: this.state.countryName,
            continent: this.state.continent,
            image: this.state.image,
        };

        this.props.history.push('/countryList');

        countryService.create(data)
            .then(response => {
                if (response.data.status === 200) {
                    this.props.history.push('/countryList');
                }
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        return (
            <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label>Country Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="countryName"
                            required
                            value={this.state.countryName}
                            onChange={this.onChangeName}
                            name="Coutry Name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" accept=".png,.jpeg" onChange={(e) => { this.convertToBase64(e) }} />
                    </div>

                    <div className="form-group">
                        <label>Continent</label>
                        <Select
                            options={this.state.selectOptions}
                            onChange={this.handleChange}
                            placeholder="Select"
                        />
                    </div>

                    <button onClick={this.saveCountry} className="btn btn-success">
                        Submit
                    </button>
                </div>

            </div>
        );

    }
}
