const getHealthData = (req, res) => {
  res.json({
    heartRate: 78,
    spo2: 98,
    temperature: 36.8,
    status: "Normal",
  });
};

module.exports = {
  getHealthData,
};