import React from 'react';
import StudentQuizGradeAccordionList from './StudentQuizGradeAccordionList.jsx';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Button from "grommet/components/Button";
import Anchor from "grommet/components/Anchor";
import Box from "grommet/components/Box";
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';

class StudentQuizGradesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        this.props.getQuizDataForStudentInClass({
            studentId: this.props.studentId,
            classId: this.props.targetClass.id
        })
    }

    render() {
        let className = this.props.targetClass.name;
        let classId = this.props.targetClass.id
        if (this.props.quizGrades) {
            var quizData = this.props.quizGrades
        } else {
            var quizData = [];
        }
        return (
            <div>
                <Article>
                    <Section 
                        pad='medium'
                        justify='between'
                        colorIndex='grey-4'
                        align='center'
                        direction="row"
                        >
                        {this.props.targetClass.isLive ?
                        <Anchor 
                            icon={<LinkPreviousIcon size="large" />}
                            label='Go Back'
                            primary={false}
                            style={{lineHeight: '100px', marginLeft: "10px"}}
                            onClick={this.props.toggleGrades}
                        /> : 
                        <div style={{width: '100px'}}>
                            {' '}
                        </div>
                        }
                        <Headline margin='medium' size='medium'>
                            {className}
                        </Headline>
                        <div style={{width: '100px'}}>
                            {' '}
                        </div>
                    </Section>

                    {!quizData.length ?
                        <Headline margin='medium' size='small'>
                            No quizzes to show at this moment
                        </Headline>
                        :
                    <StudentQuizGradeAccordionList 
                        quizData={quizData}
                    />          
                    }          
                </Article>
            </div>
        )
    }
}
export default StudentQuizGradesView;