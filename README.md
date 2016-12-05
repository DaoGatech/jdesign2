List of requirements:
https://files.t-square.gatech.edu/access/content/attachment/gtc-4b22-674c-5080-8f76-82f72e46db8c/Assignments/88db795b-5827-4f09-a5a2-76d1a798de23/Customer%20Delivery%20Documentation_Fall2016.pdf


There is no example


Release Notes
New software features for this release 
Bug fixes made since the last release
Known bugs and defects -- you should also include here any functionality you promised the customer but which is missing in the release


Install Guide
Pre-requisites: what is the required configuration of software and hardware that the customer must have before they can begin the installation process.
Dependent Libraries that must be installed: what third party software must be installed for your software to function
Download instructions: how will the customer and users get access to the project?
Build instructions (if needed): if you are providing the raw source code rather than a binary build, how will the customer and users create the required executable application
Installation of actual application: what steps have to be taken after the software is built, what directories are required for installation CS 3312/LMC 3431 Fall 2016 -- All Sections
Run instructions: what does the user/customer actually have to do to get the software to execute Troubleshooting: what are common errors that occur during installation and what is the corrective action





# CRC Live Count

This project is an Angular 2-based web application running on Georgia Tech Plesk servers. It keeps track of the current occupancy of the Campus Recreation Center (CRC) at Georgia Tech, overall occupancy and each section within the CRC. When there is no recent updated data provided by the CRC, the project runs a prediction algorithm to predict the occupancies. It also shows trends with line charts based on the history of occupancy.

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


Backend.py supports two modes of usage. Backend.py will work in most cases but should there be any change to the excel file besides just adding data to the end


```

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


## Unfinished Features


* Machine learning based predictions
* Administrative login to change data, areas


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments


* Campus Recreation Center at Georgia Tech for support
* Professors Robert Waters and Liz Hutter for guidance
