import React from 'react';

// ThoughtList component will recieve 2 props: (a title & the thoughts array); props is also destructured
// conditionally render JSX by checking to see if there's any data in the thoughts array
const ThoughtList = ({ thoughts, title }) => {
    if (!thoughts.length) {
        return <h3>No Thoughts Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {thoughts && 
              thoughts.map(thought => (
                  <div key={thought._id} className="card mb-3">
                      <p className="card-header">
                          {thought.username} thought on {thought.createdAt}
                      </p>
                      <div className="card-body">
                          <p>{thought.thoughtText}</p>
                          <p className="mb-0">
                              Reactions: {thought.reactionCount} || Click to{' '}
                              {thought.reactionCount ? 'see' : 'start'} the discussion!
                          </p>
                      </div>
                  </div>
              ))}
        </div>
    );
};

export default ThoughtList;