---
title: "Message Delivery Guarantees in Kafka"
---

### Intro
I've got a little more hands on with pub-sub models in 2024 and had the opportunity to delve more into how some middleware systems fulfil their message delivery guarantees. In reality, such guarantees are so important that they govern how our world runs - imagine receiving duplicated telegram messages every now and then, or even worse, having a payment transaction going through twice to the shop. This post presumes some understanding of how Kafka works at a high level. (see this [article](https://docs.confluent.io/platform/current/clients/consumer.html))
> *if we were to go into the specifics, it wouldn't be the payment sender who will be in trouble if he/she only tapped on send once. The payment processor who facilitated this transaction would be responsible for rectifying this duplication. This is why Exactly Once Processing semantics is important and we will explore more about what it means later on*
> *you can assume that the terms 'event' and 'message' are interchangeable in the context of this post*

### Message Delivery Semantics
Message delivery semantics refers to the **definition of how a message broker or middleware will behave** when sending an event received from its upstream to a downstream consumer. There are 3 distinct delivery semantics defined - atleast once, at most once and *exactly once*. As their names suggest, they define how many times a consumer will process an event per event sent by the upstream. 

### Implication and Examples
Consequently, each type of message delivery guarantee has a toll on the throughput - volume of events flowing through the system at any given time. This is because it depends on the complexity of coordination between all 3 actors (producer, broker, consumer) in a pub-sub system. The more steps they need to perform before processing an event, the lower the throughput. 

Let's reference Kafka's delivery semantics:
| Type           | Throughput                               | Examples                                                                                           |
|----------------|------------------------------------------|---------------------------------------------------------------------------------------------------|
| Atleast Once   | Medium (wait for ack)                   | logs, metrics, analytics where duplicates are acceptable (analytics page views)                  |
| At Most Once   | High (fire forget w/o ack)              | realtime data where staleness is better than duplication (stock price tickers, game updates, live stream viewer counts) |
| Exactly Once   | Low (coordination needed between producer, broker and consumer) | Financial transactions, medical records, inventory systems. Uses at least once delivery with deduplication mechanisms like abort markers, transaction_state etc. |

### Implementations 
At Most Once and Atleast Once differs according to how and when the offset is being committed. Yes there is a difference between a consumed and committed offset.

When the auto-commit is enabled, the offset is committed regardless of whether the consumer has successfully processed the event. Suppose 10 events are polled, and an error occurs when processing the 9th event, the last event would have been (^or will eventually be) marked as committed. This implies that it will be difficult for Kafka to know in reality which is the last message the consumer has successfully consumed. 

This behaviour describes "At Most Once" delivery semantics, i.e. per event received Kafka will deliver it to the consumer at most once. This is how it's implemented:
```java
// 1. Enable auto-commit with small interval
Properties props = new Properties();
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "true");
props.put(ConsumerConfig.AUTO_COMMIT_INTERVAL_MS_CONFIG, "1000");  // Commit every 1s

// 2. Process after commit pattern (opposite of at-least-once)
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    // Auto-commit happens here during poll()
    for (ConsumerRecord<String, String> record : records) {
        processRecord(record);  // If processing fails, message is already committed and lost
    }
}
```
^*this depends on when the offsets are committed to the topic, usually at regular intervals in the background, and the reason is to optimize performance instead of committing on every successful process*

On the other hand, manually committing an offset on successful processing guarantees that the any consumed messages that were incorrectly processed will still be available for consumption as the offset would not be incremented unless otherwise. 
```java
// 1. Disable Auto-commit
Properties props = new Properties();
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false");         // Disable auto commit
props.put(ConsumerConfig.ISOLATION_LEVEL_CONFIG, "read_committed");   // Read only committed msgs

// 2. Process first, commit after
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        processRecord(record);    // Process first
        consumer.commitSync();    // Manual commit after successful processing
    }
}
```
The drawback here is reduced throughput because `commitSync` is a synchronous, blocking invocation until a response indicating either success / failure is received.

### Why the need for Exactly Once Processing?
Elaborating on the earlier payment transaction example, some financial institutions use stream processing applications to process debits and credits on user accounts. In these situations, there is no tolerance for errors in processing: we need every message to be processed exactly once, without exception.

More formally, if a stream processing application consumes message *A* and produces message *B* such that *B = F(A)*, then exactly-once processing means that *A* is considered consumed if and only if *B* is successfully produced, and vice versa.

### What do we mean by Exactly Once Processing?
Context is important when defining exactly-once semantics (EOS). In end-to-end idempotence, all systems in the pipeline should have exactly-once semantics in order for the entire to work as intend (between producer to broker, broker to consumer, consumer to store, etc.)

### Producer Idempotence
Producer API typically relies on ack by the kafka broker to determine if message is successfully sent. What happens when a producer calls send() multiple times for a single message from an internal retry because somehow it fails to receive an ack from the broker? How does the broker know to handle this duplication?

Producer idempotence is the idea where the message can be sent multiple times without affecting the internal result - effectively having the consumer receive it only once.

Each producer is assigned a unique Producer Id (PID) when it registers with the broker. Producers will always include their PID on each send. In addition, each message gets a monotonically increasing sequence number. A separate sequence is maintained for each topic partition that a producer sends messages to. On the broker side, on a per-partition basis, it keeps track of the largest PID-Sequence Number combination it has successfully written. 

In the case of duplicates from internal retries, the same sequence no. is reused, allowing the broker to validate the repeated messages. If the sequence number is out of order, the broker will simply skip appending it to the log and send an acknowledgement as though it was successfully written, preventing another duplicate. This describes Producer-Broker exactly-once semantics.

> *What if the producer crashes and restarts with a new PID, sending a message that was previously not yet acknowledged? The broker sees it as a unique PID-sequence no. combination and cannot detect duplication. This topic is not of our focus, and i will leave this [topic](https://www.confluent.io/blog/transactions-apache-kafka/) for another article*

### Summary
To conclude, we've touched on implementations of "At Most Once" and "Atleast Once" delivery guarantees in Kafka and their implications on throughput and examples of real world business impact. We've also seen how Kafka tackles one aspect of duplication between the Producer and Broker through producer idempotence in it's own EOS. 





