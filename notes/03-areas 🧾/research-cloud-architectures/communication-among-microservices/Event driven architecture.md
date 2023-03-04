---
tags:
  - architecturePatterns
  - cloudNative
  - microservice
  - reactiveProgramming
---
#architecturePatterns #cloudNative #microservice #reactiveProgramming 

Microservices are  a foundational part of cloud native application architecture
event-driven architecture is widely considered best practice for microservices implementations


> Event-driven architecture maximizes the potential of [cloud native applications](https://www.ibm.com/cloud/learn/cloud-native) and enables powerful applications technologies, such as real-time analytics and decision support.
Source: https://www.ibm.com/cloud/learn/event-driven-architecture


### Parts

1. **Producer**: transmits an event—in the form of a message—to a broker or some other form of event router, where the event’s chronological order is maintained relative to other events
2. **Consumer**:  ngests the message—in real-time (as it occurs) or at any other time it wants—and processes the message to trigger another action, workflow, or event of its own.
	1. **Simple event processing**. An event immediately triggers an action in the consumer. For example, you could use **Azure Functions** with a Service Bus trigger, so that a function executes whenever a message is published to a Service Bus topic.
	2. **Complex event processing**. A consumer processes a series of events, looking for patterns in the event data, using a technology such as **Azure Stream Analytics or Apache Storm**. For example, you could aggregate readings from an embedded device over a time window, and generate a notification if the moving average crosses a certain threshold.
	3. **Event stream processing**. Use a data streaming platform, such as **Azure IoT Hub or Apache Kafk**a, as a pipeline to ingest events and feed them to stream processors. The stream processors act to process or transform the stream. There may be multiple stream processors for different subsystems of the application. This approach is a good fit for IoT workloads.
3. **Broker:** The broker receives each event message, translates it if necessary, maintains its order relative to other messages, makes them available to subscribers for consumption, and then deletes them once they are consumed (so that they cannot be consumed again).
4. **Message models**
	1. **Pub/sub:** event consumers subscribe to a class or classes of messages published by event producers. When an event producer publishes an event, the message is sent directly to all subscribers who want to consume it. 
	2. **Event Streaming:**  In the event streaming model, event producers publish _streams_ of events to a broker. Event consumers subscribe to the streams, but instead of receiving and consuming every event as it is published, consumers can step into each stream at any point and consume only the events they want to consume. The key difference here is that the events are retained by the broker even after the consumers have received them. (Kafka is a tool for this)

source: https://www.ibm.com/cloud/learn/event-driven-architecture




### Notes


Event driven is reactive
**Event-Driven Systems are Reactive**

[The Reactive Manifesto](https://www.reactivemanifesto.org/) addresses problems with legacy by laying out the philosophies of modern web-native software development.
https://medium.com/swlh/monolith-to-event-driven-microservices-with-apache-kafka-6e4abe171cbb

-   **events** are simple notifications raised towards an event store
-   **messages** are data sent towards an addressable recipient
-