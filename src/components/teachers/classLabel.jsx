import React from 'react';
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';

const ClassLabel = (props) => {
  return (
		<Tile>
			<Card thumbnail={props.item.thumbnail}
				label={props.item.year}
				heading={props.item.className}
				description='Sample description providing more details.' />
		</Tile>
	)
}

export default ClassLabel

