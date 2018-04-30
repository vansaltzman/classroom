import React from 'react'


import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';

const classViewDefault = ({live, toggleGrades}) => {
  return (
    <div style={{
      left: 0,
      lineHeight: '200px',
      marginTop: '-100px',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      width: '100%'
    }}>
      <Heading align="center">
  
        {live ? 'No quiz is active now.' : 'This class is currently offline'}
  
      </Heading>

      {/* Button should link to prev student quiz data */}
      <Button label='View Previous Quizzes'
        accent={true} 
        onClick={toggleGrades}  
      />
    </div>
  )
}
 
export default classViewDefault;