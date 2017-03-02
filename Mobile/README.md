# Ionic 2 mobile app

The application can read the date from the Cloud server (Ubidots), rPi server via bluetooth and send commands to the rPi through the cloud

The structure of the app:
- inro-slides page: displays introduction slides about the app and its team
- home page: page where the user can choose the desired action: get data from the cloud, from rPi, control rPi
- cloud-sensors-index page: displays all the sensors with the latest values
- cloud-sensors-graph page: displays the graph for the sensor which the user ckicked. The user can choose 24h, last week, last month range
at the bottom of the graph there is statistics of values for the specified range
- control page: contains button, by clicking it rPi will implement the programmed action
- bluetooth-devices-list: shows avaliable devices for the bluetooth connection
- bluetooth-sensors-list: is shown after connecting to rPi and display the list of sensors with the latest values from rPi database
- data provider: contains methods with REST requests to the cloud
