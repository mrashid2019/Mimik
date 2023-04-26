import { useState, useEffect } from 'react';
import { getAnalytics } from 'firebase/analytics';
import { db } from '../../firebase';
import { Line } from 'react-chartjs-2';

const WeeklyActivityGraph = ({ userId }) => {
  // console.log('userId:', userId);
  const [activityData, setActivityData] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // firebase.auth().onAuthStateChanged((user) => {
  // if (user) {
  //   setCurrentUserId(user.uid);
  // }
  // });

  useEffect(() => {
    const fetchWeeklyActivity = async () => {
      if (currentUserId) {
        const analytics = getAnalytics();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        const query = await analytics.getEvents({
          userProperties: [{ name: 'userId', value: currentUserId }],
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
        });
        const formattedData = query.results
          .filter(result => result.dimensions[1] === currentUserId)
          .map(result => ({
            date: result.dimensions[0],
            totalEvents: result.metrics[0],
          }));
        setActivityData(formattedData);
      }
    };
  
    fetchWeeklyActivity();
  }, [currentUserId]);

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
    {currentUserId ? (
      activityData ? (
        <Line data={graphData} />
      ) : (
        <p>Loading graph data...</p>
      )
    ) : (
      <p>Please log in to see your activity graph.</p>
    )}
  </div>
  );
};

export default WeeklyActivityGraph;
