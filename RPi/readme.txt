This is a step by step instruction on how to configure an bluetooth connection between a Raspberry Pi and an Arduino.
If i forgot a step, or if something is not working for you, please tell me, and i´ll try to help you.

The system runs on a Raspberry Pi 3 with the "Raspbian Jessie Lite" image Version November 2016.

1. Setup the Pi for bluetooth communication with an Arduino

	1.1 Check if the onbuild bluetooth system is working.
		hciconfig		should show the bluetooth module
		
		hcitool scan		to search for bluetooth devices

		sudo bluetoothctl	to activate the manual bluetooth modus

		discoverable on		makes the pi discoverable for other devices

		agent on

		default-agent

		scan on			should show other bt devices

		pair xx:xx:xx:xx:xx:xx	pairing with another bt device "xx:xx:xx:xx:xx:xx" is the bluetooth adress you want to connect to.

		trust xx:xx:xx:xx:xx:xx	is needed to trust the connection


		IF PAIRING IS NOT WORKING:
			I had to set the pi in an SPP Modus to be able to connect with my smartphone.
			Just do the following:

			sudo nano /etc/systemd/system/dbus-org.bluez.service

			Add "-C" in the following line. Then add the other given line directly under that line. The lines should look like this:

			ExecStart=/usr/lib/bluetooth/bluetoothd -C
			ExecStartPost=/usr/bin/sdptool add SP

			close the document and:

			sudo reboot

	1.2 Make BT device automatically discoverable.
		I added following lines to the rc.local to run them at booting. 
		sudo nano /etc/rc.local
		
		hciconfig hci0 piscan		#this makes the bt device discoverable
		rfcomm watch hci0		#this just watches the connection. I dont know why we need this, but its not working without it...

		sudo reboot

If you have done this, Bluetooth should be ready to be used in programs.
I am using Python to develope code. I hope you are fine with it. If you dont know this language, its similiar to C but easier to use.

2. Get used to BT in programs

	2.1 We need some library´s
		sudo apt-get update
		sudo apt-get install bluetooth
		sudo apt-get install python-bluez
		pip install simplejson

	2.2 Change btdevices.json
		You need to change this file to get connected to your BT Devices.
		nano btdevices.json			then erase the bt devices and add your own.
	
	2.3 Run the Example Code
		python autoconnect.py

3. Sources.
	We used the Android app "Bluetooth spp pro" to check our first programs
	I can give you some links where i found these informations.

	http://blog.whatgeek.com.pt/2015/09/bluetooth-communication-between-raspberry-pi-and-arduino/		Here is an easy Example to use
	https://www.raspberrypi.org/forums/viewtopic.php?t=138145&f=28