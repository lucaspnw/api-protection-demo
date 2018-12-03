# api-protection-demo

This is a simple demo server for exercising API Protection. It will:

* respond to HTTP Requests with information about the request

* respond to DNS requests

It tries to decode the authorization header information in the request, including JWT / Bearer token. This allows you to fiddle around with SSO configurations and see the result easily, because you know for sure that the request got to the server.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


Grab the package

```
git clone https://github.com/lucaspnw/api-protection-demo.git
```

Install the prerequisites

```
cd api-protection-demo
npm -i
```

Edit the configuration

```
vi package.json
```

Then run the server:

```
nodejs server.js
```

Then watch the logs

 

### Prerequisites

To use this, get a linux box that is routeable to your running API Protection system. Mac will probably also work but I didn't test it.


## Built With

* [Node](http://www.nodejs.org/) - NodeJS


## Authors

* **Lucas Thompson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Great other modules used in this simple project

