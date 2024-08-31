import React, { useEffect, useState } from 'react';

const PageInsights = ({ pageId, accessToken, accessPageToken }) => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);
  const period = "total_over_range"
  const since = Math.floor((Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);
  const until = Math.floor(Date.now() / 1000);

  useEffect(() => {
    if (pageId && accessToken) {
      window.FB.api(
        `/${pageId}/insights?metric=page_fans,page_post_engagements,page_impressions_unique,page_actions_post_reactions_total&period=${period}&since=${since}&until=${until}&access_token=${accessPageToken.access_token}`,
        function (response) {
          console.log(response)
          if (response && !response.error) {
            setDetails({
              followers: response.data[0]?.values[0]?.value || 0,
              engagement: response.data[1]?.values[0]?.value || 0,
              impressions: response.data[2]?.values[0]?.value || 0,
              reactions: response.data[3]?.values[0]?.value || 0,
            });

          } else {
            console.error('Error fetching insights:', response.error);
            setError(`Error fetching insights. ${response.error.message}`);
          }
        }
      );

    }
  }, [accessToken, pageId, accessPageToken]);
  return (
    <div>
      {error && <div>{error}</div>}
      {details && !error && (
        <div>
          <div className='header'>
            <span>period : {period}</span>
            <span>since : {since}</span>
            <span>until : {until}</span>
          </div>
          <div>Followers: {details.followers}</div>
          <div>Engagement: {details.engagement}</div>
          <div>Impressions: {details.impressions}</div>
          <div>Reactions: {details.reactions}</div>
          <div style={{ marginBlock: "20px" }}>{JSON.stringify(details)}</div>
        </div>
      )}
    </div>
  );
};

export default PageInsights;
