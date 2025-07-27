# Live Remote

Control Ableton Live from any device on a local network.

## Installation

Download latest version of the project from the [releases](https://github.com/isfopo/live-remote/releases) page. Unzip the file and place the "LiveRemote" folder in your Ableton Live "Remote Scripts" folder. The easiest way to access this folder is to open Ableton Live and go to "User" -> "Remote Scripts" in the browser.

### Step 0: Have python installed

If you don't already, install a stable version of python on your computer. A download can be found [here](https://www.python.org/downloads/). This repo has not been tested with MacOS' default version of python (2), but if you find that it works please let me know.

### Step 1: Clone the repo

Use git clone to make a copy on your local machine. This project folder does not need to be put in any specific place, so feel free to put in a projects folder or Desktop. At this point I would suggest naming your project with git clone option name argument.

```shell
git clone https://github.com/isfopo/RemoteScriptStarter.git <YourRemoteScriptName>
```

### Step 2: Install dependencies

Run `npm install` to install the dependencies listed in the `package.json` file. Note that these are JavaScript dependencies required for the project to run, not Python packages. In the python environment, packages are not available.

### Step 3: Building the Webview



### Step 3: Install your script with `install.py`

In this repo there is also a script that will move how `src` folder to the appropriate location on your computer for Ableton Live 11 to compile and make your script available in the application. Note that this location is different in older versions of Ableton (10 and lower), so to install your script with these version you must do it manually. Additional information about the arguments the script can use are in the file, but to move your script to the default location of "User Library" with the name of your top-level directory simply run:

```shell
python runners/install.py
```

Once the folder has been successfully copied you can start or restart Ableton for the code to compile to `.pyc` files and your script will be available in your set. Remote Script can be found under the MIDI section in Preference. Here are instructions.

This step, running the script and restarting Ableton, will need to be repeated in order to see any changes in your code, but I would suggest doing this before making any code changes in order to check my sanity. Please let me know if there are any issues. If the code does not compile or the script is not available then it is likely that there is an error in the code.

Note: Mac users who are not using their default version of python or have not changed their path to python3 will have to use `python3` instead of `python` to run these scripts

## Architecture

The project is divided into two main components: the Remote Script and the Web App.

The Remote Script is responsible for handling the communication between Ableton Live and the webview. It is written in Python and uses the Ableton Live API to interact with the application. The Remote Script is essentially hosting an HTTP server, that serves the web app, and a WebSocket server that communicates with the web app and the Ableton Live API.

The Web App is responsible for the user interface and user interaction. It is written in JavaScript and uses the Svelte framework to build the user interface. The Web App communicates with the Remote Script using WebSocket.
