# wanderlist-native

An Android application for [Wanderlist](https://github.com/peterzernia/wanderlist) using React Native.

Available on the [Google Play](https://play.google.com/store/apps/details?id=dev.wanderlist.wanderlist)

Available on [Expo](https://expo.io/) for Android: expo/@peter176/wanderlist

## Development

Requirements: Docker

In the .env file, set REACT_APP_API_URL to your local network IP address, port 8000 e.g. `REACT_APP_API_URL=http://192.168.1.228:8000`

Run `make build` to build the docker contaniers. The [wanderlist](https://github.com/peterzernia/wanderlist) backend image is hosted on the [Docker hub](https://hub.docker.com/r/peterzernia/wanderlist).
Run `make init` to initialize the database. You will be prompted to create an admin account.
Run `make up` to start all the development servers.

Using the Expo development app, you can now scan the QR code with your phone to start the development app.

## Notes

The created admin account does not have a home country associated with it which breaks some UI until this is set. With the docker containers running, go to http://localhost:8000/admin/users/user/ to assign a home country to the admin user. Other users created through the application will not have this issue.
