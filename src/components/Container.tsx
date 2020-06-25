import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Diagram} from "./Diagram";
import {Card} from "./Card";
import {PDFViewer} from "@react-pdf/renderer";
import {MyDocument} from "./MyDocument"

export const createSummary = (data: any) => {
    let covidData = [];
    let covidObject: any = {};
    covidObject.Global = {};
    let minConfirmed = data.Countries[0].TotalConfirmed;
    let maxConfirmed = 0;

    covidData.push(['Country', 'Total confirmed']);

    data.Countries.forEach((country: any) => {

        covidData.push([country.Country, country.TotalConfirmed]);

        if (maxConfirmed < country.TotalConfirmed) {
            maxConfirmed = country.TotalConfirmed;
        }

        if (minConfirmed > country.TotalConfirmed) {
            minConfirmed = country.TotalConfirmed;
        }
    });
    covidObject.data = covidData;
    covidObject.minConfirmed = minConfirmed;
    covidObject.maxConfirmed = maxConfirmed;
    covidObject.Global.NewConfirmed = data.Global.NewConfirmed;
    covidObject.Global.TotalConfirmed = data.Global.TotalConfirmed;
    covidObject.Global.NewDeaths = data.Global.NewDeaths;
    covidObject.Global.TotalDeaths = data.Global.TotalDeaths;
    covidObject.Global.NewRecovered = data.Global.NewRecovered;
    covidObject.Global.TotalRecovered = data.Global.TotalRecovered;

    return covidObject;
};

export const createConfirmedInSwitzerland = (data: any) => {
    let confirmedCases = [];
    confirmedCases.push(['x', 'Switzerland']);

    Array.prototype.forEach.call(data, country => {
        confirmedCases.push([new Date(country.Date).toLocaleDateString('de-DE'), country.Cases]);
    });
    return confirmedCases;
};


export const Container: React.FC = () => {
    const [summaryData, setSummaryData] = useState<any>();
    const [newConfirmed, setNewConfirmed] = useState<number>();
    const [totalConfirmed, setTotalConfirmed] = useState<number>();
    const [newDeaths, setNewDeaths] = useState<number>();
    const [totalDeaths, setTotalDeaths] = useState<number>();
    const [newRecovered, setNewRecovered] = useState<number>();
    const [totalRecovered, setTotalRecovered] = useState<number>();
    const [images, setImages] = useState<string[]>([]);
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);
    const [confirmedSwitzerland, setConfirmedSwitzerland] = useState<any>([]);

    function summary() {
        fetch('https://api.covid19api.com/summary')
            .then(response => response.json())
            .then(data => {
                const newSummary = createSummary(data);
                setMinValue(newSummary.minConfirmed);
                setMaxValue(newSummary.maxConfirmed);
                setNewConfirmed(newSummary.Global.NewConfirmed);
                setTotalConfirmed(newSummary.Global.TotalConfirmed);
                setNewDeaths(newSummary.Global.NewDeaths);
                setTotalDeaths(newSummary.Global.TotalDeaths);
                setNewRecovered(newSummary.Global.NewRecovered);
                setTotalRecovered(newSummary.Global.TotalRecovered);
                setSummaryData(newSummary.data);
            });
    }

    function confirmedInSwitzerland() {
        fetch('https://api.covid19api.com/total/dayone/country/switzerland/status/confirmed')
            .then(response => response.json())
            .then(data => {
                const newConfirmedInSwitzerland = createConfirmedInSwitzerland(data);
                setConfirmedSwitzerland(newConfirmedInSwitzerland);
            });
    }

    function handleClick(): void {
        ReactDOM.render(
            <PDFViewer>
                <MyDocument images={images}/>
            </PDFViewer>,
            document.getElementById('root'));
    }

    function handleImageURI(image: string): void {
        let temp = images;
        temp.push(image);
        setImages(temp);
    }

    useEffect(() => {
        summary();
        confirmedInSwitzerland();
    }, []);

    return (
        <div>
            <div className={'row py-5'}>
                <div className={'col mx-auto'}>
                    <h1 className={'display-1'}>Corona stats</h1>
                </div>
            </div>
            <div className={'row my-5'}>
                <div className={'col mx-auto'}>
                    <h1 className={'display-5'}>Data from: {new Date().toLocaleDateString('de-DE')}</h1>
                </div>
            </div>
            <div className={'row my-5'}>
                <div className={'col-lg-2 col-md-3 col-sm-4 mb-4'}>
                    <Card data={newConfirmed} title={'New confirmed'}/>
                </div>
                <div className={'col-lg-2 col-md-3 col-sm-4 mb-4'}>
                    <Card data={totalConfirmed} title={'Total confirmed'}/>
                </div>
                <div className={'col-lg-2 col-md-3 col-sm-4 mb-4'}>
                    <Card data={newDeaths} title={'New Deaths'}/>
                </div>
                <div className={'col-lg-2 col-md-3 col-sm-4 mb-4'}>
                    <Card data={totalDeaths} title={'Total deaths'}/>
                </div>
                <div className={'col-lg-2 col-md-3 col-sm-4 mb-4'}>
                    <Card data={newRecovered} title={'New recovered'}/>
                </div>
                <div className={'col-lg-2 col-md-3 col-sm-4 mb-4'}>
                    <Card data={totalRecovered} title={'Total recovered'}/>
                </div>
            </div>
            <div className={'row my-5'}>
                <div className={'col'}>
                    <h2 className={'mb-5'}>Confirmed cases of all countries</h2>
                    <Diagram data={summaryData} type={'Table'} title={'Covid-19 Chart'}
                             minValue={minValue} hTitle={'Countries'}
                             maxValue={maxValue} passImageURI={handleImageURI}/>
                </div>
            </div>
            <div className={'row my-5'}>
                <div className={'col'}>
                    <Diagram data={summaryData} type={'PieChart'} title={'Total confirmed'}
                             minValue={minValue} hTitle={'Countries'}
                             maxValue={maxValue} passImageURI={handleImageURI}/>
                </div>
            </div>
            <div className={'row my-5'}>
                <div className={'col'}>
                    <Diagram data={confirmedSwitzerland} type={'LineChart'} title={'COVID-19 in Switzerland'}
                             passImageURI={handleImageURI} hTitle={'Time'}/>
                </div>
            </div>
            <div className={'row py-5'}>
                <div className={'col'}>
                    <button onClick={handleClick} className={'btn btn-primary'}>Generate PDF</button>
                </div>
            </div>
        </div>
    );
};