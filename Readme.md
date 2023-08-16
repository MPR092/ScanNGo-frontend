# ScanNGo - frontend
https://github.com/MPR092/fresh.git

## Description

The Scan-N-Go is a project aimed at developing a self-checkout mobile application using the 
MERN stack (MongoDB, Express.js, React, Node.js) and React Native framework. The app will 
allow users to scan and purchase items from a store without the need for human assistance, 
providing a seamless and efficient shopping experience.

## Installation

### Run the server first, make sure all the previous ports are free for the server.

Step 1:  npm i // Install all Dependencies

Step 2:  npm start //Run the frontend host

Step 3:  Scan the qr with expo go app on a mobile device  //Running the front end on a device

Note: Use device that has a working camera

Grant permissions to the expo app for the camera access 

# ***IMP***
Change front end baseurl first

- You can get the baseurl in assets/common/baseurl.js
- Change the ip for your device os (example shown below)

### Example: 

ipv4: 142.3.83.67

Then baseurl link will be:

Old: "http://142.3.83.67:3000/api/v1/"

Change it to your ipv4 url: "http://( replace with your ipv4 here ):3000/api/v1/"

You can find ip Through running :
### start > run > cmd type ipconfig


### Mobile Device Last Tested:
- ***Model: iPhone 13 Pro***
- ***OS: iOS - 16.6***
- ***Expo Client Version: 1017549***

#### errors and warnings shown (hidden from the device now) are because of the third party package (react-native-credit-card-input) and can be ignored