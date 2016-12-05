# CRC Live Count

This project is an Angular 2-based web application running on Georgia Tech Plesk servers. It keeps track of the current occupancy of the Campus Recreation Center (CRC) at Georgia Tech, overall occupancy and each section within the CRC. When there is no recent updated data provided by the CRC, the project runs a prediction algorithm to predict the occupancies. It also shows trends with line charts based on the history of occupancy.


## Release Notes
### Version 1.0
* Data is pulled from excel file
* Main page displays occupancies and predictions
* Graph displaying historical data on statistics page
* Predictions for the next 3 hours are provided on the Today graph


### Unfinished Features for Release 2.0 


* Machine learning based predictions
* Administrative login to change data, areas
* Events page to view special events at the CRC

## Getting Started


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites


```
npm ver. 3.10.9 - https://www.npmjs.com/
Node.js ver. 6.6.0 - https://nodejs.org/en/
Python ver. 2.7.12 - https://www.python.org/downloads/release/python-2712/
Pandas ver. 0.19.1  - http://pandas.pydata.org/pandas-docs/stable/install.html
```

### Installing

Clone the repository from 
```
https://github.com/jackli439/jdesign2.git
```
Navigate to src/ and install the required packages by running
```
npm install
```


Make sure the excel spreadsheet used by the application is placed in the root folder and named 
```
crc.xlsx
```
To start the local server, run 
```
npm start
```
This should start the server at http://localhost:5555. You can now navigate to that site using any web browser.

To run backend scripts manually, navigate to the root directory of jdesign2
Run the following to create the necessary data files used by the application
```
python backend.py
python prediction.py
```


Backend.py supports two modes of usage: python backend.py and python backend.py -c. Backend.py will work in most cases, but should there be any change to the excel file besides just adding data to the end, backend.py -c will incorporate those fixes, while backend.py, for the sake of efficiency, skips to the end and assumes the data has stayed the same up above.





## Deployment

This application should be deployed on the Plesk Web server. The prediction.py and backend.py scripts should be set to run repeatedly as scheduled tasks. Run backend.py as often as desired to check for new data and prediction.py for predictions. 

## Built With


* Angular 2 - The web framework used
* Chart.js - The chart graphic for stats
* Python - Main framework for backend


## Authors

* **Jack Li** - Front end development
* **Royce Kim** - Front end development
* **Nimish Todi** - Back end development
* **Stephen Dao** - Front end development
* **Tyler Abney** - Back end development




## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments


* Campus Recreation Center at Georgia Tech for support
* Professors Robert Waters and Liz Hutter for guidance
