#microservice#dataBase #techStack #tradeRepublic  #dataManagement #cloudComputing #cloudNative 



## Relational Databases (with JVM)

>SQL databases are relational. The relational database management system (RDBMS) is the basis for structured query language (SQL), which lets users access and manipulate data in highly structured tables. This is foundational model for database systems such as MS SQL Server, IBM DB2, Oracle, and MySQL
>
Source: https://www.oracle.com/database/nosql/what-is-nosql/

### How the data is stored
> The data in an RDBMS is stored in database objects that are called tables. A table is a collection of related data entries, and it consists of columns and rows. These databases require defining the schema upfront, that is, all of the columns and their associated datatypes must be known beforehand so applications can write data to the database. They also store information linking multiple tables through the use of keys, thus creating a relationship across multiple tables. In the simplest case, a key is used to retrieve a specific row so that it can be examined or modified
Source: https://www.oracle.com/database/nosql/what-is-nosql/

### When to chose SQL
* When the business applications rely on highly normalized data to prevent data anomalies as well as data duplication. ie: finance, accounting, and enterprise resource planning 
* When need to do complex queries, sub queries, nested queries
* 

### Tool: Hibernate
- Object Relational Mapping (ORM) database: is a programming technique for converting data between relational databases and object oriented programming languages such as Java, C#, etc.
- Good for: 
	- perform CRUD operations
	- match better the database with objects
	- mapping metadata
	- 
### Tool: JOOQ
- Tool to write SQL. Stands for:  JOOQ Object Oriented Querying
- Light database mapping library for Java that implements the active record pattern. It aims to provide relational and object oriented domain specific queries. It uses JDBC for the relational queries, might use Hibernate for the Object Mapping ones

**active record pattern:** an approach to accessing data in a database. The table/view is wrapped in a class, thus an object instance is tied to a row in a table. When the object is updated, the row in the DB is updated too.
more: https://en.wikipedia.org/wiki/Active_record_pattern






## noSQL db
> NoSQL databases (aka "not only SQL") are non-tabular databases and store data differently than relational tables. NoSQL databases come in a variety of types based on their data model. The main types are document, key-value, wide-column, and graph. They provide flexible schemas and scale easily with large amounts of data and high user loads.
https://www.mongodb.com/nosql-explained


### How the data is stored
> The data can be stored without defining the schema upfront—which means you have the ability to get moving and iterate quickly, defining the data model as you go. This can be suitable for specific business requirements, whether it’s graph-based, column-oriented, document-oriented, or as a key-value store.
> https://www.oracle.com/database/nosql/what-is-nosql/

### Types
-   **Document databases** store data in documents similar to JSON (JavaScript Object Notation) objects. Each document contains pairs of fields and values. The values can typically be a variety of types including things like strings, numbers, booleans, arrays, or objects.
-   **Key-value databases** are a simpler type of database where each item contains keys and values.
-   **Wide-column stores** store data in tables, rows, and dynamic columns.
-   **Graph databases** store data in nodes and edges. Nodes typically store information about people, places, and things, while edges store information about the relationships between the nodes.
https://www.mongodb.com/nosql-explained

### When should NoSQL be used?
TLDR: real-time web applications and big data

-   Fast-paced Agile development
-   Storage of structured and semi-structured data
-   Huge volumes of data
-   Requirements for scale-out architecture
-   Modern application paradigms like microservices and real-time streaming

### Tool: Apache Cassandra
https://cassandra.apache.org/_/index.html

noSQL Database  that offers wide column (store data in tables, rows, and dynamic columns) with eventually consistent semantics.

Read: http://www.sosp.org/2001/papers/welsh.pdf 
staged event-driven architecture ([SEDA](http://www.sosp.org/2001/papers/welsh.pdf)) architecture used to design Cassandra.

Sources:" https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html -- there are there papers to read.

## NoSQL - In Memory database
### Redis
(for **RE**mote **DI**ctionary **S**erver)
Is an open source, **in-memory, NoSQL key/value** store that is used primarily as an application cache or quick-response database. Because it stores data in memory, rather than on a disk or solid-state drive (SSD), Redis delivers unparalleled speed, reliability, and performance.
https://www.ibm.com/cloud/learn/redis#toc-differenti-2K4obpj3

