const getRecommendationsList = (amount: number = 8) =>
  [
    {
      id: 1,
      position: 8,
      label: "Mette Marie Jensen",
    },
    {
      id: 2,
      position: 7,
      label: "Recommendation with a really loooooooong name",
    },
    {
      id: 3,
      position: 6,
      label: "Happy Snow",
    },
    {
      id: 4,
      position: 5,
      label: "Karl Shumacher",
    },
    {
      id: 5,
      position: 4,
      label: "Leon Lombardsky",
    },
    {
      id: 6,
      position: 3,
      label: "Rasmus Rasmussen",
    },
    {
      id: 7,
      position: 2,
      label: "Elvira Emilie Henriksen",
    },
    {
      id: 8,
      position: 1,
      label: "Markus Frederik Børsen",
    },
  ].splice(0, amount);

export { getRecommendationsList };
