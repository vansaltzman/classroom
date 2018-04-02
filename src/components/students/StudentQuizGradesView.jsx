import React from 'react';
import StudentQuizGradeAccordionList from './StudentQuizGradeAccordionList.jsx';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Button from "grommet/components/Button";


class StudentQuizGradesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.toBeInComponentWillMount = this.toBeInComponentWillMount.bind(this);
    }
    // componentWillMount() {
 
    // }
    toBeInComponentWillMount() {
        this.props.getQuizDataForStudentInClass({
            studentId: this.props.studentId,
            classId: this.props.classId
        })
    }

    render() {
        let className = this.props.className;
        let classId = this.props.classId;
        return (
            <div>
                <Article>
                    <Section pad='large'
                        justify='center'
                        align='center'>
                        <Headline margin='medium'>
                        {className}
                        </Headline>
                    </Section>

                    <Section pad='large'
                        justify='center'
                        align='center'
                        colorIndex='grey-4'>
                        <Headline margin='none'>
                            Stats will go here
                        </Headline>
                    </Section>

                    <StudentQuizGradeAccordionList />

                    <Button
                        label="get Data"
                        type="button"
                        primary={true}
                        onClick={this.toBeInComponentWillMount}
                        />
                    
                </Article>
            </div>
        )
    }
}
export default StudentQuizGradesView;