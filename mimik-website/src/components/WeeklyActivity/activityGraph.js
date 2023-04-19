import { useState, useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { db } from '../../firebase';
import { Line } from 'react-chartjs-2';

const WeeklyActivityGraph = ({ userId }) => {
  // console.log('userId:', userId);
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const fetchWeeklyActivity = async () => {
      const analytics = getAnalytics();
      console.log(analytics);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const query = await analytics.getEvents({
        userProperties: [{ name: 'userId', value: userId }],
      });
      const formattedData = query.results
        .filter(result => result.dimensions[1] === userId)
        .map(result => ({
          date: result.dimensions[0],
          totalEvents: result.metrics[0],
        }));
      setActivityData(formattedData);
      console.log(formattedData);
    };

    fetchWeeklyActivity();
  }, [userId]);

  const graphData = {
    labels: activityData?.map(data => data.date),
    datasets: [
      {
        label: 'User Activity',
        data: activityData?.map(data => data.totalEvents),
        fill: false,
        backgroundColor: '#4caf50',
        borderColor: '#4caf50',
      },
    ],
  };

  return (
    <div>
      {activityData ? (
        <Line data={graphData} />
      ) : (
        <p>Loading graph data...</p>
      )}
    </div>
  );
};

export default WeeklyActivityGraph;
