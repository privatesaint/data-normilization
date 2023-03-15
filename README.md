##Introduction
This is a simple app to show data normilization.

#### How to use the app

```bash

# Clone this repository
$ git clone https://github.com/privatesaint/data-normilization.git

# Navigate into the cloned repository
$ cd data-normilization

# Install dependencies
$ npm install

# create a copy of env
$ cp .env.example .env

#Provide all the required variables

# Run migration
$ knex migrate:latest --env main

# Run the app
$ npm run dev
```
