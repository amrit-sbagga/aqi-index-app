# AQI City App

AQI City App is used to live monitor Air Quality Index for various cities.
The application is deployed at https://aqi-city-v1.herokuapp.com/

## Features
- City wise AQI chart
- AQI highlighted by different colors based on levels(Good, Poor, Severe etc)
- AQI upto 2 decimal places
- Displays bar chart of all 5 AQIS for any selected city

## App Description
>AQI City App makes use of 'websockets' to display live Air Quality metrices for various cities.
Once the websocket url is connected, web socket connection text displayed at top changes to 'Open'. To unsubscribe from connection, click on Open/Stop Connection button.
To view history APIs of any particular city, user has to click on city row in the table.
Currently, only bar chart displaying hitory AQIs gets displayed on click of any city row from the table. 

## Execution
In the project directory, run:

### `npm start`

Above command, runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if any edits are made.\

## Application Future Scope
- Live City wise chart (sparklines, scatter chart etc)
- Improve UI
- Bug Fixes
