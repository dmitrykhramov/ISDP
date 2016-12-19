# -*- coding: utf-8 -*-
"""
Created on Mon Dec 19 16:47:41 2016

@author: Michi
"""
import bluetooth
import time
import json

#Tobias Arduino 98:D3:31:FC:32:0B

btdevices = []  #List of all Bt Devices from JSON File
loopbreak = 0 #If no Bt Device is found, or All data are send loopbreak -> 1
connected = 0 #Serves the status of the current btconnection

with open('btdevices.json') as data_file:    #read JSOn File
        data = json.load(data_file)

for i in range(0, len(data)):
        btdevices.append("")
        btdevices[i] = data["device" + str(i)]["BTaddr"] #All BT adresses will be saved in one Variable

while 1:
        for i in range(0,len(btdevices)):       #For every device in the json file, the following code will be executed
                connected = 0
                loopbreak = 0
                data = ""       #actual recieved data will be resetet before a new connection is established
                data_end = -1   #data_end will be != -1 when the complete message is recieved
                bd_addr = btdevices[i] #the address from the Arduino sensors
                port = 1
                sock = bluetooth.BluetoothSocket (bluetooth.RFCOMM)
                try: #If possible, connect to the BT device in "bd_addr"
                        sock.connect((bd_addr,port))
                        print "Connected to " + bd_addr +"."
                        connected = 1
                except: #If no connection can be established. do the following
                        print "Connection to " + bd_addr + " failed."
                        loopbreak = 1
                while loopbreak == 0:
                        tosend = raw_input("Input: ")   #Here we can enter a command, which will be sent to the connected device
                        if tosend != 'q' and connected == 1:
                                try:
                                        sock.send(tosend)       #Data will be send
                                        #data_end = -1
                                except:
                                        print "Sending failed"

                                while data_end == -1:   #Here we are recieving data
                                        try:
                                                data += sock.recv(1024)
                                                data_end = data.find('}')
                                                if data_end != -1:      #If the messaage is not completely send, the Pi will listen.
                                                        print data #Data will be available at this point. Data storge etc will happen after this point. JSON encodong etc.
                                                        try:
                                                                data =  json.loads(data)
                                                                print "Dummyvalue --> Smokesensor: " + str(data["Smoke"])
                                                        except:
                                                                print "No JSON Object found."
                                                        data = ""
                                                        loopbreak = 1
                                        except:
                                                print "Connection closed. Cannot recieve data"
                                                loopbreak = 1
                                sock.close()    #Connection to devices will be closed.
                                print "Connection to " +bd_addr+ " closed."
                                time.sleep(3)#Sleep some Seconds to be sure BT Connection is closed
                time.sleep(10) #Sleep some Time to restart the circle. This is the timeframe for smartphones to connect to the boards

"""
Recieved data can look like this
Recievedformat =    '{"Smoke": "a", "CO": "b", "NOx": "c", "CO2": "d", "Humidity": "e", "Pressure": "f"}'
"""