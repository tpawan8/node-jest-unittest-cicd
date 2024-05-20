function shardTests(tests, maxShardDuration) {
  //console.log("tests: ");
  //logObj(tests);
  tests = JSON.parse(tests);
  //console.log("maxShardDuration: "+ maxShardDuration);
  const shards = [];
  var index = 1;
  let currentShard = { tests: [], duration: 0, index: index };

  for (const test of tests) {
    //logObj(test);
    const newDuration = currentShard.duration + test.duration;
    if (newDuration > maxShardDuration) {
      shards.push(currentShard);
      index++;
      currentShard = { tests: [], duration: 0, index: index };
    }
    currentShard.tests.push(test.test); // Store only the test name
    currentShard.duration += test.duration;
    //console.log("currentShard:");
    //logObj(currentShard);
  }

  // Add the last shard if it has tests
  if (currentShard.tests.length > 0) {
    shards.push(currentShard);
    index++;
  }

  logObj(shards);
  return shards;
}

function logObj(obj) {
  console.log(JSON.stringify(obj));
}

const process = require('process')
shardTests(process.argv[2], process.argv[3]);