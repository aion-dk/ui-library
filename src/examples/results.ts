const getVoteCounts = () => {
  return {
    voted: 100,
    disabledCount: 2,
    disabledWeight: 4,
    votedWeight: 88,
    present: 0,
    presentWeight: 0,
    eligible: 100,
    eligibleWeight: 100,
    invalidVotes: 4,
    votedMultipleChannels: 5,
    excludedCount: 8,
    blankCount: 10,
  };
};

export { getVoteCounts };
