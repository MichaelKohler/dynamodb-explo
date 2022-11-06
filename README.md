# DynamoDB exploration

## Simple PK

Table name: `mk-dynamodb-explo-simple-pk`
Partition Key: `id`

### Observations

* Creating item with just `id` and `something` works nicely - `simple-pk-create-item.js`
* If creating a new item with the same `id`, the item gets overriden with the new data
* Getting item by `id` works nicely - `simple-pk-get-item.js`

## Compound PK (sort key as string)

Table name: `mk-dynamodb-explo-compound-pk`
Partition Key: `id`
Sort Key: `foo` (string)

### Observations

* Creating item with `id`, `foo` (sort key) and `something` (data) works nicely - `compound-pk-create-item.js`
* Creating item with the same `id` but different `foo` works nicely
* Creating item with same `id` and `foo` overrides the item with the new `something` value
* Querying with just `id` does not work -> `ValidationException: The provided key element does not match the schema` - `compound-pk-get-item.js`
* Adding `foo` (sort key) to the query makes it work and returns matching item - `compound-pk-get-item.js`
* Query with a `KeyConditionExpression` allows us to better filter the result, in this case with `<` on `foo` which does alphabetical comparisons - `compound-pk-get-item-before.js`
  * For example, two entries with `foo` being "foo" and "bar". If we pass `foo` as "bar", we do not get any result. If we pass `foo` as "meh", then we get both. If we pass "c" we get the "bar" entry.

## Compound PK (sort key as date)

(in the end this is literally the same as above, just using string dates basically....)

Table name: `mk-dynamodb-explo-compound-pk-date`
Partition Key: `id`
Sort Key: `occured_at` (string, but using an ISO Date for it)

### Observations

* As per above, we can use `<` to better filter. However, we always need to provide the sort key. Common cases include having an id and a specific date (creation date for example). Therefore we can easily filter on entries that were created before date X. - `compound-pk-date-get-item-before.js`
* We can also query for dates between certain values with the `BETWEEN` filter - `compound-pk-date-get-item-between.js`
* While only passing the partition key does not work, we can pass the current date and query for `<` to get all entries for a given partition key
