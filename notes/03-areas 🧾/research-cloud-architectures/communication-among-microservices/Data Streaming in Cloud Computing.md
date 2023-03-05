---
tags:
  - dataStreaming
  - cloudComputing
  - cloudNative
  - microservice
---
#dataStreaming #cloudComputing #cloudNative #microservice #microservice 

is the continuous transmission of data from a source to a destination. With streaming, data sources send data frequently, sometimes multiple times per second, and in small quantities. Contrast that with the more traditional [batch processing](https://www.ibm.com/docs/en/zos-basic-skills?topic=jobs-what-is-batch-processing), where operations run infrequently and transmit larger amounts of data each time.  
Source: <https://www.udacity.com/blog/2021/08/what-is-data-streaming.html>

People who work with this: Data scientist

Aka: Streaming data processing

> Streaming data is data that is generated continuously by thousands of data sources, which typically send in the data records simultaneously, and in small sizes (order of Kilobytes). This data needs to be processed sequentially and incrementally on a record-by-record basis or over sliding time windows, and used for a wide variety of analytics including correlations, aggregations, filtering, and sampling.  
> ...  
> Stream processing requires ingesting a sequence of data, and incrementally updating metrics, reports, and summary statistics in response to each arriving data record. It is better suited for real-time monitoring and response functions.

<https://aws.amazon.com/streaming-data/>

In contrast there is: Batch processing

> Batch processing can be used to compute arbitrary queries over different sets of data. It usually computes results that are derived from all the data it encompasses, and enables deep analysis of big data sets. MapReduce-based systems, like Amazon EMR, are examples of platforms that support batch jobs


Many organizations are building a **hybrid model** by combining the two approaches, and maintain a real-time layer and a batch layer. Data is first processed by a **streaming data platform** such as [Amazon Kinesis](https://aws.amazon.com/kinesis/) to extract real-time insights, and **then persisted into a store like S3**, where it can be transformed and loaded for a variety of batch processing use cases.


treaming data processing requires two layers: a storage layer and a processing layer. 

**The storage layer** needs to support record ordering and strong **consistency** to enable fast, inexpensive, and replayable reads and writes of large streams of data.

**The processing layer** is responsible for consuming data from the storage layer, **running computations on that data**, and then notifying the storage layer to delete data that is no longer needed.

... You also have to plan for scalability, data durability, and fault tolerance in both the storage and processing layers.


### Infrastructure tools to build streaming data applications
Common in event driven architecture

### Storage and processing layer: Kafka
* **Does**: collect, process, and store continuous streams of event data or data that has no precise beginning or end.

Distributed data store optimized to store and handle real time data. Uses pub/sub to stream records and fault tolerance storage.

Kafka provides three main functions to its users:

*   Publish and subscribe to streams of records
*   Effectively store streams of records in the order in which records were generated
*   Process streams of records in real time

 <https://aws.amazon.com/msk/what-is-kafka/>


### RabbitMQ
Open source message broker that uses messaging queue approach. Queues are spread across a cluster of nodes and optionally replicated, with each message only being delivered to a single consumer.

<https://www.rabbitmq.com/>  
<https://aws.amazon.com/msk/what-is-kafka/>



### Storage and processing layer: AWS Kinesis

* **Does**: collects, processes and analyzes streaming data

process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information

Amazon Kinesis is a real-time, fully managed, and highly scalable cloud service for streaming large volumes of data on AWS  
<https://www.whizlabs.com/blog/what-is-aws-kinesis/>