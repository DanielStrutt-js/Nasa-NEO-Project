import React, { Component } from "react";

import axios from "axios";
import BarChart from '../components/Chart';

const dataColumnTitles = ["name", "min estimated diameter", "max estimated diameter"];

class MainPage extends Component {
    state = {
        data: [],
    };

    componentDidMount() {
        this.getDataHandler();
    };


    getDataHandler = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY")
        .then(response => {
            const restructuredData = response.data.near_earth_objects.map(
                ({name, estimated_diameter}) => {
                    return [
                        name,
                        estimated_diameter.kilometers.estimated_diameter_min,
                        estimated_diameter.kilometers.estimated_diameter_max,
                    ];
                }
            );
            this.setState({data: [dataColumnTitles, ...restructuredData]})
       
        }).catch(function(error) {
            console.log(error);
          });
    };


  render(){
    const { data } = this.state;
    
    return (
        <React.Fragment>
            <BarChart chartData={data}/>
        </React.Fragment>
    )
  }
};

export default MainPage;