# ski-compare

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Idea behind the project to create a web application to visualize and compare ski resorts to decide on the next ski trips. Ski resorts are compared by their properties such as location, number of slopes and visitors rating. Additionally, weather data for selected ski resorts can be analysed.

This is not a commercial project. Purpose of this project is to apply new technologies on a topic I personally find useful.

## Data

Data used in the application is mostly fetched or scrapped from [Bergfex](https://www.bergfex.at/). It provides all data related to the organisation of ski resorts, current snow and operational status. [OpenWeatherMapApi](https://openweathermap.org/api) provides weather data and [Bing Maps](https://docs.microsoft.com/en-us/bingmaps/) is the source for geo data. When backend is fetching data, it is using cached data to reduce number of requests.

## Deployment

Application is deployed on Vercel. It can be opened by clicking on a link in about section.
