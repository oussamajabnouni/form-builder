import React from "react";

let queue = [];

// By wrapping the Profile like this, we can set the onRender to whatever
// we want and we get the additional benefit of being able to include
// additional data and filter phases
function Profiler({ metadata, phases, ...props }) {
  function reportProfile(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    if (!phases || phases.includes(phase)) {
      queue.push({
        metadata,
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
      });
    }
  }
  return <React.Profiler onRender={reportProfile} {...props} />;
}

export { Profiler };
