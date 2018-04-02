import React from 'react';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';



class IndividualQuizGradeAccordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                    <Section pad='large'
                        justify='center'
                        align='center'>
                        <Headline margin='medium'>
                            Quiz Grizzies
                        </Headline>



                    </Section>
            </div>
        )
    }
}
export default IndividualQuizGradeAccordion;