
### Inference: generating predictions. 
**Inference**: process of generating predictions

Main ways a model generates and serves its predictions to users: **online prediction** and **batch prediction**. 

Three main modes of prediction:
- **Batch** prediction, which uses **only batch** features. Is when predictions are generated periodically or whenever triggered. The predictions are stored somewhere, such as in SQL tables,  and retrieved as needed. **E.g:** Discover weekly in Spotify
	-  Also known as _asynchronous prediction_: predictions are generated asynchronously with requests.
	- **Downsides**: 
		- Makes your model less responsive to users’ change preferences
		-  You need to know what requests to generate predictions for in advance
- **Online** prediction that **uses only batch** features (e.g., precomputed embeddings). Is when predictions are generated and returned as soon as requests for these predictions arrive. **Eg**. Translate something in deepl
	- Request for predictions happen through RESTful APIs. _synchronous prediction_: predictions are generated in synchronization with requests.
	- **Downsides**:
		- Inference latency: When the model takes too long to generate the prediction.  (Big bottleneck comes from network latency)
			- Fix 1: make it do inference faster -> **Inference optimization**
			- Fix 2: make the model smaller -> **Model compresion** 
			- Fix 3: make the hardware it’s deployed on run faster.
- **Online** prediction that **uses both batch features and streaming features**. This is also known as **streaming** prediction.

Generating predictions should be done: on the device (also referred to as the **edge**)  and the cloud


 How a model serves and computes the predictions influences how it should be designed, the infrastructure it requires, and the behaviors that users encounter.


### Features
* features computed from historical data, such as data in databases and data warehouses, are **batch features**
* Features computed from streaming data—data in real-time transports—are **_streaming features_.** In online prediction, however, it’s possible to use both batch features and streaming features
**Example:**
Batch features The mean preparation time of this restaurant in the past

Streaming features: In the last 10 minutes, how many other orders they have, and how many delivery people are available


|Batch prediction (asynchronous)|Online prediction (synchronous)|
|---|---|
|Frequency|Periodical, such as every four hours|As soon as requests come|
|Useful for|Processing accumulated data when you don’t need immediate results (such as recommender systems)|When predictions are needed as soon as a data sample is generated (such as fraud detection)|
|Optimized for|High throughput|Low latency|


### Where computations are done
where your model’s computation will happen: on the cloud or on the edge
- **On the cloud means** a large chunk of computation is done on the cloud, either public clouds or private clouds.
	- **Downsides**: 
		- Cost
- **On the edge means** a large chunk of computation is done on consumer devices—such as browsers, phones, laptops, smartwatches, cars, security cameras, robots, embedded devices, FPGAs (field programmable gate arrays), and ASICs (application-specific integrated circuits)—which are also known as edge devices.
	- Benefits:
		- Can run anywhere even if there is no internet
		- Lower cost of servers
		- No worry about network latency
		- Good for handling sensitive user data, makes it easier to comply with GDPR

Starting point of many companies: on the cloud in AWS or GCP

### Modes of Dataflow

**Data passing through databases:** Requires both processes to have access to the DB and that the DB is fast

**Data passing through services** using requests such as the requests provided by REST and RPC APIs (e.g., POST/GET requests): A service makes a request, the other responds.
Example: To put the microservice architecture in the context of ML systems, imagine you’re an ML engineer working on the price optimization problem for a company that owns a ride-sharing application like Lyft. In reality, Lyft has [hundreds of services](https://oreil.ly/6fl8f) in its microservice architecture, but for the sake of simplicity, let’s consider only three services:

Driver management service Predicts how many drivers will be available in the next minute in a given area.

Ride management service Predicts how many rides will be requested in the next minute in a given area.

Price optimization service Predicts the optimal price for each ride. The price for a ride should be low enough for riders to be willing to pay, yet high enough for drivers to be willing to drive and for the company to make a profit.

Because the price depends on supply (the available drivers) and demand (the requested rides), the price optimization service needs data from both the driver management and ride management services. Each time a user requests a ride, the price optimization service requests the predicted number of rides and predicted number of drivers to predict the optimal price for this ride.[24](https://learning.oreilly.com/library/view/designing-machine-learning/9781098107956/ch03.html#ch01fn78)

**Downside:** 
Request-driven data passing is synchronous,  the target service has to listen to the request for the request to go through

**Data passing through a real-time transport** like Apache Kafka and Amazon Kinesis.

Whichever service wants data from the driver management service can check that broker for the most recent predicted number of drivers, imilarly, whenever the price optimization service makes a prediction about the surge charge for the next minute, this prediction is broadcast to the broker. 

Technically, a database can be a broker—each service can write data to a database and other services that need the data can read from that database. However, one needs to mind its downsides
