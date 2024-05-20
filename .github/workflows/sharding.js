function shardTests(tests, maxShardDuration) {
    console.log("tests: "+ tests);
    console.log("maxShardDuration: "+ maxShardDuration);
    const shards = [];
    let currentShard = { tests: [], duration: 0 };
  
    for (const test of tests) {
        console.log(test);
      const newDuration = currentShard.duration + test.duration;
      if (newDuration > maxShardDuration) {
        shards.push(currentShard);
        currentShard = { tests: [], duration: 0 };
      }
      currentShard.tests.push(test.test); // Store only the test name
      currentShard.duration += test.duration;
      console.log("currentShard: "+ currentShard);
    }
  
    // Add the last shard if it has tests
    if (currentShard.tests.length > 0) {
      shards.push(currentShard);
    }
    
    console.log(shards);
    return shards;
  }

const process = require('process')
shardTests(process.argv[2], process.argv[3]);