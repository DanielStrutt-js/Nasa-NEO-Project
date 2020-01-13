import React, { Component } from "react";

import axios from "axios";
import BarChart from '../components/Chart/Chart';
import DropDown from '../components/DropDown/DropDown';

const dataColumnTitles = ["name", "min estimated diameter", "max estimated diameter",{ role: "planet" }];

class MainPage extends Component {
    state = {
        data: [],
        dropDownOptions: [
            { value: "all", label: "All" },
            { value: "earth", label: "Earth" },
            { value: "mars", label: "Mars" },
            { value: "no planet", label: "no orbited planet" }],
        selectedOption: 'Show All Near Earth Objects',
        selectedData: [],
    };

    componentDidMount() {
        this.getDataHandler();
    };


    getDataHandler = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
        .then(response => {
            const restructuredData = response.data.near_earth_objects.map(
                ({name, estimated_diameter, close_approach_data}) => {
                    //some neo's close_approach_data is empty so this checks if it is empty
                    //if empty return "no orbited planet" if not map through it and return planet.
                    const close_approaches =
                        close_approach_data && close_approach_data.length
                            ? close_approach_data.map(({ orbiting_body }) => orbiting_body)
                            : ["no orbited planet"];
                    return [
                        name,
                        estimated_diameter.kilometers.estimated_diameter_min,
                        estimated_diameter.kilometers.estimated_diameter_max,
                        close_approaches[0]
                    ];
                }
            );
            this.setState(
                {data: [...restructuredData],
                selectedData: [dataColumnTitles, ...restructuredData]
            });
       
        }).catch(function(error) {
            console.log(error);
          });
    };
    
//gets current selected planet from onChangeHandler then filters of data looking for arrays
//that contain the current selected planet, then return all arrays containing that planet
//if it finds no arrays with selected planet return data array.
    getPlanetInformation = planet => {
        const { data } = this.state;
        const information = data.filter(item => item.includes(planet));
        return information.length ? information : data;
      };

    onChangeHandler = selected => {
        const planetInformation = this.getPlanetInformation(selected.label);
        this.setState({
          selectedOption: selected.label,
          selectedData: [dataColumnTitles, ...planetInformation]
        });
      };

  render(){
    const { selectedData, dropDownOptions, selectedOption } = this.state;
    
    return (
        <React.Fragment>
            <DropDown options={dropDownOptions} onChange={this.onChangeHandler} default={selectedOption} />
            <BarChart chartData={selectedData}/>
        </React.Fragment>
    )
  }
};

export default MainPage;