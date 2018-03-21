import React from 'react';
import "grommet/scss/hpinc/index.scss";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import DeployIcon from 'grommet/components/icons/base/Deploy';

const QuizView = ({ students, quiz }) => {

	const students = {
		
	}

	const quiz = {

	}

	return (
		<Section>
			<Button icon={<DeployIcon />}
							label='Go Live'
								onClick={()=> this.handleGoLive()}
							primary={false}
							secondary={false}
							accent={true}
							critical={false}
							plain={false} />
			<Columns masonry={false}
							maxCount={2}
							size='large'
							align='center'>
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
		</Section>
	)
}

export default QuizView;