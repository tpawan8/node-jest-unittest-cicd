function shardTests(tests, maxShardDuration) {
    const shards = [];
    let currentShard = { tests: [], duration: 0 };
  
    for (const test of tests) {
      const newDuration = currentShard.duration + test.duration;
      if (newDuration > maxShardDuration) {
        shards.push(currentShard);
        currentShard = { tests: [], duration: 0 };
      }
      currentShard.tests.push(test.test); // Store only the test name
      currentShard.duration += test.duration;
    }
  
    // Add the last shard if it has tests
    if (currentShard.tests.length > 0) {
      shards.push(currentShard);
    }
  
    return shards;
  }
  