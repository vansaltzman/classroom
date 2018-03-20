import React from 'react';
import Columns from 'grommet/components/Columns';

class ClassView extends React.Component {
  render() {
		return(
			<Columns masonry={false}
							 maxCount={2}
							 size='medium'>
				<Box align='center'
						 pad='medium'
						 margin='small'
						 colorIndex='light-2'>
					Side bar for students list
				</Box>
				<Box align='center'
						 pad='medium'
						 margin='small'
						 colorIndex='light-2'>
					Quiz List
				</Box>
			</Columns>
		)
	}
}

export default ClassView